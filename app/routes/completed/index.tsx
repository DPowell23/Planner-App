import type { LoaderFunction } from "@remix-run/node"
import type { Todo } from "@prisma/client"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { db } from "~/utils/db.server"
import { Tooltip, IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from "@mui/icons-material/Check"

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
    <div className="min-w-4xl flex justify-center mx-6 mt-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {data.todoList.map((todo) => (
          <div className="relative">
            {!todo.completed ? null : (
              <div>
                <div
                  key={todo.id}
                  className="bg-light flex rounded-lg shadow-lg h-52 w-52"
                >
                  <ul className="w-full px-2 flex-wrap">
                    <h1 className="text-xl text-center font-bold">
                      {todo.title}
                    </h1>
                    <p className="text-dark">{todo.description}</p>
                  </ul>
                </div>
                <div className="bg-primary absolute bottom-0 w-full h-8 rounded-b-lg">
                  <div className="flex justify-between">
                    <Tooltip title="Edit">
                      <IconButton disableRipple>
                        <EditIcon className="hover:fill-light mx-2 pb-1" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Completed">
                      <IconButton disableRipple>
                        <CheckIcon className="hover:fill-light mx-2 pb-1" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton disableRipple>
                        <DeleteIcon className="hover:fill-light mx-2 pb-1" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
