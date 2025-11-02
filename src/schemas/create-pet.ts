import z from "zod";

export const createPetSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	age: z.number().min(0, "A idade deve ser um número não negativo"),
	breedId: z.string().min(1, "A raça é obrigatória"),
	weight: z.number().min(0, "O peso deve ser um número não negativo"),
	file: z
		.file("A imagem é obrigatória")
		.max(5 * 1024 * 1024, "A imagem tem que ser menor que 5MB"),
});

export type CreatePetSchema = z.infer<typeof createPetSchema>;
