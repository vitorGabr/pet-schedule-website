"use client";

import { format, intervalToDuration } from "date-fns";
import { Calendar, Clock, PawPrint } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { AppointmentsByClientResponseDtoOutputItemsItem } from "@/lib/http";
import { formatCurrency } from "@/utils/currency";

type AppointmentCardProps = {
	item: AppointmentsByClientResponseDtoOutputItemsItem;
};

export function AppointmentCard({ item }: AppointmentCardProps) {
	const [_, setId] = useQueryState("id", parseAsString);
	const { hours = 0, minutes = 0 } = intervalToDuration({
		start: new Date(item.startDate),
		end: new Date(item.endDate),
	});

	const durationLabel = hours
		? `${hours}h${minutes ? ` ${minutes}min` : ""}`
		: `${minutes}min`;

	return (
		<Card
			className="bg-card cursor-pointer rounded-lg py-0 hover:border-primary/50"
			onClick={() => setId(item.id)}
		>
			<CardContent className="p-6">
				<div className="flex items-center flex-wrap gap-4">
					<div className="w-full md:w-auto">
						<Avatar className="size-14 ">
							<AvatarImage src={item.company.logo?.url} />
							<AvatarFallback>{item.company.name.charAt(0)}</AvatarFallback>
						</Avatar>
					</div>

					<div className="w-full md:flex-1">
						<h3 className="text-lg font-bold text-foreground mb-1">
							{item.company.name}
						</h3>
						<p className="text-base text-foreground mb-2">
							{item.service.name} - {item.service.description}
						</p>

						<div className="space-y-1">
							<div className="flex items-center gap-2 text-sm text-foreground">
								<Calendar className="w-4 h-4" />
								<span>
									Data: {format(new Date(item.startDate), "dd/MM/yyyy HH:mm")}
								</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-foreground">
								<Clock className="w-4 h-4" />
								<span>Duração: {durationLabel}</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-foreground">
								<PawPrint className="w-4 h-4" />
								<span>Animal: {item.animal.name}</span>
							</div>
						</div>
					</div>

					<div className="shrink-0">
						<span className="text-2xl font-bold text-primary">
							{formatCurrency(item.price / 100)}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
