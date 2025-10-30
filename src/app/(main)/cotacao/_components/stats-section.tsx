import { Building2, TrendingUp, Users, Zap } from "lucide-react";

const stats = [
	{
		icon: Building2,
		number: "150+",
		label: "Empresas Parceiras",
		description: "Conectadas à nossa plataforma",
		iconBg: "bg-blue-100",
		iconColor: "text-blue-600",
	},
	{
		icon: TrendingUp,
		number: "40%",
		label: "Aumento Médio",
		description: "No faturamento dos parceiros",
		iconBg: "bg-green-100",
		iconColor: "text-green-600",
	},
	{
		icon: Users,
		number: "2.500+",
		label: "Clientes Ativos",
		description: "Procurando serviços mensalmente",
		iconBg: "bg-purple-100",
		iconColor: "text-purple-600",
	},
	{
		icon: Zap,
		number: "24h",
		label: "Tempo de Resposta",
		description: "Para novas oportunidades",
		iconBg: "bg-orange-100",
		iconColor: "text-orange-600",
	},
];

export function StatsSection() {
	return (
		<section className="py-16 px-4 bg-linear-to-r from-primary/5 via-primary/10 to-primary/5">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Resultados que Comprovam nossa Eficiência
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Números reais de empresas que transformaram seus negócios com nossa
						plataforma
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
								<h3 className="text-lg font-semibold text-gray-900 mb-1">
									{stat.label}
								</h3>

								{/* Description */}
								<p className="text-sm text-gray-600">{stat.description}</p>
							</div>
						);
					})}
				</div>

				{/* Success Stories */}
				<div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="bg-white rounded-2xl p-6 shadow-lg border border-primary/20">
						<div className="flex items-center gap-4 mb-4">
							<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
								<TrendingUp className="w-6 h-6 text-green-600" />
							</div>
							<div>
								<h4 className="font-semibold text-gray-900">Pet Care Plus</h4>
								<p className="text-sm text-gray-600">
									Clínica Veterinária - São Paulo
								</p>
							</div>
						</div>
						<p className="text-gray-700 italic">
							"Em 3 meses nossa agenda ficou 60% mais cheia. O sistema de
							agendamento automatizado revolucionou nosso atendimento!"
						</p>
					</div>

					<div className="bg-white rounded-2xl p-6 shadow-lg border border-primary/20">
						<div className="flex items-center gap-4 mb-4">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
								<Building2 className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<h4 className="font-semibold text-gray-900">Tosa & Cia</h4>
								<p className="text-sm text-gray-600">
									Pet Shop - Rio de Janeiro
								</p>
							</div>
						</div>
						<p className="text-gray-700 italic">
							"Dobramos nosso faturamento em 6 meses. A visibilidade que
							ganhamos trouxe clientes que nem imaginávamos alcançar."
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
