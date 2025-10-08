"use client";

import { useForm } from "@tanstack/react-form";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import posthog from "posthog-js";
import { Suspense } from "react";
import z from "zod";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

const searchSchema = z.object({ q: z.string().trim().min(1).optional() });

export function SearchBar() {
	return (
		<Suspense fallback={<div className="flex-1" />}>
			<Content />
		</Suspense>
	);
}

function Content() {
	const router = useRouter();
	const [q] = useQueryState("q", parseAsString);

	const form = useForm({
		validators: { onChange: searchSchema },
		defaultValues: { q: q ?? "" } as z.input<typeof searchSchema>,
		onSubmit: ({ value }) => {
			router.push(`/s?q=${value.q}`);
			posthog.capture("search", { query: value.q });
		},
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
			>
				{(field) => (
					<InputGroup className="w-full rounded-full">
						<InputGroupInput
							placeholder="Buscar empresas, serviços ou palavras chaves..."
							value={field.state.value ?? ""}
							onBlur={field.handleBlur}
							name={field.name}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
						<InputGroupAddon>
							<Search />
						</InputGroupAddon>
					</InputGroup>
				)}
			</form.Field>
		</form>
	);
}
