import { signUpBody } from "@/lib/http";
import { z } from "zod";

export const signUpWithConfirmPasswordSchema = signUpBody
	.extend({
		name: z.string().min(3, "Nome é obrigatório"),
		confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem",
		path: ["confirmPassword"],
	});

export type SignUpWithConfirmPasswordFormData = z.infer<typeof signUpWithConfirmPasswordSchema>;
