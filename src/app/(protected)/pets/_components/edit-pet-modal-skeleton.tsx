"use client";

import { Camera } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface EditPetModalSkeletonProps {
	isOpen: boolean;
	onClose: () => void;
}

export function EditPetModalSkeleton({
	isOpen,
	onClose,
}: EditPetModalSkeletonProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="w-full max-w-md">
				<DialogHeader className="items-start flex">
					<DialogTitle>Editar animal de estimação</DialogTitle>
					<DialogDescription>
						Atualize as informações do seu pet.
					</DialogDescription>
				</DialogHeader>

				<div className="p-6 space-y-6">
					<div className="space-y-4">
						{/* Pet Avatar Section Skeleton */}
						<div className="flex justify-center">
							<div className="relative">
								<Skeleton className="w-24 h-24 rounded-full" />
								<div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
									<Camera className="w-4 h-4 text-white" />
								</div>
							</div>
						</div>

						{/* Pet Name Field Skeleton */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-12" />
							<Skeleton className="h-10 w-full rounded-md" />
						</div>

						{/* Weight and Age Row Skeleton */}
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-10 w-full rounded-md" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-4 w-12" />
								<Skeleton className="h-10 w-full rounded-md" />
							</div>
						</div>

						{/* Action Buttons Skeleton */}
						<div className="flex gap-3 pt-4">
							<Skeleton className="h-10 flex-1 rounded-md" />
							<Skeleton className="h-10 flex-1 rounded-md" />
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
