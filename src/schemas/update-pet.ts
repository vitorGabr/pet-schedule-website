import z from "zod";

export const updatePetSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	age: z.number().min(0, "A idade deve ser um número não negativo"),
	weight: z.number().min(0, "O peso deve ser um número não negativo"),
});

export type UpdatePetSchema = z.infer<typeof updatePetSchema>;
