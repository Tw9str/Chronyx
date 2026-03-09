import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/admin/messages — list all with optional filter
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = 20;

  const where =
    status && ["UNREAD", "READ", "ARCHIVED"].includes(status)
      ? { status: status as "UNREAD" | "READ" | "ARCHIVED" }
      : {};

  const [messages, total] = await Promise.all([
    prisma.message.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.message.count({ where }),
  ]);

  return NextResponse.json({ messages, total, page, limit });
}

// PATCH /api/admin/messages — update status
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await req.json();
  if (!id || !["UNREAD", "READ", "ARCHIVED"].includes(status)) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const updated = await prisma.message.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json(updated);
}

// DELETE /api/admin/messages — delete a message
export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required." }, { status: 400 });

  await prisma.message.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
