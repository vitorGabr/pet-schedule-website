"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CompanyCardSkeleton() {
	return (
		<Card className="py-0 w-full bg-white rounded-lg overflow-hidden">
			{/* Image skeleton */}
			<div className="relative">
				<Skeleton className="w-full h-48" />
				{/* Available badge skeleton */}
				<Skeleton className="absolute top-3 right-3 h-6 w-20 rounded-full" />
			</div>

			<CardContent className="px-4 py-0 pb-4">
				<div className="flex items-start gap-3 mb-3">
					<div className="flex-1 min-w-0">
						{/* Company name skeleton */}
						<Skeleton className="h-6 mb-2 w-3/4" />

						{/* Rating skeleton */}
						<div className="flex items-center gap-2 mb-2">
							<div className="flex items-center gap-1">
								{[1, 2, 3, 4, 5].map((starNumber) => (
									<Skeleton key={`skeleton-star-${starNumber}`} className="w-4 h-4" />
								))}
							</div>
							<Skeleton className="h-4 w-24" />
						</div>

						{/* Location skeleton */}
						<div className="flex items-center gap-1 mb-3">
							<Skeleton className="w-4 h-4" />
							<Skeleton className="h-4 w-32" />
						</div>
					</div>
				</div>

				{/* Description skeleton */}
				<div className="space-y-2 mb-4">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<Skeleton className="h-4 w-4/6" />
				</div>
			</CardContent>
		</Card>
	);
}

export function CompanyCardSkeletonGrid({ count = 6 }: { count?: number }) {
	const skeletonIds = Array.from(
		{ length: count },
		(_, index) => `skeleton-${Date.now()}-${index}`,
	);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{skeletonIds.map((id) => (
				<CompanyCardSkeleton key={id} />
			))}
		</div>
	);
}
