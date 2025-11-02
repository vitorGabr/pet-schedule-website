"use client";

import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TextField } from "@/components/form/fields/text-field";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useMakeSign } from "@/hooks/use-make-sign";
import { useOAuthSign } from "@/hooks/use-oauth-sign";
import GoogleIcon from "@/images/icons/google.svg";
import { SignUpFormData, signUpSchema } from "@/schemas/sign-up";
import { Spinner } from "./ui/spinner";

const defaultValues = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
} as SignUpFormData;
export function SignUpModal() {
	const [mounted, setMounted] = useState(false);
	const { onSignUp, authMode, handleAuthMode } = useMakeSign();
	const { signInWithGoogle } = useOAuthSign();

	const form = useForm({
		defaultValues,
		onSubmit: async ({ value }) => onSignUp(value),
		validators: { onChange: signUpSchema },
	});

	useEffect(() => setMounted(true), []);
	if (!mounted) return null;

	return (
		<Dialog
			open={authMode === "signup"}
			onOpenChange={() => handleAuthMode(null)}
		>
			<DialogContent className="max-h-[90vh] overflow-y-scroll">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">Criar conta</DialogTitle>
					<DialogDescription className="text-sm text-gray-500">
						Preencha os dados abaixo para criar sua conta
					</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-6"
				>
					<div className="space-y-4">
						<form.Field name="name">
							{(field) => (
								<TextField
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(value) => field.handleChange(value.target.value)}
									value={field.state.value}
									meta={field.state.meta}
									type="text"
									placeholder="Nome completo"
									className="py-6"
								/>
							)}
						</form.Field>

						<form.Field name="email">
							{(field) => (
								<TextField
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(value) => field.handleChange(value.target.value)}
									value={field.state.value}
									meta={field.state.meta}
									type="email"
									placeholder="Email"
									className="py-6"
								/>
							)}
						</form.Field>

						<form.Field name="password">
							{(field) => (
								<TextField
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(value) => field.handleChange(value.target.value)}
									value={field.state.value}
									meta={field.state.meta}
									type="password"
									placeholder="Senha (mínimo 5 caracteres)"
									className="py-6"
								/>
							)}
						</form.Field>
						<form.Field name="confirmPassword">
							{(field) => (
								<TextField
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(value) => field.handleChange(value.target.value)}
									value={field.state.value}
									meta={field.state.meta}
									type="password"
									placeholder="Confirmar senha"
									className="py-6"
								/>
							)}
						</form.Field>
					</div>

					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<Button
								type="submit"
								className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
								disabled={!canSubmit || isSubmitting}
							>
								{isSubmitting ? <Spinner /> : "Criar conta"}
							</Button>
						)}
					</form.Subscribe>
				</form>

				{/* Divider */}
				<div className="relative mt-6 mb-1">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-border"></div>
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-2 bg-card text-muted-foreground">
							Ou continue com
						</span>
					</div>
				</div>

				{/* Social Login */}
				<div className="grid grid-cols-1 gap-3">
					<Button
						variant="outline"
						className="h-12 border-border hover:bg-accent/50"
						onClick={signInWithGoogle}
					>
						<Image src={GoogleIcon} alt="Google" className="w-5 h-5" />
						Google
					</Button>
				</div>

				{/* Link para login */}
				<div className="text-center text-sm text-muted-foreground">
					Já tem uma conta?{" "}
					<button
						type="button"
						onClick={() => handleAuthMode("signin")}
						className="text-primary hover:text-primary/80 transition-colors font-medium"
					>
						Faça login
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
