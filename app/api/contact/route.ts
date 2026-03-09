import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, projectType, budget, message } = body ?? {};

    if (
      typeof name !== "string" || name.trim().length < 1 || name.length > 120 ||
      typeof email !== "string" || !isValidEmail(email) || email.length > 254 ||
      typeof message !== "string" || message.trim().length < 10 || message.length > 4000
    ) {
      return NextResponse.json({ error: "Invalid input." }, { status: 422 });
    }

    const msg = await prisma.message.create({
      data: {
        name:        name.trim(),
        email:       email.toLowerCase().trim(),
        projectType: typeof projectType === "string" ? projectType.slice(0, 60) : null,
        budget:      typeof budget === "string" ? budget.slice(0, 60) : null,
        message:     message.trim(),
      },
    });

    return NextResponse.json({ ok: true, id: msg.id }, { status: 201 });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Failed to save message." }, { status: 500 });
  }
}
