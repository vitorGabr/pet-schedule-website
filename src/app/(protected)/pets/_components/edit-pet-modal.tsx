"use client";

import { useForm } from "@tanstack/react-form";
import { Camera } from "lucide-react";
import Image from "next/image";
import { parseAsString, useQueryState } from "nuqs";
import { toast } from "sonner";
import { TextField } from "@/components/form/fields/text-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  updateAnimal,
  useGetAnimalById,
} from "@/lib/http/generated/endpoints/animais/animais";
import { UpdatePetSchema, updatePetSchema } from "@/schemas/update-pet";
import { EditPetModalSkeleton } from "./edit-pet-modal-skeleton";
import { revalidateCache } from "@/utils/revalidate";

export function EditPetModal() {
  const [id, setId] = useQueryState("id", parseAsString);
  const { data, isLoading } = useGetAnimalById(id ?? "", {
    query: { enabled: !!id },
  });

  const handleBack = () => setId(null);
  const form = useForm({
    defaultValues: {
      name: data?.name || "",
      weight: data?.weight || 0,
      age: data?.age || 0,
    } as UpdatePetSchema,
    validators: { onChange: updatePetSchema },
    onSubmit: async ({ value }) => {
      await updateAnimal(id!, value);
      await revalidateCache({ type: "tag", tags: ["pets"] });
      toast.success("Pet atualizado com sucesso!");
      handleBack();
    },
  });

  return (
    <Dialog open={!!id} onOpenChange={handleBack}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader className="items-start flex">
          <DialogTitle>Editar animalde estimação</DialogTitle>
          <DialogDescription>
            Atualize as informações do seu pet.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <EditPetModalSkeleton />
        ) : (
          <div className="p-6 space-y-6">
            {/* Form Fields */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              {/* Pet Avatar Section */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {data?.asset?.url ? (
                      <Image
                        src={data?.asset.url}
                        alt={data?.name}
                        className="object-cover rounded-full h-24 w-24"
                        width={200}
                        height={200}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-2xl">🐾</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Pet Name */}
              <form.Field name="name">
                {(field) => (
                  <TextField
                    label="Nome"
                    placeholder="Ex: Buddy"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(value) => field.handleChange(value.target.value)}
                    value={field.state.value}
                    meta={field.state.meta}
                  />
                )}
              </form.Field>

              {/* Weight and Birthdate Row */}
              <div className="grid grid-cols-2 gap-4">
                <form.Field name="weight">
                  {(field) => (
                    <TextField
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(value) =>
                        field.handleChange(value.target.valueAsNumber)
                      }
                      value={field.state.value}
                      meta={field.state.meta}
                      label="Peso (kg)"
                      placeholder="Ex: 12"
                      type="number"
                      step="0.1"
                      min="0"
                    />
                  )}
                </form.Field>

                <form.Field name="age">
                  {(field) => (
                    <TextField
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(value) =>
                        field.handleChange(value.target.valueAsNumber)
                      }
                      value={field.state.value}
                      meta={field.state.meta}
                      label="Idade"
                      type="number"
                      step="1"
                      min="0"
                    />
                  )}
                </form.Field>
              </div>

              {/* Action Buttons */}
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <div className="flex gap-3 pt-4">
                    <DialogClose asChild>
                      <Button variant="outline" className="flex-1">
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isSubmitting || !canSubmit}
                    >
                      {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </div>
                )}
              </form.Subscribe>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
