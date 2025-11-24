import z from "zod";

export const createPetSchema = z
	.object({
		name: z.string().min(1, "O nome é obrigatório"),
		age: z
			.number("A idade está inválida")
			.min(1, "A idade deve ser um número não negativo"),
		breed: z.object(
			{ id: z.string().min(1, "A raça é obrigatória"), name: z.string() },
			"A raça é obrigatória",
		),
		weight: z
			.number("O peso está inválido")
			.min(1, "O peso deve ser um número não negativo"),
		file: z
			.file("A imagem é obrigatória")
			.max(5 * 1024 * 1024, "A imagem tem que ser menor que 5MB"),
	})
	.transform(({ breed, ...data }) => ({ ...data, breedId: breed.id }));

export type CreatePetSchema = z.input<typeof createPetSchema>;
