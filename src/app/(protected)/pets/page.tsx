import { PaginationControl } from "@/components/pagination-control";
import { Skeleton } from "@/components/ui/skeleton";
import { listAnimalsFromUser } from "@/lib/http/generated/endpoints/animais/animais";
import { getAllBreeds } from "@/lib/http/generated/endpoints/raças/raças";
import { pageSearchLoader } from "@/schemas/page-search-params";
import { AddPetModal } from "./_components/add-pet-modal";
import { DeletePetDialog } from "./_components/delete-pet-dialog";
import { EditPetModal } from "./_components/edit-pet-modal";
import { PetCard } from "./_components/pet-card";
import { cacheTag } from "next/cache";
import { Suspense } from "react";

export default async function PetsPage(props: PageProps<"/pets">) {
  const { page } = await pageSearchLoader(props.searchParams);
  const breeds = await getAllBreeds();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 space-y-6 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Meus Pets</h1>
        <AddPetModal breeds={breeds.items} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense key={page} fallback={<LoadingGrid />}>
          <Content page={page} />
        </Suspense>
      </div>

      <DeletePetDialog />
      <EditPetModal />
    </div>
  );
}

function LoadingGrid() {
  return new Array(5).map((k) => <Skeleton key={k} className="h-24 w-full" />);
}

async function Content({ page }: { page: number }) {
  "use cache: private";
  cacheTag("pets");

  const { items, meta } = await listAnimalsFromUser({ page });

  if (!items.length) {
    return (
      <div className="col-span-full text-center text-foreground space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Nenhum pet encontrado
        </h3>
        <p className="text-muted-foreground">
          Não encontramos nenhum pet, mas você pode adicionar um novo pet
        </p>
      </div>
    );
  }

  return (
    <>
      {items.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
      <div className="col-span-full">
        <PaginationControl totalPages={meta.totalPages} />
      </div>
    </>
  );
}
