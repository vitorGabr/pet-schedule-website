import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BookingSkeleton() {
	return (
		<div className="p-6 space-y-6">
			{/* Service Information Skeleton */}
			<Card>
				<CardContent className="p-4">
					<div className="flex justify-between items-start">
						<div className="flex-1">
							<Skeleton className="h-6 w-48 mb-2" />
							<Skeleton className="h-4 w-full max-w-md" />
						</div>
						<div className="text-right space-y-1">
							<Skeleton className="h-6 w-20 ml-auto" />
							<Skeleton className="h-4 w-16 ml-auto" />
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Date Selection Skeleton */}
			<div className="space-y-3">
				<Skeleton className="h-5 w-32" />
				<div className="grid grid-cols-7 gap-2">
					{Array.from({ length: 7 }).map((_, i) => (
						<Skeleton key={`weekday-${i}`} className="h-10 w-full" />
					))}
				</div>
				<div className="grid grid-cols-7 gap-2">
					{Array.from({ length: 14 }).map((_, i) => (
						<Skeleton key={`date-${i}`} className="h-10 w-full" />
					))}
				</div>
			</div>

			{/* Time Selection Skeleton */}
			<div className="space-y-3">
				<Skeleton className="h-5 w-40" />
				<div className="grid grid-cols-4 gap-2">
					{Array.from({ length: 8 }).map((_, i) => (
						<Skeleton key={`time-${i}`} className="h-10 w-full" />
					))}
				</div>
			</div>

			{/* Form Fields Skeleton */}
			<div className="space-y-4">
				{/* Animal Selection */}
				<div className="space-y-2">
					<Skeleton className="h-5 w-36" />
					<Skeleton className="h-10 w-full" />
				</div>

				{/* Disease Selection */}
				<div className="space-y-2">
					<Skeleton className="h-5 w-52" />
					<Skeleton className="h-10 w-full" />
				</div>

				{/* Coat Type Selection */}
				<div className="space-y-2">
					<Skeleton className="h-5 w-44" />
					<Skeleton className="h-10 w-full" />
				</div>
			</div>

			{/* Warning Section Skeleton */}
			<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
				<div className="flex items-start gap-3">
					<Skeleton className="h-5 w-5 rounded-full mt-0.5" />
					<div className="flex-1 space-y-2">
						<Skeleton className="h-4 w-20" />
						<div className="space-y-1">
							<Skeleton className="h-3 w-full" />
							<Skeleton className="h-3 w-full" />
							<Skeleton className="h-3 w-3/4" />
						</div>
					</div>
				</div>
			</div>

			{/* Footer Section Skeleton */}
			<div className="flex justify-between items-center pt-4 border-t">
				<div className="space-y-1">
					<Skeleton className="h-5 w-24" />
					<Skeleton className="h-4 w-32" />
				</div>
				<Skeleton className="h-10 w-24" />
			</div>
		</div>
	);
}
