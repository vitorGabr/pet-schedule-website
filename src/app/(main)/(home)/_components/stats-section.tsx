import { Clock, Heart, MapPin, Users } from "lucide-react";

const stats = [
	{
		icon: Heart,
		number: "2.500+",
		label: "Pets Atendidos",
		description: "Pets felizes e bem cuidados",
		iconBg: "bg-pink-100",
		iconColor: "text-pink-600",
	},
	{
		icon: Users,
		number: "150+",
		label: "Profissionais Parceiros",
		description: "Especialistas certificados",
		iconBg: "bg-blue-100",
		iconColor: "text-blue-600",
	},
	{
		icon: MapPin,
		number: "50+",
		label: "Cidades Atendidas",
		description: "Cobertura em todo o país",
		iconBg: "bg-green-100",
		iconColor: "text-green-600",
	},
	{
		icon: Clock,
		number: "24/7",
		label: "Suporte Disponível",
		description: "Agendamento online sempre",
		iconBg: "bg-purple-100",
		iconColor: "text-purple-600",
	},
];

export function StatsSection() {
	return (
		<section className="py-16 px-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">Números que Falam por Si</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						A confiança de milhares de tutores e profissionais que fazem da nossa plataforma a
						escolha número 1 para cuidados pet
					</p>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{stats.map((stat) => {
						const IconComponent = stat.icon;
						return (
							<div key={stat.label} className="text-center">
								{/* Icon */}
								<div
									className={`w-16 h-16 ${stat.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
								>
									<IconComponent className={`w-8 h-8 ${stat.iconColor}`} />
								</div>

								{/* Number */}
								<div className="mb-2">
									<span className="text-3xl md:text-4xl font-bold text-gray-900 block">
										{stat.number}
									</span>
								</div>

								{/* Label */}
								<h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</h3>

								{/* Description */}
								<p className="text-sm text-gray-600">{stat.description}</p>
							</div>
						);
					})}
				</div>

				{/* Bottom CTA */}
				<div className="text-center mt-12">
					<div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-lg border border-primary/20">
						<div className="flex items-center gap-1">
							{[1, 2, 3, 4, 5].map((star) => (
								<div
									key={`bottom-star-${star}`}
									className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center"
								>
									<span className="text-white text-xs">★</span>
								</div>
							))}
						</div>
						<div className="text-left">
							<p className="text-sm font-semibold text-gray-900">Avaliação Média: 4.9/5.0</p>
							<p className="text-xs text-gray-600">Baseado em mais de 2.500 avaliações</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
