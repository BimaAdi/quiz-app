import { PrismaClient } from "@prisma/client";

const status = [
  {
    id: "64703e2a-1198-4f27-a9df-ff84255f8ef5",
    name: "draft",
  },
  {
    id: "005d2730-e3c8-4ea6-8e0f-c46b3bec2a4e",
    name: "publish",
  },
  {
    id: "39391176-4446-45a7-bd33-5a494290f642",
    name: "finish",
  },
];

const prisma = new PrismaClient();
async function main() {
  status.map(async (item) => {
    await prisma.quizStatus.upsert({
      where: {
        id: item.id,
      },
      update: {
        name: item.name,
      },
      create: {
        id: item.id,
        name: item.name,
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
