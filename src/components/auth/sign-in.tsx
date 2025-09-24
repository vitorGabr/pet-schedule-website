"use client";

import type { SignInRequestDto } from "@/lib/http";
import { signInBody } from "@/lib/http";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { parseAsStringLiteral as parseLiteral, useQueryState } from "nuqs";
import { TextField } from "@/components/form/fields/text-field";
import { useMakeSignIn } from "@/hooks/use-make-signin";

export function SignInModal() {
	const [authMode, setAuthMode] = useQueryState("auth", parseLiteral(["signin", "signup"]));
	const { execute } = useMakeSignIn({ onSuccess: () => setAuthMode(null) });

	const form = useForm({
		defaultValues: { email: "", password: "", type: "customer" } as SignInRequestDto,
		onSubmit: async ({ value }) => execute(value),
		validators: { onChange: signInBody },
	});

	return (
		<Dialog open={authMode === "signin"} onOpenChange={() => setAuthMode(null)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">Olá, seja bem-vindo!</DialogTitle>
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
						<form.Field
							name="email"
							children={(field) => (
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
						/>

						<form.Field
							name="password"
							children={(field) => (
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
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<Checkbox id="remember" />
							<label htmlFor="remember" className="text-sm text-foreground cursor-pointer">
								Manter conectado
							</label>
						</div>
						<Link href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
							Esqueceu a senha?
						</Link>
					</div>

					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<Button
								type="submit"
								className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
								disabled={!canSubmit || isSubmitting}
							>
								{isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
							</Button>
						)}
					/>
				</form>

				{/* Divider */}
				<div className="relative mt-6 mb-1">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-border"></div>
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-2 bg-card text-muted-foreground">Ou continue com</span>
					</div>
				</div>

				{/* Social Login */}
				<div className="grid grid-cols-2 gap-3">
					<Button variant="outline" className="h-12 border-border hover:bg-accent/50">
						<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-label="Google logo">
							<title>Google</title>
							<path
								fill="#4285F4"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="#34A853"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="#FBBC05"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								fill="#EA4335"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
						</svg>
						Google
					</Button>
					<Button variant="outline" className="h-12 border-border hover:bg-accent/50">
						<svg
							className="w-5 h-5 mr-2"
							viewBox="0 0 24 24"
							fill="#1877F2"
							aria-label="Facebook logo"
						>
							<title>Facebook</title>
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
						</svg>
						Facebook
					</Button>
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
