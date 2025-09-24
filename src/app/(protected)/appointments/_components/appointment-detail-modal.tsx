"use client";

import { useGetAppointmentById } from "@/lib/http";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { differenceInMinutes, format, intervalToDuration } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CalendarDays, Clock, DollarSign, MapPin, Scissors, X } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { AnimalCard } from "./animal-card";
import { DetailsList } from "./details-list";
import { InfoItem } from "./info-item";
import { StatusBadge } from "./status-badge";

export const AppointmentDetailModal = () => {
	const [id, setId] = useQueryState("id", parseAsString);
	const { data: appointmentData, isLoading } = useGetAppointmentById(id!, {
		query: { enabled: !!id, queryKey: ["appointment", id] },
	});

	if (isLoading) return <div>Loading...</div>;
	if (!appointmentData) return null;

	const start = new Date(appointmentData?.startDate ?? "");
	const end = new Date(appointmentData?.endDate ?? "");
	const minutes = Math.max(0, differenceInMinutes(end, start));
	const { hours = 0, minutes: mins = 0 } = intervalToDuration({ start, end });

	return (
		<Dialog open={true} onOpenChange={() => setId(null)}>
			<DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,95vh)] sm:max-w-lg [&>button:last-child]:hidden">
				<DialogHeader className="border-b px-6 flex-row py-4 text-base flex items-center justify-between">
					<DialogTitle className="text-xl font-bold tracking-tight">
						Detalhes do Agendamento
					</DialogTitle>
					<div className="flex items-center gap-2">
						<StatusBadge status={appointmentData.status} />
						<Button variant="ghost" size="icon" onClick={() => setId(null)}>
							<X className="h-5 w-5" />
						</Button>
					</div>
				</DialogHeader>

				<div className="overflow-y-auto">
					<DialogDescription asChild>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
							<div className="lg:col-span-3 space-y-6">
								<div className="rounded-lg border bg-background p-6">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										<InfoItem
											icon={<Scissors className="h-5 w-5" />}
											label="Serviço"
											value={<span className="text-primary">{appointmentData.service.name}</span>}
										/>
										<InfoItem
											icon={<MapPin className="h-5 w-5" />}
											label="Local"
											value={<span>{appointmentData.company.name}</span>}
										/>
										<InfoItem
											icon={<CalendarDays className="h-5 w-5" />}
											label="Data e Hora"
											value={<span>{format(start, "PPP, p", { locale: ptBR })}</span>}
										/>
										<InfoItem
											icon={<Clock className="h-5 w-5" />}
											label="Duração"
											value={
												<span>
													{minutes >= 60
														? `${hours}h${mins ? ` ${mins}min` : ""}`
														: `${minutes}min`}
												</span>
											}
										/>
										<InfoItem
											icon={<DollarSign className="h-5 w-5" />}
											label="Valor"
											value={
												<span className="font-semibold">
													{appointmentData.price.toLocaleString("pt-BR", {
														style: "currency",
														currency: "BRL",
													})}
												</span>
											}
										/>
									</div>
								</div>

								<AnimalCard animal={appointmentData.animal} />

								<DetailsList
									animal={appointmentData.animal}
									client={appointmentData.client}
									coatType={appointmentData.coatType}
									startDate={start}
									endDate={end}
								/>
							</div>
						</div>
					</DialogDescription>
				</div>
				<div className="px-6 py-4 w-full border flex items-center justify-between">
					<div>
						<p className="font-semibold leading-none">{appointmentData.service.name}</p>
					</div>
					<div className="text-right">
						<p className="text-sm text-muted-foreground">Preço</p>
						<p className="text-lg font-semibold">
							{appointmentData.price.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
