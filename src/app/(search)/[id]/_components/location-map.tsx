import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyByIdResponseDtoOutputAddress } from "@/lib/http/generated/models";

type Props = { address: CompanyByIdResponseDtoOutputAddress };

export function LocationMap({ address }: Props) {
	const { latitude, longitude } = address;
	return (
		<Card>
			<CardHeader>
				<CardTitle>Localização</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="aspect-video rounded-lg overflow-hidden bg-muted">
					<iframe
						title="asd"
						src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
						width="100%"
						height="100%"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				</div>
				<div className="mt-4 p-3 bg-muted rounded-lg">
					<div className="flex items-center gap-2 text-sm">
						<MapPin className="w-4 h-4 text-primary" />
						<span>
							{address.neighborhood}, {address.number}, {address.city},{" "}
							{address.state}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
