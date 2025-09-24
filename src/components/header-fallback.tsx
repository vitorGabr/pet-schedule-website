import { Skeleton } from "@/components/ui/skeleton";

export function HeaderFallback() {
	return (
		<header className="bg-background flex items-center justify-between border-b border-solid px-4 py-3 md:px-10 gap-6">
			<div className="flex items-center gap-3 md:gap-10 w-full py-3 md:py-0">
				<Skeleton className="h-10 w-[70px]" />
				<div className="hidden md:block w-full">
					<Skeleton className="w-full h-6" />
				</div>
			</div>
			<Skeleton className="w-10 h-10 rounded-full" />
		</header>
	);
}