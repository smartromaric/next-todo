'use client'
import { GetAllTodos } from '@/utils/action';
import React from 'react'
import AddForm from './addForm';
import TableCustome from './customeTable';
import { Data as TodoType } from './customeTable';
import { useState } from 'react';


export default function Todo(todos:any) {
  
  const [updatedtodo,setTodo]  = useState<TodoType>( {
    id: "",
    title: "",
    content: "",
    completed: false
  })

  const resetForm = ()=>{
    setTodo({
      id: "",
      title: "",
      content: "",
      completed: false
    })
  }
  
  return (
    <>
    <AddForm  resetForm={resetForm}   todo = {updatedtodo}/>
    <TableCustome  setTodo={setTodo} items={todos.todo}  />
    </>
  );
}
