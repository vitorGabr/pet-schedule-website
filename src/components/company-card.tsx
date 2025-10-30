import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchCompaniesResponseDtoOutputItemsItem } from "@/lib/http/generated/models";

interface CompanyCardProps {
	data: SearchCompaniesResponseDtoOutputItemsItem;
}

export function CompanyCard({ data }: CompanyCardProps) {
	return (
		<Link href={`/${data.id}`}>
			<Card className="py-0 w-full bg-white border shadow-none rounded-lg overflow-hidden">
				<div className="relative">
					<div className="w-full h-48" />
					<Image
						src={data.image?.url ?? ""}
						alt={data.name}
						fill
						className="object-cover"
					/>
					<div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
						Disponível
					</div>
				</div>

				<CardContent className="px-4 py-0 pb-4">
					<div className="flex items-start gap-3 mb-3">
						<div className="flex-1 min-w-0">
							<h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
								{data.name}
							</h3>
							<div className="flex items-center gap-2 mb-2">
								<div className="flex items-center gap-1">
									{[1, 2, 3, 4, 5].map((starNumber) => (
										<Star
											key={`star-${data.name}-${starNumber}`}
											className={`w-4 h-4 ${
												starNumber <= Math.floor(data.averageRating ?? 0)
													? "text-yellow-400 fill-current"
													: "text-gray-300"
											}`}
										/>
									))}
								</div>
								<span className="text-sm text-gray-600">
									({data.averageRating ?? 0}) • {data.ratingCount ?? 0}{" "}
									avaliações
								</span>
							</div>
							<div className="flex items-center gap-1 mb-3">
								<MapPin className="w-4 h-4 text-gray-500" />
								<span className="text-sm text-gray-600">
									{data.address.addressLine} • {data.address.number}
								</span>
							</div>
						</div>
					</div>

					<p className="text-sm text-gray-600 mb-4 leading-relaxed">
						{data.description ?? ""}
					</p>

					<div className="flex items-center gap-2">
						<Button size="sm" className="bg-primary hover:bg-primary/90">
							Ver mais
						</Button>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
