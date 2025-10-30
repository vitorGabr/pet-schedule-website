import { Card, CardContent } from "@/components/ui/card";
import {
	AppointmentByIdResponseDtoOutputAnimal,
	AppointmentByIdResponseDtoOutputClient,
	AppointmentByIdResponseDtoOutputCoatType,
} from "@/lib/http/generated/models";

type Props = {
	animal: AppointmentByIdResponseDtoOutputAnimal;
	client: AppointmentByIdResponseDtoOutputClient;
	coatType: AppointmentByIdResponseDtoOutputCoatType;
	startDate: Date;
	endDate: Date;
};

const coatLabel: Record<AppointmentByIdResponseDtoOutputCoatType, string> = {
	short: "Curto",
	medium: "Médio",
	long: "Longo",
	curly: "Crespo",
};

export function DetailsList({
	animal,
	client,
	coatType,
	startDate,
	endDate,
}: Props) {
	return (
		<Card>
			<CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<p className="text-sm text-muted-foreground">Cliente</p>
					<p className="font-medium">{client.name}</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Animal</p>
					<p className="font-medium">{animal.name}</p>
					<p className="text-sm text-muted-foreground">
						Pelagem: {coatLabel[coatType]}
					</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Início</p>
					<p className="font-medium">{startDate.toLocaleString("pt-BR")}</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Término</p>
					<p className="font-medium">{endDate.toLocaleString("pt-BR")}</p>
				</div>
			</CardContent>
		</Card>
	);
}
