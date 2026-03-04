export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
