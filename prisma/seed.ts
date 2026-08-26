// prisma/seed.ts

import type { User } from "../node_modules/.prisma/client";

import { hash } from "bcrypt";
import { prisma } from "@/server/prisma";

async function main(): Promise<void> {
  try {
    console.log("Starting database seeding...");

    // Clean up any existing data if needed
    console.log("Cleaning up existing data...");
    await cleanup();

    // Create users
    console.log("Creating users...");
    // Used later
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const users = await createUsers();

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function cleanup(): Promise<void> {
  // Delete all existing data in reverse order of dependencies
  await prisma.user.deleteMany({});
}

async function createUsers(): Promise<User[]> {
  const passwordHash = await hash("asd", 10);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "alice@mail.com" },
      update: {},
      create: {
        name: "Alice Johnson",
        email: "alice@mail.com",
        password: passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { email: "bob@mail.com" },
      update: {},
      create: {
        name: "Bob Smith",
        email: "bob@mail.com",
        password: passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { email: "charlie@mail.com" },
      update: {},
      create: {
        name: "Charlie Davis",
        email: "charlie@mail.com",
        password: passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { email: "dana@mail.com" },
      update: {},
      create: {
        name: "Dana Lee",
        email: "dana@mail.com",
        password: passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { email: "evan@mail.com" },
      update: {},
      create: {
        name: "Evan Wilson",
        email: "evan@mail.com",
        password: passwordHash,
      },
    }),
  ]);

  console.log(`Created ${users.length} users`);
  return users;
}

// Run the seed function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
