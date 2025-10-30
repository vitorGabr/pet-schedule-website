import z from "zod";

export const createRatingFormSchema = z.object({
	companyId: z.string(),
	rating: z.number().min(1).max(5),
	comment: z
		.string()
		.min(10, "Escreva pelo menos 10 caracteres.")
		.max(600, "Seu comentário pode ter no máximo 600 caracteres.")
		.optional(),
});

export type CreateRatingFormData = z.infer<typeof createRatingFormSchema>;
