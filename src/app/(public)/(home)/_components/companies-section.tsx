import { cacheLife } from "next/cache";
import { CompanyCard } from "@/components/company-card";
import { searchCompanies } from "@/lib/http-public";

export async function CompaniesSection() {
	"use cache";
	cacheLife("days");

	const companies = await searchCompanies();

	return (
		<section className="flex flex-col gap-4 px-4 max-w-7xl mx-auto mt-6">
			<h2 className="text-[#0e1a13] text-3xl font-bold leading-tight tracking-[-0.015em]">
				Empresas recomendadas
			</h2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{companies.items?.map((company) => (
					<CompanyCard key={company.id} data={company} />
				))}
			</div>
		</section>
	);
}
