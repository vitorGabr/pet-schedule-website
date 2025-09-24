"use client";

import type {
	CompanyByIdResponseDtoOutputServicesItem,
	ListAnimalFromUserResponseDtoOutputItemsItem,
} from "@/lib/http";
import { createAppointment } from "@/lib/http";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Modal,
	ModalClose,
	ModalContent,
	ModalHeader,
	ModalTitle,
} from "@/components/ui/modal";
import { useForm } from "@tanstack/react-form";
import { addDays, format } from "date-fns";
import { AlertTriangle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { toast } from "sonner";
import type z from "zod";
import { SelectField } from "@/components/form/fields/select-field";
import { createBookingSchema } from "@/schemas/create-booking";
import { formatCurrency } from "@/utils/currency";
import { PeriodFilter } from "./period-filter";
import { SelectionDate } from "./selection-date";

type Props = {
	companyId: string;
	userId: string;
	animals: ListAnimalFromUserResponseDtoOutputItemsItem[];
	service: CompanyByIdResponseDtoOutputServicesItem;
};

const COAT_TYPES = [
	{ value: "short", label: "Curto" },
	{ value: "medium", label: "Médio" },
	{ value: "long", label: "Longo" },
	{ value: "curly", label: "Cacheado" },
] as const;

const DISEASES = [
	{ value: "none", label: "Nenhuma" },
	{ value: "diabetes", label: "Diabetes" },
	{ value: "heart_disease", label: "Problema Cardíaco" },
	{ value: "arthritis", label: "Artrite" },
	{ value: "allergies", label: "Alergias" },
	{ value: "skin_condition", label: "Problema de Pele" },
	{ value: "other", label: "Outro" },
] as const;

export function BookingModal({ service, companyId, animals, userId }: Props) {
	const router = useRouter();
	const [_, setServiceId] = useQueryState("id", parseAsString.withOptions({ shallow: false }));

	const form = useForm({
		defaultValues: { date: new Date(), serviceId: service.id, userId: userId } as z.input<
			typeof createBookingSchema
		>,
		validators: { onChange: createBookingSchema },
		onSubmit: async ({ value }) => {
			await createAppointment(createBookingSchema.parse(value));
			router.push(`/appointments`);
			toast.success("Agendamento criado com sucesso");
		},
	});

	const handleClose = () => setServiceId(null);

	return (
		<Modal open={true} onOpenChange={handleClose}>
			<ModalContent className="w-full max-w-2xl mx-4">
				<ModalHeader>
					<ModalTitle className="text-xl font-bold">Agendar Serviço</ModalTitle>
					<ModalClose onClick={handleClose}>
						<X className="h-4 w-4" />
					</ModalClose>
				</ModalHeader>

				<div className="p-6 space-y-6">
					{/* Informações do Serviço */}
					<Card>
						<CardContent className="p-4">
							<div className="flex justify-between items-start">
								<div>
									<h3 className="font-semibold text-lg">{service.name}</h3>
									<p className="text-muted-foreground text-sm">{service.description}</p>
								</div>
								<div className="text-right">
									<div className="text-lg font-bold text-primary">
										{formatCurrency(service.price)}
									</div>
									<div className="text-sm text-muted-foreground">{service.duration} min</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<form.Field
						name="date"
						children={(field) => (
							<SelectionDate
								selectedDate={field.state.value}
								setSelectedDate={(date) => field.handleChange(date)}
							/>
						)}
					/>

					<form.Subscribe selector={(state) => state.values.date}>
						{(date) => (
							<form.Field
								name="time"
								children={(field) => (
									<PeriodFilter
										companyId={companyId}
										serviceId={service.id}
										selectedDate={date}
										onSelect={(date) => field.handleChange(date)}
										timeSelected={field.state.value as `${string}:${string}` | null}
									/>
								)}
							/>
						)}
					</form.Subscribe>

					<div className="space-y-2">
						<form.Field
							name="animalId"
							children={(field) => (
								<SelectField
									label="Selecione um animal"
									placeholder="Selecine um animal para agendar"
									meta={field.state.meta}
									onValueChange={(value) => field.handleChange(value)}
									value={field.state.value}
									name={field.name}
									onBlur={field.handleBlur}
									options={(animals ?? []).map((animal) => ({
										label: animal.name,
										value: animal.id,
									}))}
								/>
							)}
						/>
					</div>

					<form.Field
						name="disease"
						children={(field) => (
							<SelectField
								label="O animal possui alguma doença?"
								placeholder="Selecione uma doença"
								onValueChange={(value) => field.handleChange(value)}
								value={field.state.value}
								name={field.name}
								onBlur={field.handleBlur}
								options={DISEASES.map((disease) => ({
									label: disease.label,
									value: disease.value,
								}))}
								meta={field.state.meta}
							/>
						)}
					/>

					<form.Field
						name="coatType"
						children={(field) => (
							<SelectField
								label="Selecione o tipo de pelagem"
								placeholder="Selecione o tipo de pelagem"
								onValueChange={(value) => field.handleChange(value)}
								value={field.state.value}
								name={field.name}
								onBlur={field.handleBlur}
								options={COAT_TYPES.map((coatType) => ({
									label: coatType.label,
									value: coatType.value,
								}))}
								meta={field.state.meta}
							/>
						)}
					/>

					<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
						<div className="flex items-start gap-3">
							<AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
							<div className="text-sm">
								<p className="font-medium text-amber-800 mb-1">Importante</p>
								<p className="text-amber-700">
									O tempo e valor do serviço podem variar dependendo do porte do animal, idade,
									comportamento e condições específicas. O valor final será confirmado após
									avaliação do profissional.
								</p>
							</div>
						</div>
					</div>

					<div className="flex justify-between items-center pt-4 border-t">
						<div>
							<div className="font-semibold">Total: {formatCurrency(service.price)}</div>
							<div className="text-sm text-muted-foreground">
								<form.Subscribe
									selector={(state) => [state.values.date, state.values.time]}
									children={([date, time]) => (
										<>{date && time && `${time} - ${format(addDays(date, 0), "dd/MM/yyyy")}`}</>
									)}
								/>
							</div>
						</div>
						<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
							{([canSubmit, isSubmitting]) => (
								<Button
									disabled={!canSubmit || isSubmitting}
									onClick={() => form.handleSubmit()}
									className="px-8"
								>
									{isSubmitting ? "Agendando..." : "Continuar"}
								</Button>
							)}
						</form.Subscribe>
					</div>
				</div>
			</ModalContent>
		</Modal>
	);
}
