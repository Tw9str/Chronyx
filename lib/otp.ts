import { prisma } from "./prisma";
import { createHash, randomInt } from "crypto";

const OTP_EXPIRY_MINUTES = 10;

// ── Generate a cryptographically safe 6-digit code ────
function generateCode(): string {
  return String(randomInt(100000, 999999));
}

// ── Hash the code before storing (prevent DB leaks) ───
function hashCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

// ── Create and store a new OTP. Returns plaintext code ─
export async function createOtp(email: string): Promise<string> {
  // Invalidate any existing unused OTPs for this email
  await prisma.otpToken.updateMany({
    where: { email, used: false },
    data: { used: true },
  });

  const code = generateCode();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await prisma.otpToken.create({
    data: {
      email,
      code: hashCode(code),
      expiresAt,
    },
  });

  return code;
}

// ── Verify a submitted code for an email ──────────────
export async function verifyOtp(email: string, code: string): Promise<boolean> {
  const token = await prisma.otpToken.findFirst({
    where: {
      email,
      code: hashCode(code),
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!token) return false;

  // Mark as used immediately (single-use)
  await prisma.otpToken.update({
    where: { id: token.id },
    data: { used: true },
  });

  return true;
}

// ── Clean up expired tokens (can be called from a cron) ─
export async function cleanExpiredOtps() {
  await prisma.otpToken.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });
}
