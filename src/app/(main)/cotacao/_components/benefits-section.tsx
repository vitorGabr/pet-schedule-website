import {
	BarChart3,
	Calendar,
	Clock,
	MapPin,
	Shield,
	Smartphone,
	Star,
	TrendingUp,
	Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
	{
		icon: Calendar,
		title: "Agendamentos Mais Rápidos",
		description:
			"Sistema automatizado de agendamentos 24/7. Seus clientes podem agendar serviços a qualquer hora, aumentando suas vendas.",
		iconBg: "bg-blue-100",
		iconColor: "text-blue-600",
	},
	{
		icon: Users,
		title: "Mais Clientes Qualificados",
		description:
			"Conecte-se com milhares de tutores ativos na plataforma que procuram exatamente os serviços que você oferece.",
		iconBg: "bg-green-100",
		iconColor: "text-green-600",
	},
	{
		icon: MapPin,
		title: "Visibilidade Local",
		description:
			"Apareça nas buscas locais quando clientes procuram serviços pet na sua região. Destaque-se da concorrência.",
		iconBg: "bg-purple-100",
		iconColor: "text-purple-600",
	},
	{
		icon: TrendingUp,
		title: "Aumento de Faturamento",
		description:
			"Empresas parceiras relatam aumento médio de 40% no faturamento após 3 meses na plataforma.",
		iconBg: "bg-orange-100",
		iconColor: "text-orange-600",
	},
	{
		icon: Clock,
		title: "Gestão de Tempo Otimizada",
		description:
			"Automatize confirmações, lembretes e reagendamentos. Foque no que importa: cuidar dos pets.",
		iconBg: "bg-pink-100",
		iconColor: "text-pink-600",
	},
	{
		icon: Star,
		title: "Sistema de Avaliações",
		description:
			"Construa uma reputação sólida com avaliações reais de clientes. Mais de 95% dos nossos parceiros têm avaliação 4+ estrelas.",
		iconBg: "bg-yellow-100",
		iconColor: "text-yellow-600",
	},
	{
		icon: Smartphone,
		title: "App Mobile Completo",
		description:
			"Gerencie seu negócio de qualquer lugar com nosso app móvel. Receba notificações em tempo real.",
		iconBg: "bg-indigo-100",
		iconColor: "text-indigo-600",
	},
	{
		icon: BarChart3,
		title: "Relatórios Detalhados",
		description:
			"Acompanhe o desempenho do seu negócio com dashboards e relatórios completos de vendas e clientes.",
		iconBg: "bg-teal-100",
		iconColor: "text-teal-600",
	},
	{
		icon: Shield,
		title: "Pagamentos Seguros",
		description:
			"Sistema de pagamentos integrado e seguro. Receba automaticamente com proteção contra fraudes.",
		iconBg: "bg-red-100",
		iconColor: "text-red-600",
	},
];

export function BenefitsSection() {
	return (
		<section className="py-20 px-4 bg-white">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						Por que Escolher Nossa Plataforma?
					</h2>
					<p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
						Oferecemos tudo que sua empresa precisa para crescer no mercado pet.
						Veja os principais benefícios que nossos parceiros aproveitam todos
						os dias.
					</p>
				</div>

				{/* Benefits Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{benefits.map((benefit) => {
						const IconComponent = benefit.icon;
						return (
							<Card
								key={benefit.title}
								className="p-6 border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
							>
								{/* Icon */}
								<div
									className={`w-12 h-12 ${benefit.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
								>
									<IconComponent className={`w-6 h-6 ${benefit.iconColor}`} />
								</div>

								{/* Content */}
								<h3 className="text-xl font-semibold text-gray-900 mb-3">
									{benefit.title}
								</h3>
								<p className="text-gray-600 leading-relaxed">
									{benefit.description}
								</p>
							</Card>
						);
					})}
				</div>

				{/* Bottom CTA Section */}
				<div className="mt-16 text-center">
					<div className="bg-linear-to-r from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12">
						<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
							Pronto para Transformar seu Negócio?
						</h3>
						<p className="text-lg text-gray-600 mb-6">
							Junte-se a mais de 150+ empresas que já fazem parte da nossa rede
						</p>
						<div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
							<span className="flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full" />
								Sem taxa de adesão
							</span>
							<span className="flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full" />
								Suporte personalizado
							</span>
							<span className="flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full" />
								Resultados em 30 dias
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
