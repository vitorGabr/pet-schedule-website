import { Building2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export function NoResultsCompanies() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon" className="bg-background">
					<Building2Icon />
				</EmptyMedia>
				<EmptyTitle>Nenhuma empresa encontrada</EmptyTitle>
				<EmptyDescription>
					Não encontramos empresas para a busca, tente ajustar os filtros de
					busca.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<div className="flex gap-2">
					<Button asChild>
						<Link href="/s">Ver todas as empresas</Link>
					</Button>
				</div>
			</EmptyContent>
		</Empty>
	);
}
