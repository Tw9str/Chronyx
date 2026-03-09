import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createOtp } from "@/lib/otp";
import { isAllowedAdminEmail } from "@/lib/auth";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email required." },
        { status: 400 },
      );
    }

    const normalised = email.toLowerCase().trim();

    if (!isAllowedAdminEmail(normalised)) {
      // Return generic message to avoid email enumeration
      return NextResponse.json({ ok: true });
    }

    // Ensure admin user record exists
    await prisma.adminUser.upsert({
      where: { email: normalised },
      update: {},
      create: { email: normalised },
    });

    const code = await createOtp(normalised);

    const { error: sendError } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "Chronyx Admin <admin@chronyx.tech>",
      to: normalised,
      subject: `${code} — Your Chronyx login code`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#0c0c17;color:#f8fafc;border-radius:12px;">
          <h1 style="font-size:24px;margin-bottom:8px;color:#f8fafc;">Your login code</h1>
          <p style="color:#94a3b8;margin-bottom:24px;">Enter this code in Chronyx Admin to sign in. It expires in <strong style="color:#f8fafc;">10 minutes</strong> and can only be used once.</p>
          <div style="font-size:40px;font-weight:800;letter-spacing:12px;color:#a78bfa;background:#131324;border:1px solid #1e1e30;border-radius:8px;padding:20px;text-align:center;margin-bottom:24px;">
            ${code}
          </div>
          <p style="color:#64748b;font-size:12px;">If you didn't request this code, you can safely ignore this email.</p>
        </div>
      `,
    });

    if (sendError) {
      console.error("[request-otp] Resend error:", sendError);
      return NextResponse.json(
        { error: "Failed to send OTP." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[request-otp]", err);
    return NextResponse.json({ error: "Failed to send OTP." }, { status: 500 });
  }
}
