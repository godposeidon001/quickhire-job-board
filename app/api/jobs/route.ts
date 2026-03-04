export const runtime = "nodejs";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { JobCreateSchema } from "@/lib/zod";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

function normalizeTags(tags?: string[]) {
  if (!tags) return [];
  return [...new Set(tags.map((t) => t.trim()).filter(Boolean))];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  const jobs = await prisma.job.findMany({
    where: categoryId ? { categoryId } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
  });

  return NextResponse.json(
    jobs.map((j) => ({
      id: j.id,
      title: j.title,
      company: j.company,
      companyLogo: j.companyLogo,
      location: j.location,
      type: j.type,
      description: j.description,
      isFeatured: j.isFeatured,
      createdAt: j.createdAt,
      category: { id: j.category.id, name: j.category.name },
      tags: j.tags.map((t) => t.tag.name),
    })),
  );
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = JobCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const tagNames = normalizeTags(parsed.data.tags);

  const created = await prisma.job.create({
    data: {
      title: parsed.data.title,
      company: parsed.data.company,
      companyLogo: parsed.data.companyLogo?.trim() || null,
      location: parsed.data.location,
      type: parsed.data.type,
      description: parsed.data.description,
      isFeatured: parsed.data.isFeatured ?? false,
      categoryId: parsed.data.categoryId,
      tags:
        tagNames.length > 0
          ? {
              create: tagNames.map((name) => ({
                tag: {
                  connectOrCreate: {
                    where: { name },
                    create: { name },
                  },
                },
              })),
            }
          : undefined,
    },
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
  });

  return NextResponse.json(
    {
      id: created.id,
      title: created.title,
      company: created.company,
      companyLogo: created.companyLogo,
      location: created.location,
      type: created.type,
      description: created.description,
      isFeatured: created.isFeatured,
      createdAt: created.createdAt,
      category: { id: created.category.id, name: created.category.name },
      tags: created.tags.map((t) => t.tag.name),
    },
    { status: 201 },
  );
}
