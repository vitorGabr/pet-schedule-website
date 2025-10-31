"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ListAnimalFromUserResponseDtoOutputItemsItem } from "@/lib/http/generated/models";
import { useModalStore } from "@/stores/modal-store";

type PetCardProps = { pet: ListAnimalFromUserResponseDtoOutputItemsItem };

export function PetCard({ pet }: PetCardProps) {
	const [_, setId] = useQueryState("id");
	const open = useModalStore((state) => state.open);

	return (
		<Card
			className="cursor-pointer hover:shadow-lg transition-shadow py-0"
			onClick={() => setId(pet.id)}
		>
			<CardContent className="p-6">
				<div className="flex items-start gap-4">
					{pet.asset?.url ? (
						<Image
							src={pet.asset.url}
							alt={pet.name}
							width={80}
							height={80}
							className="rounded-full object-cover h-20 w-20"
						/>
					) : (
						<div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
							<span className="text-2xl">🐾</span>
						</div>
					)}

					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-lg mb-2 truncate">{pet.name}</h3>

						<div className="space-y-1 text-sm text-gray-600">
							{pet.age && <p>Idade: {pet.age}</p>}
							{pet.weight && <p>Peso: {pet.weight}</p>}
							{pet.breed && <p>Raça: {pet.breed.name}</p>}
						</div>
					</div>
				</div>

				<div className="flex justify-end gap-2 mt-4">
					<Button variant="outline" size="sm" onClick={() => setId(pet.id)}>
						Editar
					</Button>
					<Button
						onClick={(e) => {
							e.stopPropagation();
							open({ key: "delete-pet", data: pet })
						}}
						variant="outline"
						size="sm"
						className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
					>
						<Trash2 className="w-4 h-4 mr-1" />
						Excluir
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
