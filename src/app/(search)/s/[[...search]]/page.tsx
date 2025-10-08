import type { Metadata } from "next";
import { Await } from "@/components/await";
import { PaginationControl } from "@/components/pagination-control";
import { POPULAR_SEARCHES } from "@/constants/popular-searches";
import { searchCompanies } from "@/lib/http";
import { pageSearchLoader } from "@/schemas/page-search-params";
import { CompanyCard } from "../../../../components/company-card";
import { CompanyCardSkeletonGrid } from "./_components/company-card-skeleton";
import { NoResultsCompanies } from "./_components/no-results-companies";

export const dynamicParams = true;
export async function generateStaticParams() {
	const popular = POPULAR_SEARCHES;
	return popular.map(({ search }) => ({ search: search }));
}

export const metadata: Metadata = {
	title: "Buscar",
	description: "Buscar empresas para seu pet",
};

export const revalidate = 3600;

export default async function SearchPage(props: PageProps<"/s/[[...search]]">) {
	const { search } = await props.params;
	const searchParams = await pageSearchLoader(props.searchParams);
	const promise = searchCompanies({
		search: `${searchParams.q ?? ""}`.trim(),
		categories: search,
		page: searchParams.page,
	});

	return (
		<div className="bg-muted/50 px-5 md:px-10 py-4 md:py-8">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-foreground mb-2">
					Encontre a melhor empresa para seu pet
				</h2>
			</div>
			<Await
				key={JSON.stringify(searchParams)}
				fallback={<CompanyCardSkeletonGrid count={6} />}
				promise={promise}
			>
				{(data) => (
					<div>
						{data.items.length === 0 ? (
							<NoResultsCompanies />
						) : (
							<div>
								<div className="mb-6 text-sm text-muted-foreground">
									{data.meta.total > 0 && (
										<p>
											Mostrando {data.items.length} de {data.meta.total}{" "}
											empresas
										</p>
									)}
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
									{data.items?.map((company) => (
										<CompanyCard key={company.id} data={company} />
									))}
								</div>

								<PaginationControl totalPages={data.meta.totalPages} />
							</div>
						)}
					</div>
				)}
			</Await>
		</div>
	);
}
