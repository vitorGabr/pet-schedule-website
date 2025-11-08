import { Clock } from "lucide-react";
import { Activity } from "react";
import { useListAvailableDates } from "@/lib/http/generated/endpoints/reservas/reservas";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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

	return (
		<div className="space-y-4">
			<h4 className="font-semibold flex items-center gap-2">
				<Clock className="h-4 w-4" />
				Horários Disponíveis
			</h4>
			<Activity mode={listAvailableDates.isLoading ? "visible" : "hidden"}>
				<div className="text-center py-4 text-muted-foreground">
					Carregando horários...
				</div>
			</Activity>
			<Activity
				mode={listAvailableDates.data?.slots.length ? "visible" : "hidden"}
			>
				<div className="grid grid-cols-4 lg:grid-cols-5 gap-2">
					{listAvailableDates.data?.slots?.map((slot, index) => {
						const isSelected = timeSelected === slot.label;

						return (
							<Button
								key={`${slot.label}-${index}`}
								onClick={() => onSelect(slot.label as `${string}:${string}`)}
								className={cn(
									"bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10",
									isSelected && "bg-primary text-primary-foreground",
								)}
							>
								{slot.label}
							</Button>
						);
					})}
				</div>
			</Activity>

			<Activity
				mode={
					listAvailableDates.data && listAvailableDates.data.slots.length === 0
						? "visible"
						: "hidden"
				}
			>
				<div className="text-center py-4 text-muted-foreground">
					Nenhum horário disponível para este período
				</div>
			</Activity>
		</div>
	);
}
