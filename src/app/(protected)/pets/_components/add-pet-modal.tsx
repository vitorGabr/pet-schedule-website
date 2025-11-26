"use client";

import { useForm } from "@tanstack/react-form";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FileUpload } from "@/components/form/fields/file-upload";
import { TextField } from "@/components/form/fields/text-field";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	addAssetToAnimal,
	createAnimal,
} from "@/lib/http/generated/endpoints/animais/animais";
import { BreedListResponseOutputItemsItem } from "@/lib/http/generated/models";
import { CreatePetSchema, createPetSchema } from "@/schemas/create-pet";
import { revalidateCache } from "@/utils/revalidate";
import { AnimalCombobox } from "./animal-combobox";

interface AddPetModalProps {
	breeds: BreedListResponseOutputItemsItem[];
}

const defaultValues = { name: "", weight: 1, age: 1 } as CreatePetSchema;
export function AddPetModal({ breeds }: AddPetModalProps) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const form = useForm({
		defaultValues,
		validators: { onChange: createPetSchema },
		onSubmit: async ({ value }) => {
			try {
				const transformedValue = createPetSchema.parse(value);
				const reponse = await createAnimal(transformedValue);
				await addAssetToAnimal(reponse.id, { file: value.file });
				await revalidateCache({ type: "tag", tags: ["pets"] });
				router.refresh();
				toast.success("Pet adicionado com sucesso!");
				form.reset();
				setOpen(false);
			} catch (error) {
				if (error instanceof AxiosError) {
					toast.error(
						error.response?.data?.message ??
							"Ocorreu um erro ao adicionar o pet",
					);
				}
			}
		},
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="w-4 h-4 mr-2" />
					Adicionar Pet
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full max-w-md max-h-[90vh] overflow-y-auto">
				<DialogHeader className="items-start flex">
					<DialogTitle>Adicionar novo pet</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo para cadastrar seu amiguinho.
					</DialogDescription>
				</DialogHeader>

				<div className="py-2 px-6 space-y-6">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="space-y-4"
					>
						<form.Field name="file">
							{(field) => (
								<FileUpload
									accept="image/*"
									meta={field.state.meta}
									onChange={(value) => field.handleChange(value as any)}
									value={field.state.value}
									name={field.name}
									onBlur={field.handleBlur}
								/>
							)}
						</form.Field>

						<form.Field name="name">
							{(field) => (
								<TextField
									label="Nome do pet"
									placeholder="Ex: Thor"
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(value) => field.handleChange(value.target.value)}
									value={field.state.value}
									meta={field.state.meta}
								/>
							)}
						</form.Field>

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
										placeholder="Ex: 5.5"
										type="number"
										min="1"
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
										placeholder="Ex: 2"
										step="1"
										min="1"
									/>
								)}
							</form.Field>
						</div>
						<div className="col-span-full">
							<form.Field name="breed">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;

									return (
										<AnimalCombobox
											animals={breeds}
											value={field.state.value}
											onChange={field.handleChange}
											isInvalid={isInvalid}
											errors={field.state.meta.errors}
										/>
									);
								}}
							</form.Field>
						</div>

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
										{isSubmitting ? "Adicionando..." : "Adicionar pet"}
									</Button>
								</div>
							)}
						</form.Subscribe>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
