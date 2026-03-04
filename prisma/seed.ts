import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaNeon({
  connectionString: process.env.DIRECT_URL!, // direct URL for seed/migrate
});

const prisma = new PrismaClient({ adapter });

type SeedJob = {
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: string;
  description: string;
  isFeatured?: boolean;
  categoryName: string;
  tagNames: string[];
};

async function main() {
  // ---------------------------
  // 1) Seed Admin user
  // ---------------------------
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env");
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: Role.ADMIN,
      passwordHash,
      name: "Admin",
    },
    create: {
      email: adminEmail,
      name: "Admin",
      role: Role.ADMIN,
      passwordHash,
    },
  });

  // ---------------------------
  // 2) Categories
  // ---------------------------
  const categoryNames = [
    "Design",
    "Sales",
    "Marketing",
    "Finance",
    "Technology",
    "Engineering",
    "Business",
    "Human Resource",
  ];

  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  const categoryIdByName = Object.fromEntries(
    categories.map((c) => [c.name, c.id]),
  );

  // ---------------------------
  // 3) Tags (pills)
  // ---------------------------
  // These are the pills you show under jobs (ex: Marketing, Design, Business, etc.)
  const tagNames = [
    "Design",
    "Marketing",
    "Business",
    "Technology",
    "Finance",
    "Sales",
    "Engineering",
    "Human Resource",
    "Full-Time",
  ];

  await Promise.all(
    tagNames.map((name) =>
      prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  // ---------------------------
  // 4) Reset (DEV ONLY)
  // ---------------------------
  // Order matters because of relations
  await prisma.jobTag.deleteMany();
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();

  // ---------------------------
  // 5) Jobs (with tags + logos)
  // ---------------------------
  const jobs: SeedJob[] = [
    // Design
    {
      title: "Brand Designer",
      company: "Dropbox",
      companyLogo: "/logos/dropbox.svg",
      location: "San Francisco, USA",
      type: "Full Time",
      description: "Work on brand identity and marketing design systems.",
      isFeatured: true,
      categoryName: "Design",
      tagNames: ["Design", "Business", "Full-Time"],
    },
    {
      title: "Product Designer",
      company: "ClassPass",
      companyLogo: "/logos/classpass.svg",
      location: "Manchester, UK",
      type: "Full Time",
      description: "Design end-to-end product UX with cross-functional teams.",
      isFeatured: true,
      categoryName: "Design",
      tagNames: ["Design", "Marketing", "Full-Time"],
    },
    {
      title: "Visual Designer",
      company: "Blinkist",
      companyLogo: "/logos/blinkist.svg",
      location: "Granada, Spain",
      type: "Full Time",
      description: "Create visuals for product, social, and campaigns.",
      categoryName: "Design",
      tagNames: ["Design", "Full-Time"],
    },

    // Marketing
    {
      title: "Email Marketing Specialist",
      company: "Revolut",
      companyLogo: "/logos/revolut.svg",
      location: "Madrid, Spain",
      type: "Full Time",
      description: "Own lifecycle email strategy and experimentation.",
      isFeatured: true,
      categoryName: "Marketing",
      tagNames: ["Marketing", "Full-Time"],
    },
    {
      title: "Brand Strategist",
      company: "GoDaddy",
      companyLogo: "/logos/godaddy.svg",
      location: "Marseille, France",
      type: "Full Time",
      description: "Develop brand strategy and go-to-market messaging.",
      isFeatured: true,
      categoryName: "Marketing",
      tagNames: ["Marketing", "Business", "Full-Time"],
    },
    {
      title: "Social Media Assistant",
      company: "Nomad",
      companyLogo: "/logos/nomad.svg",
      location: "Paris, France",
      type: "Full Time",
      description: "Support social calendars, content, and reporting.",
      categoryName: "Marketing",
      tagNames: ["Marketing", "Design", "Full-Time"],
    },

    // Technology
    {
      title: "Data Analyst",
      company: "X",
      companyLogo: "/logos/x.svg",
      location: "San Diego, USA",
      type: "Full Time",
      description: "Analyze product data, dashboards, and experiments.",
      isFeatured: true,
      categoryName: "Technology",
      tagNames: ["Technology", "Full-Time"],
    },
    {
      title: "Backend Engineer",
      company: "DataDock",
      companyLogo: "/logos/datadock.svg",
      location: "Berlin, Germany",
      type: "Full Time",
      description: "Build APIs and PostgreSQL-backed services.",
      categoryName: "Technology",
      tagNames: ["Technology", "Engineering", "Full-Time"],
    },
    {
      title: "Interactive Developer",
      company: "Terraform",
      companyLogo: "/logos/terraform.svg",
      location: "Hamburg, Germany",
      type: "Full Time",
      description: "Build interactive experiences and frontend systems.",
      categoryName: "Technology",
      tagNames: ["Technology", "Design", "Full-Time"],
    },

    // Sales
    {
      title: "Account Executive",
      company: "Talkit",
      companyLogo: "/logos/talkit.svg",
      location: "Remote",
      type: "Full Time",
      description: "Own pipeline and close deals with startups.",
      categoryName: "Sales",
      tagNames: ["Sales", "Business", "Full-Time"],
    },
    {
      title: "Customer Manager",
      company: "Pitch",
      companyLogo: "/logos/pitch.svg",
      location: "Berlin, Germany",
      type: "Full Time",
      description: "Manage onboarding, retention, and customer success.",
      isFeatured: true,
      categoryName: "Sales",
      tagNames: ["Sales", "Business", "Full-Time"],
    },
    {
      title: "Sales Development Rep",
      company: "Nomad",
      companyLogo: "/logos/nomad.svg",
      location: "Paris, France",
      type: "Full Time",
      description: "Qualify inbound leads and book meetings.",
      categoryName: "Sales",
      tagNames: ["Sales", "Full-Time"],
    },

    // Finance
    {
      title: "Financial Analyst",
      company: "Revolut",
      companyLogo: "/logos/revolut.svg",
      location: "Madrid, Spain",
      type: "Full Time",
      description: "Forecasting, reporting, and business analysis.",
      categoryName: "Finance",
      tagNames: ["Finance", "Business", "Full-Time"],
    },
    {
      title: "Accounts Manager",
      company: "Maze",
      companyLogo: "/logos/maze.svg",
      location: "San Francisco, USA",
      type: "Full Time",
      description: "Billing operations and revenue reconciliation.",
      categoryName: "Finance",
      tagNames: ["Finance", "Full-Time"],
    },
    {
      title: "FP&A Associate",
      company: "ClassPass",
      companyLogo: "/logos/classpass.svg",
      location: "Manchester, UK",
      type: "Full Time",
      description: "Support budgeting and planning with leadership.",
      categoryName: "Finance",
      tagNames: ["Finance", "Business", "Full-Time"],
    },

    // Engineering
    {
      title: "Frontend Engineer",
      company: "QuickHire",
      companyLogo: "/logos/quickhire.svg",
      location: "Dhaka, Bangladesh",
      type: "Full Time",
      description: "Build Next.js UI and reusable components.",
      isFeatured: true,
      categoryName: "Engineering",
      tagNames: ["Engineering", "Technology", "Full-Time"],
    },
    {
      title: "Lead Engineer",
      company: "Canva",
      companyLogo: "/logos/canva.svg",
      location: "Ontario, Canada",
      type: "Full Time",
      description: "Lead engineering execution and architecture.",
      isFeatured: true,
      categoryName: "Engineering",
      tagNames: ["Engineering", "Business", "Full-Time"],
    },
    {
      title: "Software Engineer",
      company: "Udacity",
      companyLogo: "/logos/udacity.svg",
      location: "Hamburg, Germany",
      type: "Full Time",
      description: "Build platform features and maintain services.",
      categoryName: "Engineering",
      tagNames: ["Engineering", "Technology", "Full-Time"],
    },

    // Business
    {
      title: "Business Analyst",
      company: "Netlify",
      companyLogo: "/logos/netlify.svg",
      location: "Paris, France",
      type: "Full Time",
      description: "Analyze ops and improve business workflows.",
      categoryName: "Business",
      tagNames: ["Business", "Full-Time"],
    },
    {
      title: "Operations Associate",
      company: "Packer",
      companyLogo: "/logos/packer.svg",
      location: "Lucerne, Switzerland",
      type: "Full Time",
      description: "Support operations and cross-team coordination.",
      categoryName: "Business",
      tagNames: ["Business", "Full-Time"],
    },
    {
      title: "Project Coordinator",
      company: "Webflow",
      companyLogo: "/logos/webflow.svg",
      location: "Lucerne, Switzerland",
      type: "Full Time",
      description: "Coordinate schedules and project delivery.",
      categoryName: "Business",
      tagNames: ["Business", "Full-Time"],
    },

    // HR
    {
      title: "HR Manager",
      company: "Webflow",
      companyLogo: "/logos/webflow.svg",
      location: "Lucerne, Switzerland",
      type: "Full Time",
      description: "Lead HR operations and hiring processes.",
      categoryName: "Human Resource",
      tagNames: ["Human Resource", "Business", "Full-Time"],
    },
    {
      title: "Recruiter",
      company: "Maze",
      companyLogo: "/logos/maze.svg",
      location: "San Francisco, USA",
      type: "Full Time",
      description: "Own recruiting pipeline across teams.",
      categoryName: "Human Resource",
      tagNames: ["Human Resource", "Full-Time"],
    },
    {
      title: "People Ops Specialist",
      company: "Nomad",
      companyLogo: "/logos/nomad.svg",
      location: "Paris, France",
      type: "Full Time",
      description: "Support employee experience and HR processes.",
      categoryName: "Human Resource",
      tagNames: ["Human Resource", "Business", "Full-Time"],
    },
  ];

  for (const j of jobs) {
    const job = await prisma.job.create({
      data: {
        title: j.title,
        company: j.company,
        companyLogo: j.companyLogo,
        location: j.location,
        type: j.type,
        description: j.description,
        isFeatured: j.isFeatured ?? false,
        categoryId: categoryIdByName[j.categoryName],
      },
    });

    // connect tags
    for (const tagName of j.tagNames) {
      const tag = await prisma.tag.findUnique({ where: { name: tagName } });
      if (!tag) continue;

      await prisma.jobTag.create({
        data: {
          jobId: job.id,
          tagId: tag.id,
        },
      });
    }
  }

  console.log("✅ Seed completed: admin + categories + tags + jobs");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
