import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { JobPatchSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

function normalizeTags(tags?: string[]) {
  if (!tags) return [];
  return [...new Set(tags.map((t) => t.trim()).filter(Boolean))];
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
  });

  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    id: job.id,
    title: job.title,
    company: job.company,
    companyLogo: job.companyLogo,
    location: job.location,
    type: job.type,
    description: job.description,
    isFeatured: job.isFeatured,
    createdAt: job.createdAt,
    category: { id: job.category.id, name: job.category.name },
    tags: job.tags.map((t) => t.tag.name),
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = JobPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const data: Prisma.JobUpdateInput = {};
  const input = parsed.data;

  if (input.title !== undefined) data.title = input.title;
  if (input.company !== undefined) data.company = input.company;
  if (input.companyLogo !== undefined) data.companyLogo = input.companyLogo || null;
  if (input.location !== undefined) data.location = input.location;
  if (input.type !== undefined) data.type = input.type;
  if (input.description !== undefined) data.description = input.description;
  if (input.isFeatured !== undefined) data.isFeatured = input.isFeatured;
  if (input.categoryId !== undefined) data.category = { connect: { id: input.categoryId } };

  if (input.tags !== undefined) {
    const tagNames = normalizeTags(input.tags);
    data.tags = {
      deleteMany: {},
      create: tagNames.map((name) => ({
        tag: {
          connectOrCreate: {
            where: { name },
            create: { name },
          },
        },
      })),
    };
  }

  const updated = await prisma.job.update({
    where: { id },
    data,
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
  });

  return NextResponse.json({
    id: updated.id,
    title: updated.title,
    company: updated.company,
    companyLogo: updated.companyLogo,
    location: updated.location,
    type: updated.type,
    description: updated.description,
    isFeatured: updated.isFeatured,
    createdAt: updated.createdAt,
    category: { id: updated.category.id, name: updated.category.name },
    tags: updated.tags.map((t) => t.tag.name),
  });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  await prisma.job.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
