import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name is required."
          : "Name must be a string.",
    })
    .min(2, { error: "Name must be at least 2 characters." })
    .max(120, { error: "Name is too long." }),
  email: z
    .email({
      error: (issue) =>
        !issue.input
          ? "Email is required."
          : "Please enter a valid email address.",
    })
    .max(254, { error: "Email is too long." }),
  projectType: z.string().max(60).optional(),
  budget: z.string().max(60).optional(),
  message: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Message is required."
          : "Message must be a string.",
    })
    .min(10, { error: "Message must be at least 10 characters." })
    .max(4000, { error: "Message is too long (max 4000 characters)." }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fields[key]) fields[key] = issue.message;
      }
      return NextResponse.json(
        { error: "Please fix the errors below.", fields },
        { status: 422 },
      );
    }

    const { name, email, projectType, budget, message } = parsed.data;

    const msg = await prisma.message.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        projectType: projectType ?? null,
        budget: budget ?? null,
        message: message.trim(),
      },
    });

    return NextResponse.json({ ok: true, id: msg.id }, { status: 201 });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
