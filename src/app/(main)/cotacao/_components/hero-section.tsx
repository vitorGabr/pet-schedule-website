"use client";

import { Button } from "@/components/ui/button";
import { Building2, CheckCircle, TrendingUp } from "lucide-react";

export function HeroSection() {
	const handleScrollToForm = () => {
		const formSection = document.getElementById("quote-form");
		if (formSection) {
			formSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleScrollToForm();
		}
	};

	return (
		<section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-20 left-20">
					<Building2 className="w-24 h-24 text-primary" />
				</div>
				<div className="absolute bottom-20 right-20">
					<TrendingUp className="w-16 h-16 text-primary" />
				</div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<CheckCircle className="w-32 h-32 text-primary" />
				</div>
			</div>

			<div className="relative max-w-7xl mx-auto">
				<div className="text-center max-w-4xl mx-auto">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
						<Building2 className="w-4 h-4" />
						Para Empresas e Profissionais
					</div>

					{/* Título Principal */}
					<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
						Faça Parte da Maior Plataforma de{" "}
						<span className="text-primary">Serviços Pet</span> do Brasil
					</h1>

					{/* Subtítulo */}
					<p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
						Conecte-se com milhares de tutores que procuram os melhores cuidados para seus pets.
						Aumente sua visibilidade, otimize seus agendamentos e faça seu negócio crescer conosco.
					</p>

					{/* Benefícios Rápidos */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
						{[
							"Agendamentos 24/7",
							"Gestão Simplificada",
							"Mais Clientes"
						].map((benefit) => (
							<div key={benefit} className="flex items-center justify-center gap-2 text-gray-700">
								<div className="w-2 h-2 bg-primary rounded-full" />
								<span className="font-medium">{benefit}</span>
							</div>
						))}
					</div>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Button 
							onClick={handleScrollToForm}
							onKeyDown={handleKeyDown}
							className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-semibold text-lg rounded-lg transition-all transform hover:scale-105"
							tabIndex={0}
							aria-label="Solicitar cotação personalizada"
						>
							Solicitar Cotação Gratuita
						</Button>
					</div>

					{/* Trust Indicators */}
					<div className="mt-12 pt-8 border-t border-gray-200">
						<p className="text-sm text-gray-500 mb-4">Empresas que já confiam em nossa plataforma:</p>
						<div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400">
							<span>🏥 Clínicas Veterinárias</span>
							<span>✂️ Pet Shops</span>
							<span>🏠 Hospedagens</span>
							<span>🚶‍♂️ Dog Walkers</span>
							<span>🛁 Banho e Tosa</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
