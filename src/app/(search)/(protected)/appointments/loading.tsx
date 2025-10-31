import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingAppointmentsList() {
	return (
		<div className="container mx-auto max-w-6xl px-4 py-8 space-y-6">
			<div className="h-7 w-56">
				<Skeleton className="h-7 w-56" />
			</div>
			<div className="grid grid-cols-1 gap-4">
				{[1, 2, 3, 4, 5].map((k) => (
					<Skeleton key={k} className="h-24 w-full" />
				))}
			</div>
		</div>
	);
}
