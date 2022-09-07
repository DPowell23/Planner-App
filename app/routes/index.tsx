import type { LinksFunction, LoaderFunction } from "@remix-run/node"
import type { Todo } from "@prisma/client"
import { json } from "@remix-run/node"
import { Link, Outlet, useLoaderData } from "@remix-run/react"

import { db } from "~/utils/db.server"

type LoaderData = {
  todoList: Array<Todo>
}

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    todoList: await db.todo.findMany(),
  }
  return json(data)
}

export default function Index() {
  const data = useLoaderData<LoaderData>()

  return (
    <div className="container ml-6 mt-6">
      <div className="grid gap-10">
        {data.todoList.map((todo) => (
          <div
            key={todo.id}
            className="bg-light flex flex-row rounded-lg shadow-lg h-52 w-60"
          >
            <ul className="w-full px-2 flex-wrap">
              <h1 className="text-xl text-center font-bold">{todo.title}</h1>
              <p className="text-dark">{todo.description}</p>
              <p className="text-dark underline">Due: {todo.dueDate}</p>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
