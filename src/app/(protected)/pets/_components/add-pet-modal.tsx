"use client";

import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type z from "zod";
import { FileUpload } from "@/components/form/fields/file-upload";
import { SelectField } from "@/components/form/fields/select-field";
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
import type { BreedListResponseOutputItemsItem } from "@/lib/http";
import {
	addAssetToAnimal,
	addAssetToAnimalBody,
	createAnimal,
	createAnimalBody,
	getListAnimalsFromUserQueryKey,
} from "@/lib/http";
import { revalidateCache } from "@/utils/revalidate";

interface AddPetModalProps {
	breeds: BreedListResponseOutputItemsItem[];
	userId: string;
}

const schema = createAnimalBody.and(addAssetToAnimalBody);
const defaultValues = { name: "", weight: 0, age: 0, breedId: "" } as z.input<
	typeof schema
>;

export function AddPetModal({ breeds, userId }: AddPetModalProps) {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues,
		validators: { onChange: schema },
		onSubmit: async ({ value }) => {
			try {
				const reponse = await createAnimal(value);
				await addAssetToAnimal(reponse.id, { file: value.file });
				await queryClient.invalidateQueries({
					queryKey: getListAnimalsFromUserQueryKey(userId),
				});
				await revalidateCache({ type: "tag", tags: ["pets"] });
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
										placeholder="Ex: 2"
										step="1"
										min="0"
									/>
								)}
							</form.Field>
						</div>

						<div className="col-span-full">
							<form.Field name="breedId">
								{(field) => (
									<SelectField
										label="Raça"
										placeholder="Ex: Labrador"
										options={breeds.map((breed) => ({
											label: breed.name,
											value: breed.id,
										}))}
										meta={field.state.meta}
										onValueChange={(value) => field.handleChange(value)}
										value={field.state.value}
										name={field.name}
										onBlur={field.handleBlur}
									/>
								)}
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
