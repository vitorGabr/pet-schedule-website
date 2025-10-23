"use client";

import { Clock } from "lucide-react";
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { CompanyByIdResponseDtoOutputServicesItem } from "@/lib/http";
import { formatCurrency } from "@/utils/currency";

type Props = {
	service: CompanyByIdResponseDtoOutputServicesItem;
	authenticated: boolean;
	hasAnimal: boolean;
};

export function ServiceCard({ service, authenticated, hasAnimal }: Props) {
	const [__, setServiceId] = useQueryState("id", parseAsString);
	const [_, setAuthMode] = useQueryState(
		"auth",
		parseAsStringLiteral(["signin", "signup"]),
	);

	function handleBooking() {
		if (!authenticated) return setAuthMode("signin");
		if (!hasAnimal) {
			return toast.error(
				"Você deve ter um animal cadastrado para agendar um serviço",
			);
		}
		setServiceId(service.id);
	}

	return (
		<div
			className={`p-4 rounded-lg border cursor-pointer transition-all border-border hover:border-primary/50`}
			onClick={handleBooking}
		>
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<div className="flex items-center gap-3 mb-2">
						<h3 className="font-semibold text-lg">{service.name}</h3>
					</div>
					<p className="text-muted-foreground mb-2">{service.description}</p>
					<div className="flex items-center gap-4 text-sm text-muted-foreground">
						<div className="flex items-center gap-1">
							<Clock className="w-4 h-4" />
							Aproximadamente {service.duration} minutos
						</div>
					</div>
				</div>
				<div className="text-right">
					<div className="text-md font-bold text-primary mb-2">
						A partir de {formatCurrency(service.price)}
					</div>
					<Button size="sm" onClick={handleBooking}>
						Agendar
					</Button>
				</div>
			</div>
		</div>
	);
}
