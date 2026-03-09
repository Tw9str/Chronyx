import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

function auth() {
  return getSession().then((s) =>
    s ? null : NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
  );
}

export async function GET() {
  const deny = await auth();
  if (deny) return deny;
  const items = await prisma.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const deny = await auth();
  if (deny) return deny;
  const {
    name,
    role,
    company,
    quote,
    rating,
    avatar,
    project,
    enabled,
    order,
  } = await req.json();
  if (!name?.trim() || !role?.trim() || !quote?.trim()) {
    return NextResponse.json(
      { error: "name, role, and quote are required." },
      { status: 422 },
    );
  }
  const item = await prisma.testimonial.create({
    data: {
      name: name.trim(),
      role: role.trim(),
      company: company?.trim() || null,
      quote: quote.trim(),
      rating: Number(rating) || 5,
      avatar: avatar?.trim() || name.slice(0, 2).toUpperCase(),
      project: project?.trim() || null,
      enabled: enabled !== false,
      order: Number(order) || 0,
    },
  });
  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const deny = await auth();
  if (deny) return deny;
  const { id, ...data } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const item = await prisma.testimonial.update({ where: { id }, data });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  const deny = await auth();
  if (deny) return deny;
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
