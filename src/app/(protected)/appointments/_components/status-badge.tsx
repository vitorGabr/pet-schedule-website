import { match } from "ts-pattern";
import { Badge } from "@/components/ui/badge";
import { AppointmentByIdResponseDtoOutputStatus } from "@/lib/http/generated/models";

type Props = { status: AppointmentByIdResponseDtoOutputStatus };
const statusLabel: Record<AppointmentByIdResponseDtoOutputStatus, string> = {
	in_progress: "Em andamento",
	confirmed: "Confirmado",
	canceled: "Cancelado",
	completed: "Concluído",
	no_show: "Não compareceu",
	scheduled: "Pendente",
};

export function StatusBadge({ status }: Props) {
	const variant = match(status)
		.returnType<"default" | "secondary" | "destructive" | "outline">()
		.with("confirmed", () => "default")
		.with("in_progress", () => "secondary")
		.with("completed", () => "default")
		.with("canceled", () => "destructive")
		.with("no_show", () => "destructive")
		.with("scheduled", () => "secondary")
		.exhaustive();

	return <Badge variant={variant}>{statusLabel[status]}</Badge>;
}
