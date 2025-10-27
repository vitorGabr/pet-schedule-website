"use client";

import { useForm } from "@tanstack/react-form";
import { AxiosError } from "axios";
import { addDays, format } from "date-fns";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect } from "react";
import { toast } from "sonner";
import type z from "zod";
import { SelectField } from "@/components/form/fields/select-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { COAT_TYPES, DISEASES } from "@/constants/pet";
import type { ListAnimalFromUserResponseDtoOutputItemsItem } from "@/lib/http";
import { createAppointment, useGetServiceById } from "@/lib/http";
import { createBookingSchema } from "@/schemas/create-booking";
import { formatCurrency } from "@/utils/currency";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { BookingSkeleton } from "./booking-skeleton";
import { PeriodFilter } from "./period-filter";
import { SelectionDate } from "./selection-date";

export function BookingModal({
	companyId,
	animals,
}: {
	companyId: string;
	animals: ListAnimalFromUserResponseDtoOutputItemsItem[];
}) {
	const router = useRouter();
	const [serviceId, setServiceId] = useQueryState("id", parseAsString);
	const {
		data: service,
		isLoading,
		isError,
	} = useGetServiceById(serviceId!, { query: { enabled: !!serviceId } });

	const form = useForm({
		defaultValues: { date: new Date(), serviceId: service?.id } as z.input<
			typeof createBookingSchema
		>,
		validators: { onChange: createBookingSchema },
		onSubmit: async ({ value }) => {
			try {
				const result = await createAppointment(
					createBookingSchema.parse(value),
				);
				handleClose();
				router.push(result.checkoutUrl || ("/appointments" as any));
			} catch (error) {
				if (error instanceof AxiosError) {
					toast.error(
						error.response?.data?.message ?? "Erro ao criar agendamento",
					);
				}
			}
		},
	});

	const handleClose = () => setServiceId(null);

	useEffect(() => {
		if (isError) {
			handleClose();
			toast.error("Serviço não encontrado");
		}
	}, [isError]);

	return (
		<Dialog open={serviceId !== null} onOpenChange={handleClose}>
			<DialogContent className="w-full max-w-3xl px-0">
				<DialogHeader className="px-6">
					<DialogTitle className="text-xl font-bold">
						Agendar Serviço
					</DialogTitle>
				</DialogHeader>
				<div className="h-[70vh] overflow-y-auto">
					{!isLoading ? (
						<div className="px-6 space-y-6">
							{/* Informações do Serviço */}
							<Card>
								<CardContent className="p-4">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="font-semibold text-lg">{service?.name}</h3>
											<p className="text-muted-foreground text-sm">
												{service?.description}
											</p>
										</div>
										<div className="text-right">
											<div className="text-lg font-bold text-primary">
												{formatCurrency((service?.price ?? 0) / 100)}
											</div>
											<div className="text-sm text-muted-foreground">
												{service?.duration} min
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							<form.Field name="date">
								{(field) => (
									<SelectionDate
										selectedDate={field.state.value}
										setSelectedDate={(date) => field.handleChange(date)}
									/>
								)}
							</form.Field>

							<form.Subscribe selector={(state) => state.values.date}>
								{(date) => (
									<form.Field name="time">
										{(field) => (
											<PeriodFilter
												companyId={companyId}
												serviceId={serviceId ?? ""}
												selectedDate={date}
												onSelect={(date) => field.handleChange(date)}
												timeSelected={
													field.state.value as `${string}:${string}` | null
												}
											/>
										)}
									</form.Field>
								)}
							</form.Subscribe>

							<div className="space-y-2">
								<form.Field name="animalId">
									{(field) => (
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
								</form.Field>
							</div>

							<form.Field name="disease">
								{(field) => (
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
							</form.Field>

							<form.Field name="coatType">
								{(field) => (
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
							</form.Field>

							<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
								<div className="flex items-start gap-3">
									<AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
									<div className="text-sm">
										<p className="font-medium text-amber-800 mb-1">
											Importante
										</p>
										<p className="text-amber-700">
											O tempo e valor do serviço podem variar dependendo do
											porte do animal, idade, comportamento e condições
											específicas. O valor final será confirmado após avaliação
											do profissional.
										</p>
									</div>
								</div>
							</div>

							<div className="flex justify-between items-center pt-4 border-t">
								<div>
									<div className="font-semibold">
										Total: {formatCurrency(service?.price ?? 0)}
									</div>
									<div className="text-sm text-muted-foreground">
										<form.Subscribe
											selector={(state) => [
												state.values.date,
												state.values.time,
											]}
										>
											{([date, time]) => (
												<>
													{date &&
														time &&
														`${time} - ${format(addDays(date, 0), "dd/MM/yyyy")}`}
												</>
											)}
										</form.Subscribe>
									</div>
								</div>
								<form.Subscribe
									selector={(state) => [state.canSubmit, state.isSubmitting]}
								>
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
					) : (
						<BookingSkeleton />
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
