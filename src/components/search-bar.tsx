"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import z from "zod";

const searchSchema = z.object({ q: z.string().trim().min(1).optional() });

export function SearchBar() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const form = useForm({
		validators: { onChange: searchSchema },
		defaultValues: { q: searchParams.get("q") ?? "" } as z.input<typeof searchSchema>,
		onSubmit: ({ value }) => router.push(`/s?q=${value.q}`),
	});

	return (
		<form
			className="flex-1 mx-8 py-3 max-w-2xl"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<form.Field
				name="q"
				listeners={{ onChangeDebounceMs: 500, onChange: form.handleSubmit }}
				children={(field) => (
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							placeholder="Buscar empresas, serviços ou palavras chaves..."
							className="pl-10 pr-4 py-2 w-full rounded-full"
							value={field.state.value ?? ""}
							onBlur={field.handleBlur}
							name={field.name}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			/>
		</form>
	);
}
