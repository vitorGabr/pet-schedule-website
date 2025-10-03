import { Clock, Shield, Star, Users } from "lucide-react";
import Image from "next/image";

const benefits = [
	{
		icon: Shield,
		title: "Ambiente Seguro e Limpo",
		description:
			"Instalações higienizadas e seguras com protocolos rigorosos de limpeza para garantir a saúde do seu pet.",
	},
	{
		icon: Users,
		title: "Profissionais Experientes",
		description:
			"Equipe qualificada e apaixonada por animais, com anos de experiência em cuidados pet.",
	},
	{
		icon: Clock,
		title: "Agendamento Flexível",
		description:
			"Sistema de agendamento online 24/7 com horários que se adaptam à sua rotina.",
	},
];

export function WhyChooseUsSection() {
	return (
		<section className="py-16 px-4 bg-white">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Conteúdo textual */}
					<div className="space-y-8">
						<h2 className="text-4xl font-bold text-gray-900 leading-tight">
							Por que Escolher a PetSpa?
						</h2>

						<div className="space-y-6">
							{benefits.map((benefit) => {
								const IconComponent = benefit.icon;
								return (
									<div
										key={benefit.title}
										className="flex items-start space-x-4"
									>
										<div className="flex-shrink-0">
											<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
												<IconComponent className="w-6 h-6 text-primary" />
											</div>
										</div>
										<div className="flex-1">
											<h3 className="text-xl font-semibold text-gray-900 mb-2">
												{benefit.title}
											</h3>
											<p className="text-gray-600 leading-relaxed">
												{benefit.description}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Imagem */}
					<div className="relative">
						<div className="relative rounded-2xl overflow-hidden shadow-2xl">
							<Image
								src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
								alt="Profissional cuidando de um pet em ambiente moderno e limpo"
								width={1000}
								height={500}
								className="w-full h-[500px] object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
						</div>

						{/* Badge de avaliação */}
						<div className="absolute bottom-6 right-6 bg-white rounded-2xl px-4 py-3 shadow-lg">
							<div className="flex items-center space-x-2">
								<div className="flex space-x-1">
									<div className="w-3 h-3 bg-primary rounded-full"></div>
									<div className="w-3 h-3 bg-primary/80 rounded-full"></div>
									<div className="w-3 h-3 bg-primary/60 rounded-full"></div>
								</div>
								<div className="flex items-center space-x-1 ml-2">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={`badge-star-${star}`}
											className="w-4 h-4 fill-yellow-400 text-yellow-400"
										/>
									))}
								</div>
							</div>
							<p className="text-sm font-medium text-gray-700 mt-1">
								500+ pets felizes
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
