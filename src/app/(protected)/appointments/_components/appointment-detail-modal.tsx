"use client";

import { differenceInMinutes, format, intervalToDuration } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import {
	CalendarDays,
	Clock,
	DollarSign,
	MapPin,
	Scissors,
	X,
} from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useGetAppointmentById } from "@/lib/http";
import { formatCurrency } from "@/utils/currency";
import { AnimalCard } from "./animal-card";
import { AppointmentDetailModalSkeleton } from "./appointment-detail-modal-skeleton";
import { DetailsList } from "./details-list";
import { InfoItem } from "./info-item";
import { StatusBadge } from "./status-badge";

export const AppointmentDetailModal = () => {
	const [id, setId] = useQueryState("id", parseAsString);
	const { data: appointmentData, isLoading } = useGetAppointmentById(id!, {
		query: { enabled: !!id, queryKey: ["appointment", id] },
	});

	if (!appointmentData) return null;

	const start = new Date(appointmentData?.startDate ?? "");
	const end = new Date(appointmentData?.endDate ?? "");
	const minutes = Math.max(0, differenceInMinutes(end, start));
	const { hours = 0, minutes: mins = 0 } = intervalToDuration({ start, end });
	const onPayClick = () => {
		if (appointmentData.payment.checkoutUrl) {
			window.location.href = appointmentData.payment.checkoutUrl;
		}
	};

	return (
		<Dialog open={true} onOpenChange={() => setId(null)}>
			<DialogContent className="flex flex-col gap-0 p-0 max-h-[min(640px,95vh)] sm:max-w-lg [&>button:last-child]:hidden">
				<DialogHeader className="border-b px-6 flex-row py-4 text-base flex items-center justify-between">
					<DialogTitle className="text-sm md:text-xl font-bold tracking-tight">
						Detalhes do Agendamento
					</DialogTitle>
					<div className="flex items-center gap-2">
						<StatusBadge status={appointmentData.status} />
						<Button variant="ghost" size="icon" onClick={() => setId(null)}>
							<X className="h-5 w-5" />
						</Button>
					</div>
				</DialogHeader>

				{isLoading ? (
					<AppointmentDetailModalSkeleton />
				) : (
					<>
						<div className="overflow-y-auto">
							<DialogDescription asChild>
								<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
									<div className="lg:col-span-3 space-y-6">
										<div className="rounded-lg border bg-background p-6">
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
												<InfoItem
													icon={<Scissors className="h-5 w-5" />}
													label="Serviço"
													value={
														<span className="text-primary">
															{appointmentData.service.name}
														</span>
													}
												/>
												<InfoItem
													icon={<MapPin className="h-5 w-5" />}
													label="Local"
													value={<span>{appointmentData.company.name}</span>}
												/>
												<InfoItem
													icon={<CalendarDays className="h-5 w-5" />}
													label="Data e Hora"
													value={
														<span>
															{format(start, "PPP, p", { locale: ptBR })}
														</span>
													}
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
															{formatCurrency(appointmentData.price / 100)}
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
							{appointmentData.status === "scheduled" ? (
								<Button onClick={onPayClick}>Pagar Agora</Button>
							) : (
								<p className="font-semibold leading-none">
									{appointmentData.service.name}
								</p>
							)}
							<div className="text-right">
								<p className="text-sm text-muted-foreground">Preço</p>
								<p className="text-lg font-semibold">
									{formatCurrency(appointmentData.price / 100)}
								</p>
							</div>
						</div>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};
