import AddForm from "@/components/addForm";
import TableCustome from "@/components/customeTable";
import { GetAllTodos } from "@/utils/action";
import { Data as TodoType } from "@/components/customeTable";
import Todo from "@/components/Todo";

export default async function  Home (){
  const todos = await GetAllTodos()

return (
  <>
  <div>Hello</div>
  </>
)
}

