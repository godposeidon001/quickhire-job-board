import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApplicationCreateSchema } from "@/lib/zod";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!session?.user || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = ApplicationCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // optionally auto-fill from user
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true },
  });

  const created = await prisma.application.create({
    data: {
      jobId: parsed.data.jobId,
      userId,
      resumeLink: parsed.data.resumeLink,
      coverNote: parsed.data.coverNote,
      name: parsed.data.name ?? dbUser?.name ?? "Applicant",
      email: parsed.data.email ?? dbUser?.email ?? session.user.email ?? "",
    },
  });

  return NextResponse.json(created, { status: 201 });
}
