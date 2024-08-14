import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

import { env } from "@/env";

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

const client = createClient({
  url: "file:./prisma/dev.db",
});

// const adapter = new PrismaLibSQL(libsql);
const adapter = new PrismaLibSQL(client);
const prisma = new PrismaClient({ adapter });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof PrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? prisma;

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
