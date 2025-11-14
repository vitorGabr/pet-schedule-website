"use client";

import { differenceInMinutes, format, intervalToDuration } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CalendarDays, Clock, MapPin, Scissors, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useGetAppointmentById } from "@/lib/http/generated/endpoints/agendamentos/agendamentos";
import { formatCurrency } from "@/utils/currency";
import { AnimalCard } from "./animal-card";
import { AppointmentDetailModalSkeleton } from "./appointment-detail-modal-skeleton";
import { DetailsList } from "./details-list";
import { InfoItem } from "./info-item";
import { StatusBadge } from "./status-badge";

export const AppointmentDetailModal = () => {
	const router = useRouter();
	const id = useSearchParams().get("id");
	const { data, isLoading } = useGetAppointmentById(id!, {
		query: { enabled: !!id, queryKey: ["appointment", id] },
	});

	const start = new Date(data?.startDate ?? "");
	const end = new Date(data?.endDate ?? "");
	const minutes = Math.max(0, differenceInMinutes(end, start));
	const { hours = 0, minutes: mins = 0 } = intervalToDuration({ start, end });
	const paymentLink =
		data?.payment.checkoutUrl &&
		data?.status === "scheduled" &&
		data?.payment.checkoutUrl;

	const onPayClick = () => {
		if (paymentLink) {
			window.location.href = paymentLink;
		}
	};

	const onClose = () => {
		router.push("/appointments");
	};

	return (
		<Dialog open={id !== null} onOpenChange={onClose}>
			<DialogContent className="flex flex-col gap-0 p-0 max-h-[min(640px,95vh)] sm:max-w-lg [&>button:last-child]:hidden">
				<DialogHeader className="border-b px-6 flex-row py-4 text-base flex items-center justify-between">
					<DialogTitle className="text-sm md:text-xl font-bold tracking-tight">
						Detalhes do Agendamento
					</DialogTitle>
					{data && (
						<div className="flex items-center gap-2">
							<StatusBadge status={data?.status} />
							<Button variant="ghost" size="icon" onClick={onClose}>
								<X className="h-5 w-5" />
							</Button>
						</div>
					)}
				</DialogHeader>

				{data && (
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
															{data?.service.name}
														</span>
													}
												/>
												<InfoItem
													icon={<MapPin className="h-5 w-5" />}
													label="Local"
													value={<span>{data?.company.name}</span>}
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
											</div>
										</div>

										{data && <AnimalCard animal={data?.animal} />}

										{data && (
											<DetailsList
												animal={data?.animal}
												client={data?.client}
												coatType={data?.coatType}
												startDate={start}
												endDate={end}
											/>
										)}
									</div>
								</div>
							</DialogDescription>
						</div>
						<div className="px-6 py-4 w-full border flex items-center justify-between">
							{paymentLink ? (
								<Button onClick={onPayClick}>Pagar Agora</Button>
							) : (
								<p className="font-semibold leading-none">
									{data?.service.name}
								</p>
							)}
							<div className="text-right">
								<p className="text-sm text-muted-foreground">Preço</p>
								<p className="text-lg font-semibold">
									{formatCurrency((data?.price ?? 0) / 100)}
								</p>
							</div>
						</div>
					</>
				)}

				{isLoading && <AppointmentDetailModalSkeleton />}
			</DialogContent>
		</Dialog>
	);
};
