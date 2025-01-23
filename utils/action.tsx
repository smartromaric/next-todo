"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { resolve } from "path";
import { Data } from "@/components/customeTable";


var setTodo : Data |null ={
    id: "",
    title: "",
    content: "",
    completed: false
  }

export const RenderTodo = async () => {
    return setTodo;
}
export const GetAllTodos = async () => {
  const todos = await prisma.todos.findMany({ orderBy: { title: "desc" } });
  return todos;
};

export const CreateTodos = async (formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const content = formData.get("content") as string;
  const title = formData.get("title") as string;
  await prisma.todos.create({
    data: {
      title: title,
      content: content,
    },
  });
  revalidatePath("/");
};

export const DeleteTodos = async (id: string) => {
  const todo = await prisma.todos.delete({ where: { id: id } });
  revalidatePath("/");
};

export const GetTodoById = async (id: string) => {
  const todo = await prisma.todos.findUnique({ where: { id: id } });
  return todo;
};

export const UpdateTodos = async (formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const content = formData.get("content") as string;
  const title = formData.get("title") as string;
  const id = formData.get("id") as string;
  const completed = formData.get("completed");
  await prisma.todos.update({
    where:{id:id},
    data: {
      title: title,
      content: content,
      completed:Boolean(completed)
    },
  });
  revalidatePath("/");
};
