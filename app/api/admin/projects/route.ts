import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/admin/projects
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(projects);
}

// POST /api/admin/projects — create
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    title,
    category,
    description,
    tags,
    gradient,
    accent,
    result,
    liveUrl,
    repoUrl,
    featured,
    order,
  } = body;

  if (!title?.trim() || !category?.trim() || !description?.trim()) {
    return NextResponse.json(
      { error: "title, category, and description are required." },
      { status: 422 },
    );
  }

  const project = await prisma.project.create({
    data: {
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      tags: Array.isArray(tags) ? tags.map(String) : [],
      gradient: gradient ?? "from-violet-600/30 via-purple-900/20 to-canvas",
      accent: accent ?? "#7c3aed",
      result: result ?? "",
      liveUrl: liveUrl ?? null,
      repoUrl: repoUrl ?? null,
      featured: Boolean(featured),
      order: Number(order) || 0,
    },
  });

  return NextResponse.json(project, { status: 201 });
}

// PATCH /api/admin/projects — update
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, ...data } = await req.json();
  if (!id) return NextResponse.json({ error: "id required." }, { status: 400 });

  const project = await prisma.project.update({ where: { id }, data });
  return NextResponse.json(project);
}

// DELETE /api/admin/projects
export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required." }, { status: 400 });

  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
