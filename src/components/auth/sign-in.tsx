"use client";

import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { parseAsStringLiteral as parseLiteral, useQueryState } from "nuqs";
import { TextField } from "@/components/form/fields/text-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useMakeSignIn } from "@/hooks/use-make-signin";
import type { SignInRequestDto } from "@/lib/http";
import { signInBody } from "@/lib/http";

export function SignInModal() {
	const [authMode, setAuthMode] = useQueryState(
		"auth",
		parseLiteral(["signin", "signup"]),
	);
	const { execute } = useMakeSignIn({ onSuccess: () => setAuthMode(null) });

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			type: "customer",
		} as SignInRequestDto,
		onSubmit: async ({ value }) => execute(value),
		validators: { onChange: signInBody },
	});

	return (
		<Dialog open={authMode === "signin"} onOpenChange={() => setAuthMode(null)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">
						Olá, seja bem-vindo!
					</DialogTitle>
					<DialogDescription className="text-sm text-gray-500">
						Faça login para acessar sua conta
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
					<div className="space-y-0.5">
						<form.Field name="email">
							{(field) => (
								<TextField
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(value) => field.handleChange(value.target.value)}
									value={field.state.value}
									meta={field.state.meta}
									type="email"
									placeholder="Email ou usuário"
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
									placeholder="Senha"
									className="py-6"
								/>
							)}
						</form.Field>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<Checkbox id="remember" />
							<label
								htmlFor="remember"
								className="text-sm text-foreground cursor-pointer"
							>
								Manter conectado
							</label>
						</div>
						<Link
							href="#"
							className="text-sm text-primary hover:text-primary/80 transition-colors"
						>
							Esqueceu a senha?
						</Link>
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
								{isSubmitting ? (
									<Loader2 className="w-5 h-5 animate-spin" />
								) : (
									"Login"
								)}
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

				{/* Link para signup */}
				<div className="text-center text-sm text-muted-foreground">
					Não tem uma conta?{" "}
					<button
						type="button"
						onClick={() => setAuthMode("signup")}
						className="text-primary hover:text-primary/80 transition-colors font-medium"
					>
						Criar conta
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
