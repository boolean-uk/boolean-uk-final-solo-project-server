const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  const users = [
    {
      name: "John Doe",
      email: "johndoe@mail.com",
      password: "abc123",
    },
    {
      name: "Christian Smith",
      email: "christiansmith@mail.com",
      password: "abcd1234",
    },
  ];

  const userPromises = users.map(async (user) => {
    return await prisma.user.create({ data: user });
  });

  try {
    await Promise.all(userPromises);
  } catch (error) {
    console.error("[ERROR] Seeding user model: ", {
      code: error.code,
      error: error.message,
    });

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
