import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const STAT_KEYS = ["stat_projects", "stat_clients", "stat_years"] as const;

export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await prisma.setting.findMany({
    where: { key: { in: [...STAT_KEYS] } },
  });
  const result: Record<string, string> = {};
  for (const k of STAT_KEYS) {
    result[k] = rows.find((r) => r.key === k)?.value ?? "";
  }
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  await Promise.all(
    STAT_KEYS.map((key) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: String(body[key] ?? "") },
        create: { key, value: String(body[key] ?? "") },
      }),
    ),
  );
  return NextResponse.json({ ok: true });
}
