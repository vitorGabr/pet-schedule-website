"use client";

import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteAnimal } from "@/lib/http";
import { useModal } from "@/stores/modal-store";
import { revalidateCache } from "@/utils/revalidate";

type ModalData = { id: string; name: string };
export function DeletePetDialog() {
	const { data, isOpen, close } = useModal<ModalData>("delete-pet");
	const deleteAnimalMutation = useDeleteAnimal();

	const handleDelete = async () => {
		if (!data) return;
		await deleteAnimalMutation.mutateAsync({ id: data.id });
		await revalidateCache({ type: "path", path: "/pets" });

		toast.success(`${data?.name} foi removido com sucesso!`);
		close();
	};

	if (!data) return null;

	return (
		<AlertDialog open={isOpen} onOpenChange={close}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex items-center gap-3">
						<div className="shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
							<AlertTriangle className="w-5 h-5 text-red-600" />
						</div>
						<div>
							<AlertDialogTitle className="text-left">
								Excluir {data.name}?
							</AlertDialogTitle>
							<AlertDialogDescription className="text-left mt-1">
								Esta ação não pode ser desfeita. O pet será permanentemente
								removido do seu perfil e todos os dados associados serão
								perdidos.
							</AlertDialogDescription>
						</div>
					</div>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<Button
						onClick={handleDelete}
						disabled={deleteAnimalMutation.isPending}
						className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
					>
						{deleteAnimalMutation.isPending ? "Excluindo..." : "Sim, excluir"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
