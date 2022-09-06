import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getTodo().map((todo) => {
      return db.todo.create({ data: todo });
    })
  );
}

seed();

function getTodo() {

  return [
    {
        id: 1,
        title: "Build app",
        description: "Making a remix todo app"
      },
  ];
}