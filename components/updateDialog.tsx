'use client';
import { useState, useEffect } from "react";
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
import { CreateTodos } from "@/utils/action";
import { useFormStatus } from "react-dom";

type TodoData = {
  title: string;
  content: string;
};

interface Props {
  toggle?: boolean; // Si `true`, le Dialog s'ouvre automatiquement
}

export function UpdateDialog({ toggle }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Synchroniser l'état `isOpen` avec la valeur de `toggle`
  useEffect(() => {
    if (toggle !== undefined) {
      setIsOpen(toggle);
    }
  }, [toggle]);

  const BtnSubmit = () => {
    const { pending: pdg } = useFormStatus();
    return (
      <Button type="submit">
        {pdg ? "Création en cours..." : "Ajouter"}
      </Button>
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      await CreateTodos(formData);
      setIsOpen(false); // Ferme le Dialog après la soumission
    } catch (error) {
      console.error("Erreur lors de la création du todo :", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Affiche le bouton trigger uniquement si `toggle` n'est pas activé */}
      {!toggle && (
        <DialogTrigger asChild>
          <Button variant="default">Modifier le Todo</Button>
        </DialogTrigger>
      )}
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
              <Input name="title" defaultValue="" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Contenu
              </Label>
              <Input name="content" defaultValue="" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <BtnSubmit />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
