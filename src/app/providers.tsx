"use client";

import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next";
import { useState } from "react";
import { z } from "zod";

z.config(z.locales.pt());

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: { retry: false, refetchOnWindowFocus: false },
				},
			}),
	);

	return (
		<ClerkProvider
			localization={ptBR}
			appearance={{
				variables: {
					colorPrimary: "var(--primary)",
					colorForeground: "var(--foreground)",
					colorBackground: "var(--background)",
				},
				elements: {
					formButtonPrimary: "bg-slate-500 hover:bg-slate-400 text-sm",
				},
			}}
		>
			<NuqsAdapter>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</NuqsAdapter>
		</ClerkProvider>
	);
}