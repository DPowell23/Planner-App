import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

async function seed() {
  await Promise.all(
    getTodo().map((todo) => {
      return db.todo.create({ data: todo })
    })
  )
}

seed()

function getTodo() {
  return [
    {
      id: 0,
      title: "Build DB",
      description: "Making a remix todo app DB",
    },
    {
      id: 1,
      title: "Build app",
      description: "Making a remix todo app",
    },
    {
      id: 2,
      title: "Test app",
      description: "Making a remix todo app",
    },
  ]
}

// npx prisma db push
// node --require esbuild-register prisma/seed.ts
