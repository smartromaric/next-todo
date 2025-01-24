'use client'
import React from "react";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption, Table } from "../components/ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { DeleteTodos,GetTodoById } from "@/utils/action";
import CustomeBagde from "./customeBagde";

export interface Data {
    id: string;
    title: string;
    content: string;
    completed: boolean;
}

interface DataItems {
  items: Data[];
}

interface TableProps extends DataItems{
  setTodo:(todo:Data)=> void;
}



export default function TableCustome({ items,setTodo }: TableProps) {
  console.log("soksskk",items)
  
  const onUpdate =  async (id:string)  =>{
    const todo = await GetTodoById(id);
    if(todo){
      setTodo(todo)
    }
   
  }
  const onDelete = (id:string) =>{
    DeleteTodos(id)
  }
  return (
    <div className="flex items-center justify-center">
      <Table className=" w-[800px] mx-auto">
        <TableCaption>la list des Todos</TableCaption>
        <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Titre</TableHead>
        <TableHead>Contenu</TableHead>
        <TableHead>Completé</TableHead>
      </TableRow>
        </TableHeader>
        <TableBody>
        {items.map(item =>{
          return (
      <TableRow key={item.id}>
      
          <TableCell className="font-bold">{item.title}</TableCell>
          <TableCell>{item.content}</TableCell>
          <TableCell>{<CustomeBagde completed= {item.completed} />}</TableCell>
      <TableCell>
        <Button onClick={()=>onUpdate(item.id)} className="bg-yellow-500 mr-2">Modifier</Button>
        <Button onClick={()=>onDelete(item.id)} className="bg-red-500">Supprimer</Button>
      </TableCell>
      
      </TableRow>
        )})}
        </TableBody>
      </Table>
    </div>
  );
}




