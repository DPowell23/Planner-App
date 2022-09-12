import type { LoaderFunction, ActionFunction } from "@remix-run/node"
import type { Todo } from "@prisma/client"
import { json } from "@remix-run/node"
import { useLoaderData, Form } from "@remix-run/react"
import { db } from "~/utils/db.server"
import { Tooltip, IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from "@mui/icons-material/Check"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { redirect } from "@remix-run/node"

type LoaderData = {
  todoList: Array<Todo>
}

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    todoList: await db.todo.findMany(),
  }
  return json(data)
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const title = formData.get("title")
  const description = formData.get("description")

  console.log(title, description)

  if (typeof title !== "string" || typeof description !== "string") {
    throw new Error(`Form not submitted correctly.`)
  }

  const fields = { title, description }

  const todo = await db.todo.create({ data: fields })
  return redirect(`/`)
}

export default function Index() {
  const data = useLoaderData<LoaderData>()

  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="min-w-4xl flex justify-center mx-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {data.todoList.map((todo) => (
            <div className="relative">
              {todo.completed ? null : (
                <div key={todo.id}>
                  <div className="bg-light flex rounded-lg shadow-lg h-52 w-52">
                    <ul className="w-full px-2 flex-wrap">
                      <h1 className="text-xl text-center font-bold">
                        {todo.title}
                      </h1>
                      <p className="text-dark">{todo.description}</p>
                    </ul>
                  </div>
                  <div className="bg-primary absolute bottom-0 w-52 h-8 rounded-b-lg">
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
          <div className="h-52 w-52 flex justify-center items-center">
            <div className="bg-light flex rounded-lg shadow-lg h-32 w-32">
              <div className="mx-auto my-auto">
                <Tooltip title="Add">
                  <IconButton
                    disableRipple
                    onClick={() => {
                      setIsOpen(true)
                    }}
                  >
                    <img src="plus.svg" className="h-12" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-primary p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-light text-center"
                    >
                      New Todo
                    </Dialog.Title>
                    <div className="mt-3 flex justify-center">
                      <Form method="post">
                        <div className="flex flex-col">
                          <label className="text-dark">Title: </label>
                          <input
                            className="bg-light rounded-md w-64"
                            type="text"
                            name="title"
                          />
                        </div>
                        <div className="flex flex-col mt-2">
                          <label className="text-dark">Desc: </label>
                          <textarea
                            className="bg-light rounded-md"
                            name="description"
                          />
                        </div>
                        <div className="mt-5 flex justify-center">
                          <button
                            type="submit"
                            className="inline-flex rounded-sm text-light text-sm font-extrabold whitespace-nowrap uppercase tracking-widest transition-all hover:text-dark"
                            onClick={() => setIsOpen(false)}
                          >
                            Add to List!
                          </button>
                        </div>
                      </Form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </>
  )
}
