"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { CreateTodos, UpdateTodos } from "@/utils/action";
import { Data as TodoType } from "./customeTable";
import { Checkbox } from "./ui/checkbox";

interface AddFormProps {
  todo: TodoType;
  resetForm: () => void;
}

export default function AddForm({ todo, resetForm }: AddFormProps) {
  const BtnSubmit = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending}>
        {pending ? "Création en cours ...." : "Ajouter"}
      </Button>
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const action = todo.id ? UpdateTodos : CreateTodos;

    const formData = new FormData(e.currentTarget);

    try {
      await action(formData);
      resetForm(); 
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-row space-x-4 my-5">
        <Input type="hidden" value={todo.id} name="id" />
        <Input
          type="text"
          defaultValue={todo.title}
          name="title"
          placeholder="Titre"
        />
        <Input
          type="text"
          defaultValue={todo.content}
          name="content"
          placeholder="Todos"
        />
        {todo.id && (
          <Checkbox defaultChecked={todo.completed} name="completed" />
        )}
        <BtnSubmit />
        
      </form>
    </div>
  );
}
