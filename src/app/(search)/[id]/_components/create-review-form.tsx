"use client";

import { useForm } from "@tanstack/react-form";
import { AxiosError } from "axios";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z as zod } from "zod";
import { TextAreaField } from "@/components/form/fields/text-area-field";
import { FormErrorMessage } from "@/components/form/form-error-message";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { createRating, createRatingBody } from "@/lib/http";
import { cn } from "@/lib/utils";

const createRatingFormSchema = createRatingBody.extend({
	comment: zod
		.string()
		.min(10, "Escreva pelo menos 10 caracteres.")
		.max(600, "Seu comentário pode ter no máximo 600 caracteres."),
});

type CreateReviewFormProps = {
	companyId: string;
	companyName?: string;
	className?: string;
	initialRating?: number;
};

const ratingLabels: Record<number, string> = {
	1: "Péssimo",
	2: "Ruim",
	3: "Regular",
	4: "Bom",
	5: "Excelente",
};


export function CreateReviewForm({
	companyId,
	companyName,
	className,
	initialRating = 5,
}: CreateReviewFormProps) {
	const router = useRouter();
	const form = useForm({
		defaultValues: { companyId, rating: initialRating, comment: "" },
		validators: { onChange: createRatingFormSchema },
		onSubmit: async ({ value }) => {
			try {
				await createRating(createRatingFormSchema.parse(value));
				toast.success("Avaliação enviada com sucesso!");
				form.reset();
				router.refresh();
			} catch (error) {
				if (error instanceof AxiosError) {
					toast.error(
						error.response?.data?.message ??
							"Não foi possível enviar sua avaliação. Tente novamente.",
					);
				} else {
					toast.error("Ocorreu um erro inesperado ao enviar sua avaliação.");
				}
			}
		},
	});

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Deixe sua avaliação</CardTitle>
				<CardDescription>
					{companyName
						? `Compartilhe como foi a sua experiência com ${companyName}.`
						: "Compartilhe como foi a sua experiência."}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						event.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-6"
				>
					<form.Field name="rating">
						{(field) => (
							<Field data-invalid={!field.state.meta?.isValid}>
								<FieldLabel className="text-sm font-medium">
									Como você avalia esta empresa?
								</FieldLabel>
								<FieldContent>
									<div className="flex items-center gap-2">
										{Array.from({ length: 5 }, (_, index) => {
											const value = index + 1;
											const isActive = value <= (field.state.value ?? 0);
											return (
												<Button
													key={value}
													type="button"
													variant="ghost"
													size="icon"
													aria-pressed={isActive}
													aria-label={`${value} ${value === 1 ? "estrela" : "estrelas"}`}
													onClick={() => field.handleChange(value)}
													onBlur={field.handleBlur}
													className={cn(
														"border border-transparent rounded-full transition-colors",
														isActive
															? "bg-amber-100 border-amber-300 text-amber-500 dark:bg-amber-900/40 dark:border-amber-700"
															: "hover:bg-amber-50 text-muted-foreground",
													)}
												>
													<Star
														className={cn(
															"size-5",
															isActive ? "fill-current" : "stroke-current",
														)}
													/>
												</Button>
											);
										})}
									</div>
									<FieldDescription className="flex items-center gap-2 text-xs text-muted-foreground">
										<span>
											{field.state.value
												? `${field.state.value} ${field.state.value > 1 ? "estrelas" : "estrela"} • ${ratingLabels[field.state.value]}`
												: "Selecione uma nota de 1 a 5."}
										</span>
									</FieldDescription>
								</FieldContent>
								<FieldDescription className="text-xs text-muted-foreground">
									Avaliações ajudam outros tutores a escolherem melhor.
								</FieldDescription>
								<FormErrorMessage meta={field.state.meta} />
							</Field>
						)}
					</form.Field>

					<form.Field name="comment">
						{(field) => (
							<TextAreaField
								label="Conte como foi sua experiência"
								placeholder="Descreva os pontos positivos, o atendimento e o que pode melhorar."
								name={field.name}
								onBlur={field.handleBlur}
								onChange={(event) => field.handleChange(event.target.value)}
								value={field.state.value}
								meta={field.state.meta}
								className="min-h-[140px]"
							/>
						)}
					</form.Field>

					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<Button
								type="submit"
								disabled={!canSubmit || isSubmitting}
								className="w-full"
							>
								{isSubmitting ? (
									<span className="inline-flex items-center gap-2">
										<Spinner className="size-4" />
										Enviando avaliação...
									</span>
								) : (
									"Enviar avaliação"
								)}
							</Button>
						)}
					</form.Subscribe>
				</form>
			</CardContent>
		</Card>
	);
}
