import { PrismaClient } from "@/generated/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });
};

declare global {
  var prisma_raahi: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma_raahi ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma_raahi = prisma;
