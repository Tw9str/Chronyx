import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/admin/stats — dashboard counts
export async function GET(_req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [totalMessages, unreadMessages, totalProjects, recentMessages] =
    await Promise.all([
      prisma.message.count(),
      prisma.message.count({ where: { status: "UNREAD" } }),
      prisma.project.count(),
      prisma.message.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          projectType: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

  return NextResponse.json({
    totalMessages,
    unreadMessages,
    totalProjects,
    recentMessages,
  });
}
