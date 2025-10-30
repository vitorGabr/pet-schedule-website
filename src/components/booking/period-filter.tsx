import { Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useListAvailableDates } from "@/lib/http/generated/endpoints/reservas/reservas";

type Periods = "morning" | "afternoon" | "evening";
const TIME_PERIODS = [
	{ value: "morning", label: "Manhã", start: 6, end: 12 },
	{ value: "afternoon", label: "Tarde", start: 12, end: 18 },
	{ value: "evening", label: "Noite", start: 18, end: 22 },
] as { value: Periods; label: string; start: number; end: number }[];

type Props = {
	timeSelected: `${string}:${string}` | null;
	companyId: string;
	serviceId: string;
	onSelect: (time: `${string}:${string}`) => void;
	selectedDate: Date;
};

export function PeriodFilter({
	onSelect,
	timeSelected,
	companyId,
	serviceId,
	selectedDate,
}: Props) {
	const listAvailableDates = useListAvailableDates(
		companyId,
		serviceId,
		selectedDate.toISOString(),
	);

	const [period, setPeriod] = useState<Periods>("morning");
	const filteredTimeSlots = listAvailableDates.data?.slots?.filter((slot) => {
		const timeMatch = slot.label.match(/(\d{1,2}):(\d{2})/);
		if (!timeMatch) return false;
		const hour = parseInt(timeMatch[1], 10);
		return (
			(TIME_PERIODS.find((p) => p.value === period)?.start ?? 0) <= hour &&
			(TIME_PERIODS.find((p) => p.value === period)?.end ?? 0) > hour
		);
	});

	return (
		<>
			<div className="space-y-2">
				<h4 className="font-semibold">Período do Dia</h4>
				<div className="flex gap-2">
					{TIME_PERIODS.map((p) => (
						<Button
							key={p.value}
							variant={period === p.value ? "default" : "outline"}
							size="sm"
							onClick={() => setPeriod(p.value)}
						>
							{p.label}
						</Button>
					))}
				</div>
			</div>
			<div className="space-y-4">
				<h4 className="font-semibold flex items-center gap-2">
					<Clock className="h-4 w-4" />
					Horários Disponíveis
				</h4>

				{listAvailableDates.isLoading ? (
					<div className="text-center py-4 text-muted-foreground">
						Carregando horários...
					</div>
				) : (filteredTimeSlots?.length ?? 0) > 0 ? (
					<div className="grid grid-cols-4 gap-2">
						{filteredTimeSlots?.map((slot, index) => {
							const isSelected = timeSelected === slot.label;

							return (
								<button
									key={`${slot.label}-${index}`}
									type="button"
									onClick={() => onSelect(slot.label as `${string}:${string}`)}
									className={`
                        p-3 rounded-lg text-center transition-all
                        ${
													isSelected
														? "bg-primary text-primary-foreground"
														: "bg-muted hover:bg-muted/80"
												}
                      `}
								>
									{slot.label}
								</button>
							);
						})}
					</div>
				) : (
					<div className="text-center py-4 text-muted-foreground">
						Nenhum horário disponível para este período
					</div>
				)}
			</div>
		</>
	);
}
