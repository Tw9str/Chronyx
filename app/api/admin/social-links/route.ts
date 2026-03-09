import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function auth() {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function GET() {
  const deny = await auth();
  if (deny) return deny;
  const items = await prisma.socialLink.findMany({
    orderBy: [{ order: "asc" }],
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const deny = await auth();
  if (deny) return deny;
  const data = await req.json();
  const { platform, label, value, url, enabled, order } = data;
  if (!platform?.trim() || !label?.trim() || !url?.trim()) {
    return NextResponse.json(
      { error: "platform, label, and url are required." },
      { status: 422 },
    );
  }
  const item = await prisma.socialLink.create({
    data: {
      platform: platform.trim().toLowerCase(),
      label: label.trim(),
      value: value?.trim() || "",
      url: url.trim(),
      enabled: enabled !== false,
      order: Number(order) || 0,
      showInFooter: data.showInFooter !== false,
      showInContact: data.showInContact !== false,
    },
  });
  revalidatePath("/", "layout");
  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const deny = await auth();
  if (deny) return deny;
  const { id, ...data } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const item = await prisma.socialLink.update({ where: { id }, data });
  revalidatePath("/", "layout");
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  const deny = await auth();
  if (deny) return deny;
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
