"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return;

		setIsSubmitted(true);
		setEmail("");

		setTimeout(() => setIsSubmitted(false), 3000);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSubmit(e as any);
		}
	};

	return (
		<section className="py-16 px-4 bg-linear-to-br from-primary/5 to-primary/10">
			<div className="max-w-7xl mx-auto">
				<Card className="relative overflow-hidden border-none bg-white">
					<div className="relative p-8 md:p-12 lg:p-16">
						<div className="text-center max-w-3xl mx-auto">
							{/* Icon */}
							<div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
								<Mail className="w-8 h-8 text-primary" />
							</div>

							{/* Título */}
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								Dicas de Cuidados para seu Pet
							</h2>

							{/* Descrição */}
							<p className="text-lg text-gray-600 mb-8 leading-relaxed">
								Receba semanalmente dicas exclusivas de profissionais
								veterinários, informações sobre cuidados especiais e ofertas
								especiais dos nossos parceiros. Tudo para manter seu pet sempre
								saudável e feliz! 🐾
							</p>

							{/* Benefícios */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
								<div className="flex items-center justify-center gap-2 text-sm text-gray-600">
									<div className="w-2 h-2 bg-primary rounded-full" />
									<span>Dicas veterinárias semanais</span>
								</div>
								<div className="flex items-center justify-center gap-2 text-sm text-gray-600">
									<div className="w-2 h-2 bg-primary rounded-full" />
									<span>Ofertas exclusivas</span>
								</div>
								<div className="flex items-center justify-center gap-2 text-sm text-gray-600">
									<div className="w-2 h-2 bg-primary rounded-full" />
									<span>Conteúdo gratuito</span>
								</div>
							</div>

							{/* Formulário */}
							{!isSubmitted ? (
								<form
									onSubmit={handleSubmit}
									className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
								>
									<Input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										onKeyDown={handleKeyDown}
										placeholder="Digite seu melhor e-mail"
										className="flex-1 h-12 px-4 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
										required
										aria-label="Digite seu e-mail para receber nossa newsletter"
									/>
									<Button
										type="submit"
										className="h-12 px-6 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
										tabIndex={0}
									>
										Quero Receber! 🎯
									</Button>
								</form>
							) : (
								<div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
									<div className="flex items-center justify-center gap-2 text-green-700">
										<div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
											<span className="text-white text-xs">✓</span>
										</div>
										<span className="font-medium">
											Obrigado! Você receberá nossas dicas em breve! 🐕❤️
										</span>
									</div>
								</div>
							)}

							{/* Nota de privacidade */}
							<p className="text-xs text-gray-500 mt-4">
								Não se preocupe, respeitamos sua privacidade. Você pode cancelar
								a inscrição a qualquer momento.
							</p>
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
