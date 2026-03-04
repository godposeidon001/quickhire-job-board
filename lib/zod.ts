import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(6),
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
