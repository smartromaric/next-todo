import CustomeCard from "@/components/customeCard"
import React from "react"
import { GetAllTodos } from "@/utils/action"

export default async function  Page (){
  const todos = await GetAllTodos()



return (
  <div className="flex justify-center items-center md:ml-5">
  <CustomeCard  todos = {todos}/>
  </div >
)
}

