'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateTodos,UpdateTodos } from "@/utils/action";
import { useFormStatus } from "react-dom";
import { Data as TodoType } from "./customeTable";
import { Checkbox } from "./ui/checkbox";

type TodoData = {
  title: string;
  content: string;
};
interface Props {
  toggle?: boolean,
  todo?:TodoType,
  setIsOpenEdit? :(state:boolean)=>void
}

export function CustomeDialog({toggle,todo,setIsOpenEdit}:Props) {
  const [isOpen, setIsOpen] = useState(false); 
  console.log("todso",todo)
  
  const BtnSubmit = ()=>{
    const { pending : pdg } = useFormStatus();
    return(
      <Button type="submit">
              {pdg ? "Création en cours..." : "Ajouter"}
            </Button>
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const formData = new FormData(event.currentTarget); 
    
   
    try {
      todo?await UpdateTodos(formData): await CreateTodos(formData); 
      handleOpenChange();
    } catch (error) {
      console.error("Erreur lors de la création du todo :", error);
    }
  };

  useEffect(()=>{
    if(toggle){
      setIsOpen(toggle)
    }
  },[toggle])

  const handleOpenChange =()=>{
    setIsOpen(!isOpen)
    if(setIsOpenEdit)
    setIsOpenEdit(!toggle)
  }

  return (
    <Dialog open={isOpen}  onOpenChange={handleOpenChange}>
      {!toggle && <DialogTrigger asChild>
        <Button variant="default">Ajouter un Todo</Button>
      </DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un Todo</DialogTitle>
          <DialogDescription>Le formulaire d'ajout de todo</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Titre
              </Label>
              <Input name="title" defaultValue={todo?.title || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Contenu
              </Label>
              <Input
                name="content"
                defaultValue={todo?.content || ""}
                className="col-span-3"
                />
                {todo && <>
                  <Label htmlFor="content" className="text-right">
                Completé
              </Label>
                 <Checkbox name="completed" defaultChecked={todo?.completed || false} className="col-span-3" /></>
                }
                {todo && <Input type="hidden" name="id" defaultValue={todo?.id || ""} className="col-span-3" />}
            </div>
          </div>
          <DialogFooter>
            <BtnSubmit/>
              
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
