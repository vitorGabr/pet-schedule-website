import { Clock, Globe, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CompanyByIdResponseDtoOutput } from "@/lib/http";

type Props = { data: CompanyByIdResponseDtoOutput };

const daysOfWeek = {
	sunday: "Domingo",
	monday: "Segunda-feira",
	tuesday: "Terça-feira",
	wednesday: "Quarta-feira",
	thursday: "Quinta-feira",
	friday: "Sexta-feira",
	saturday: "Sábado",
} as const;

export function ContactInfo({ data }: Props) {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Informações de Contato</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center gap-3">
						<Phone className="w-5 h-5 text-primary" />
						<span>{data.contact}</span>
					</div>
					<div className="flex items-center gap-3">
						<Mail className="w-5 h-5 text-primary" />
						<span>{"Email: Sem informações"}</span>
					</div>
					<div className="flex items-center gap-3">
						<Globe className="w-5 h-5 text-primary" />
						<span>{"Website: Sem informações"}</span>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Horários</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{data.availabilities.map((availability) => (
						<div key={availability.day} className="flex items-center gap-3">
							<Clock className="w-5 h-5 text-primary" />
							<span className="text-sm">{`${daysOfWeek[availability.day]}: ${availability.timeRange.startTime} - ${availability.timeRange.endTime}`}</span>
						</div>
					))}
				</CardContent>
			</Card>
		</>
	);
}
