"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
	{ id: "todos", label: "Todos", tag: "" },
	{ id: "banho", label: "Banho Completo", tag: "banho" },
	{ id: "tosa", label: "Tosa Profissional", tag: "tosa" },
	{ id: "spa", label: "Spa & Relaxamento", tag: "spa" },
	{ id: "cuidados", label: "Cuidados Especiais", tag: "cuidados" },
	{ id: "veterinario", label: "Veterinário", tag: "veterinario" },
	{ id: "emergencia", label: "Emergência 24h", tag: "emergencia" },
] as const;

export function CategoryTabs() {
	const router = useParams<{ search?: string[] }>();

	function isActive(query?: string | null) {
		if (!router.search?.length && query === "") {
			return true;
		}
		return query === router.search?.[0];
	}

	return (
		<div className="bg-background border-b border-border px-10 py-4 w-full overflow-x-auto">
			<div className="flex items-center gap-6 w-max">
				{categories.map((category) => (
					<Button
						key={category.id}
						type="button"
						variant="ghost"
						className={cn(
							`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors`,
							isActive(category.tag)
								? "bg-primary text-primary-foreground"
								: "text-muted-foreground hover:text-primary hover:bg-primary/10",
						)}
						asChild
					>
						<Link href={{ pathname: `/s/${category.tag}` }}>
							{category.label}
						</Link>
					</Button>
				))}
			</div>
		</div>
	);
}
