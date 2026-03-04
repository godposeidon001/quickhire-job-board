import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = RegisterSchema.safeParse(body);
  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Invalid input. Please check your form.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { name, password } = parsed.data;
  const email = parsed.data.email.toLowerCase();

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "User already exists with this email." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, passwordHash, role: "USER" },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
