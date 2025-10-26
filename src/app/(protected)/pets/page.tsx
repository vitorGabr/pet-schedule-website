import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Await } from "@/components/await";
import { PaginationControl } from "@/components/pagination-control";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllBreeds, listAnimalsFromUser } from "@/lib/http";
import { pageSearchLoader } from "@/schemas/page-search-params";
import { AddPetModal } from "./_components/add-pet-modal";
import { DeletePetDialog } from "./_components/delete-pet-dialog";
import { EditPetModal } from "./_components/edit-pet-modal";
import { PetCard } from "./_components/pet-card";

export default async function PetsPage(props: PageProps<"/pets">) {
	const searchParams = await pageSearchLoader(props.searchParams);
	const { isAuthenticated } = await auth();

	if (!isAuthenticated) redirect("/");
	const breeds = await getAllBreeds();
	const promise = listAnimalsFromUser(
		{ page: searchParams.page },
		{ fetchOptions: { next: { tags: ["pets"] } } },
	);

	return (
		<div className="container mx-auto max-w-6xl px-4 py-8 space-y-6 min-h-screen">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Meus Pets</h1>
				<AddPetModal breeds={breeds.items} />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Await
					promise={promise}
					key={JSON.stringify(searchParams)}
					fallback={<LoadingGrid />}
				>
					{(data) => {
						if (data.items.length === 0) {
							return (
								<div className="col-span-full text-center text-foreground space-y-4">
									<h3 className="text-lg font-semibold text-foreground mb-2">
										Nenhum pet encontrado
									</h3>
									<p className="text-muted-foreground">
										Não encontramos nenhum pet, mas você pode adicionar um novo
										pet
									</p>
								</div>
							);
						}

						return (
							<>
								{data.items.map((pet) => (
									<PetCard key={pet.id} pet={pet} />
								))}
								<div className="col-span-full">
									<PaginationControl totalPages={data.meta.totalPages} />
								</div>
							</>
						);
					}}
				</Await>
			</div>

			<DeletePetDialog />
			<EditPetModal />
		</div>
	);
}

function LoadingGrid() {
	return [1, 2, 3, 4, 5].map((k) => (
		<Skeleton key={k} className="h-24 w-full" />
	));
}
