import { z } from "zod";

export const signUpSchema = z
	.object({
		name: z.string().min(3, "Nome é obrigatório"),
		email: z.email("Email inválido"),
		password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
		confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
	}).refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem",
		path: ["confirmPassword"],
	});

export type SignUpFormData = z.infer<typeof signUpSchema>;
