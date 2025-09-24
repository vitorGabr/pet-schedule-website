"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NuqsAdapter } from "nuqs/adapters/next";
import { useState } from "react";
import { z } from "zod";

z.config(z.locales.pt());
setDefaultOptions({ locale: ptBR });

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
			}),
	);

	return (
		<NuqsAdapter>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</NuqsAdapter>
	);
}
