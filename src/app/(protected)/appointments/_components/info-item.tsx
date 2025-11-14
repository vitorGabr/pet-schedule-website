import type { ReactNode } from "react";

type Props = { icon: ReactNode; label: string; value: ReactNode };

export const InfoItem = ({ icon, label, value }: Props) => {
	return (
		<div className="flex items-start gap-3">
			<div className="size-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
				{icon}
			</div>
			<div className="flex-1">
				<p className="text-sm text-muted-foreground">{label}</p>
				<div className="font-medium">{value}</div>
			</div>
		</div>
	);
};
