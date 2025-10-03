import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { AppointmentByIdResponseDtoOutputAnimal } from "@/lib/http";

type Props = { animal: AppointmentByIdResponseDtoOutputAnimal };

export function AnimalCard({ animal }: Props) {
	const imageUrl = animal.asset?.url;

	return (
		<Card>
			<CardContent className="p-4 flex items-center gap-4">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={animal.name}
						width={80}
						height={80}
						className="rounded-md object-cover h-20 w-20"
					/>
				) : (
					<div className="h-14 w-14 rounded-md bg-muted" />
				)}
				<div className="min-w-0">
					<p className="font-semibold leading-none truncate">{animal.name}</p>
					{animal.breed?.name && (
						<p className="text-sm text-muted-foreground truncate">
							{animal.breed.name}
						</p>
					)}
					{animal.age && animal.age && (
						<p className="text-sm text-muted-foreground">{animal.age} anos</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
