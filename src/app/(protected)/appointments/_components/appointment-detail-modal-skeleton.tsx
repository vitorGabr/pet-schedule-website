"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface AppointmentDetailModalSkeletonProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AppointmentDetailModalSkeleton = ({
	isOpen,
	onClose,
}: AppointmentDetailModalSkeletonProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,95vh)] sm:max-w-lg [&>button:last-child]:hidden">
				<DialogHeader className="border-b px-6 flex-row py-4 text-base flex items-center justify-between">
					<DialogTitle className="text-xl font-bold tracking-tight">
						Detalhes do Agendamento
					</DialogTitle>
					<div className="flex items-center gap-2">
						<Skeleton className="h-6 w-20" />
						<Button variant="ghost" size="icon" onClick={onClose}>
							<X className="h-5 w-5" />
						</Button>
					</div>
				</DialogHeader>

				<div className="overflow-y-auto">
					<DialogDescription asChild>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
							<div className="lg:col-span-3 space-y-6">
								{/* Informações principais do serviço */}
								<div className="rounded-lg border bg-background p-6">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										{/* Serviço */}
										<div className="flex items-start gap-3">
											<Skeleton className="h-5 w-5 mt-0.5" />
											<div className="space-y-1 flex-1">
												<Skeleton className="h-4 w-16" />
												<Skeleton className="h-5 w-32" />
											</div>
										</div>

										{/* Local */}
										<div className="flex items-start gap-3">
											<Skeleton className="h-5 w-5 mt-0.5" />
											<div className="space-y-1 flex-1">
												<Skeleton className="h-4 w-12" />
												<Skeleton className="h-5 w-40" />
											</div>
										</div>

										{/* Data e Hora */}
										<div className="flex items-start gap-3">
											<Skeleton className="h-5 w-5 mt-0.5" />
											<div className="space-y-1 flex-1">
												<Skeleton className="h-4 w-20" />
												<Skeleton className="h-5 w-48" />
											</div>
										</div>

										{/* Duração */}
										<div className="flex items-start gap-3">
											<Skeleton className="h-5 w-5 mt-0.5" />
											<div className="space-y-1 flex-1">
												<Skeleton className="h-4 w-16" />
												<Skeleton className="h-5 w-24" />
											</div>
										</div>

										{/* Valor */}
										<div className="flex items-start gap-3 sm:col-span-1">
											<Skeleton className="h-5 w-5 mt-0.5" />
											<div className="space-y-1 flex-1">
												<Skeleton className="h-4 w-12" />
												<Skeleton className="h-5 w-20" />
											</div>
										</div>
									</div>
								</div>

								{/* Card do Animal */}
								<div className="rounded-lg border bg-background p-6">
									<div className="flex items-start gap-4">
										<Skeleton className="h-16 w-16 rounded-lg" />
										<div className="flex-1 space-y-3">
											<div className="space-y-1">
												<Skeleton className="h-6 w-32" />
												<Skeleton className="h-4 w-24" />
											</div>
											<div className="grid grid-cols-2 gap-4">
												<div className="space-y-1">
													<Skeleton className="h-3 w-16" />
													<Skeleton className="h-4 w-20" />
												</div>
												<div className="space-y-1">
													<Skeleton className="h-3 w-12" />
													<Skeleton className="h-4 w-16" />
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Lista de detalhes */}
								<div className="rounded-lg border bg-background p-6">
									<Skeleton className="h-6 w-48 mb-4" />
									<div className="space-y-4">
										{[1, 2, 3, 4, 5].map((i) => (
											<div
												key={i}
												className="flex justify-between items-center py-2 border-b last:border-b-0"
											>
												<Skeleton className="h-4 w-24" />
												<Skeleton className="h-4 w-32" />
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</DialogDescription>
				</div>

				{/* Footer fixo */}
				<div className="px-6 py-4 w-full border flex items-center justify-between">
					<div className="space-y-1">
						<Skeleton className="h-5 w-32" />
					</div>
					<div className="text-right space-y-1">
						<Skeleton className="h-4 w-12" />
						<Skeleton className="h-6 w-20" />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

