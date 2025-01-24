"use client"
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomeBagde from "./customeBagde";
import { Data as TodoType } from "./customeTable";
import { Button } from "./ui/button";
import Link from "next/link";
import { Edit,Trash2 } from "lucide-react";
import { DeleteTodos } from "@/utils/action";
import { CustomeDialog } from "./customeDialog";
import { UpdateDialog } from "./updateDialog";

interface Props {
  todos: TodoType[];
}


export default function customeCard({ todos }: Props) {
  const [isOpen, setIsOpen] = useState(false); 
  const [updateTodo, setodo] = useState<TodoType>(); 


  const onDelete = async (id:string)=>{
    try{
      await DeleteTodos(id);
    }catch(error){
        console.log(error)
    }
  }

  const onEdit =(todo:TodoType)=>{
      setIsOpen(true)
      setodo(todo)
  }
  
  return (
    <div className=" grid md:grid-cols-3 gap-4">
    
    {
        todos.map((todo) => (
            <Card className="w-[270px]" key={todo.id}>
              <CardHeader>
                <CardTitle >{todo.title}</CardTitle>
                <CardDescription>
                  {todo.content}
                </CardDescription>
              </CardHeader>
              <CardContent className="position-absolute right-0">
                <div className="flex place-content-between">
                <CustomeBagde completed={todo.completed} />
                <div className="flex place-content-between">
                <Edit color="purple" className="cursor-pointer bg-purple-200 rounded" onClick={()=>onEdit(todo)} />
                <Trash2 className="cursor-pointer bg-orange-200 rounded"  color="orange" onClick={()=>onDelete(todo.id)} />
                </div>
                </div>
              </CardContent>
            </Card>
          ))

        }
        {isOpen &&(<CustomeDialog toggle={isOpen} setIsOpenEdit={setIsOpen} todo={updateTodo} />)}
    </div>
  )
}
