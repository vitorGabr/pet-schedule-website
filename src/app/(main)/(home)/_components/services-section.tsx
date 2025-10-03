import { Heart, Scissors, Sparkles } from "lucide-react";

const services = [
	{
		icon: Sparkles,
		title: "Banho Completo",
		description: "Banho relaxante com produtos premium, secagem e perfumação",
		iconBg: "bg-purple-100",
		iconColor: "text-purple-600",
	},
	{
		icon: Scissors,
		title: "Tosa Profissional",
		description:
			"Cortes estilizados e tosa higiênica com técnicas especializadas",
		iconBg: "bg-pink-100",
		iconColor: "text-pink-600",
	},
	{
		icon: Heart,
		title: "Spa Relaxante",
		description:
			"Tratamentos especiais para o bem-estar e relaxamento do seu pet",
		iconBg: "bg-purple-100",
		iconColor: "text-purple-600",
	},
];

export function ServicesSection() {
	return (
		<section className="py-8 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Nossos Serviços
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Oferecemos cuidados completos para o bem-estar e beleza do seu pet
					</p>
				</div>

				{/* Services Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{services.map((service) => {
						const IconComponent = service.icon;
						return (
							<div
								key={service.title}
								className="bg-white rounded-xl border p-8 text-center"
							>
								{/* Icon */}
								<div
									className={`w-16 h-16 ${service.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}
								>
									<IconComponent className={`w-8 h-8 ${service.iconColor}`} />
								</div>

								{/* Title */}
								<h3 className="text-xl font-bold text-gray-900 mb-4">
									{service.title}
								</h3>

								{/* Description */}
								<p className="text-gray-600 leading-relaxed">
									{service.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
