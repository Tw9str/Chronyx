import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyOtp } from "@/lib/otp";
import { signAndSetCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required." },
        { status: 400 },
      );
    }

    const normalised = email.toLowerCase().trim();
    const valid = await verifyOtp(normalised, String(code).trim());

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid or expired code." },
        { status: 401 },
      );
    }

    const user = await prisma.adminUser.findUnique({
      where: { email: normalised },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    await signAndSetCookie({ sub: user.id, email: user.email });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[verify-otp]", err);
    return NextResponse.json(
      { error: "Verification failed." },
      { status: 500 },
    );
  }
}
