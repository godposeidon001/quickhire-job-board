import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one number"),
});

export const JobCreateSchema = z.object({
  title: z.string().min(2),
  company: z.string().min(2),
  companyLogo: z.string().trim().optional(),
  location: z.string().min(1),
  type: z.string().min(1),
  description: z.string().min(10),
  isFeatured: z.boolean().optional(),
  categoryId: z.string().min(1),
  tags: z.array(z.string().trim().min(1)).optional(),
});

export const JobPatchSchema = JobCreateSchema.partial();

export const ApplicationCreateSchema = z.object({
  jobId: z.string().min(1),
  resumeLink: z.string().url(),
  coverNote: z.string().min(10),
  // optional if you want to auto-fill from user:
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
});
