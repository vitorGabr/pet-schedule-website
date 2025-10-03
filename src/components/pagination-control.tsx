"use client";

import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination";
import { pageSearchParamsSchema } from "@/schemas/page-search-params";

type PaginationProps = { totalPages: number };

export function PaginationControl({ totalPages }: PaginationProps) {
	const [currentPage, setCurrentPage] = useQueryState(
		"page",
		pageSearchParamsSchema.page.withOptions({ shallow: false }),
	);

	return (
		<div className="flex items-center justify-between gap-3">
			<p className="text-muted-foreground grow text-sm" aria-live="polite">
				Página <span className="text-foreground">{currentPage}</span> de{" "}
				<span className="text-foreground">{totalPages}</span>
			</p>
			<Pagination className="w-auto">
				<PaginationContent className="gap-3">
					<PaginationItem>
						<Button
							variant="outline"
							className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
							aria-disabled={currentPage === 1 ? true : undefined}
							role={currentPage === 1 ? "link" : undefined}
							onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
						>
							Anterior
						</Button>
					</PaginationItem>
					<PaginationItem>
						<Button
							variant="outline"
							className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
							aria-disabled={currentPage === totalPages ? true : undefined}
							role={currentPage === totalPages ? "link" : undefined}
							onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
						>
							Próximo
						</Button>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
