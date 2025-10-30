import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Await } from "@/components/await";
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
export default async function AppointmentsListPage(
	props: PageProps<"/appointments">,
) {
	const searchParams = await pageSearchLoader(props.searchParams);
	const query = getAllAppointments(
		{ page: searchParams.page },
		{ fetchOptions: { next: { tags: ["appointments"] } } },
	);

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto max-w-6xl px-4 py-8">
				<h1 className="text-lg md:text-3xl font-bold text-foreground mb-8">
					Meus Agendamentos
				</h1>
				
			</div>
			
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
