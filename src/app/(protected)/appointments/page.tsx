import type { Metadata } from "next";
import { cacheTag } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { PaginationControl } from "@/components/pagination-control";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllAppointments } from "@/lib/http/generated/endpoints/agendamentos/agendamentos";
import { pageSearchLoader } from "@/schemas/page-search-params";
import { AppointmentCard } from "./_components/appointment-card";
import { AppointmentDetailModal } from "./_components/appointment-detail-modal";

export const metadata: Metadata = {
	title: "Agendamentos",
	description: "Agendamentos de serviços",
};
export default async function Page(props: PageProps<"/appointments">) {
	const { page } = await pageSearchLoader(props.searchParams);

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto max-w-6xl px-4 py-8">
				<h1 className="text-lg md:text-3xl font-bold text-foreground mb-8">
					Meus Agendamentos
				</h1>
				<Suspense key={page} fallback={<LoadingGrid />}>
					<Content page={page} />
				</Suspense>
			</div>
			<Suspense fallback={<div />}>
				<AppointmentDetailModal />
			</Suspense>
		</div>
	);
}

function LoadingGrid() {
	return (
		<div className="grid grid-cols-1 gap-4">
			{[1, 2, 3, 4, 5].map((k) => (
				<Skeleton key={k} className="h-24 w-full" />
			))}
		</div>
	);
}

async function Content({ page }: { page: number }) {
	"use cache: private";
	cacheTag("appointments");

	const data = await getAllAppointments({ page });

	if (!data.items.length) {
		return (
			<div className="text-center text-foreground space-y-4">
				<h3 className="text-lg font-semibold text-foreground mb-2">
					Nenhum agendamento encontrado
				</h3>
				<p className="text-muted-foreground">
					Não encontramos nenhum agendamento, mas você pode conhecer nossos
					serviços
				</p>
				<Button variant="outline" asChild>
					<Link href="/s">Conheça nossos serviços</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{data.items.map((item) => {
				return <AppointmentCard key={item.id} item={item} />;
			})}
			<PaginationControl totalPages={data.meta.totalPages} />
		</div>
	);
}
