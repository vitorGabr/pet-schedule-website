import { Building2, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function BusinessCtaSection() {
	return (
		<section className="py-20 px-4 bg-linear-to-br from-primary/10 via-primary/5 to-primary/10">
			<div className="max-w-7xl mx-auto">
				<Card className="relative overflow-hidden border-none bg-white">
					<div className="relative p-8 md:p-12 lg:p-16">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
							{/* Content */}
							<div>
								{/* Badge */}
								<div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
									<Building2 className="w-4 h-4" />
									Exclusivo para Empresas
								</div>

								{/* Title */}
								<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
									Transforme seu Negócio Pet em uma Máquina de Vendas
								</h2>

								{/* Description */}
								<p className="text-lg text-gray-600 mb-6 leading-relaxed">
									Junte-se a mais de 150 empresas que já aumentaram seu
									faturamento em até 40% com nossa plataforma. Agendamentos
									automatizados, mais clientes e gestão simplificada.
								</p>

								{/* Benefits List */}
								<ul className="space-y-3 mb-8">
									{[
										"Agendamentos online 24/7",
										"Aumento médio de 40% no faturamento",
										"Gestão completa de clientes",
										"Suporte dedicado e treinamento",
									].map((benefit) => (
										<li key={benefit} className="flex items-center gap-3">
											<div className="w-2 h-2 bg-green-500 rounded-full" />
											<span className="text-gray-700">{benefit}</span>
										</li>
									))}
								</ul>

								{/* CTA Buttons */}
								<div className="flex flex-col sm:flex-row gap-4">
									<Button asChild size={"lg"}>
										<Link href="/cotacao">Solicitar Cotação Gratuita</Link>
									</Button>
									<Button variant="outline" asChild size={"lg"}>
										<Link href="/cotacao">Ver Como Funciona</Link>
									</Button>
								</div>

								{/* Trust Indicator */}
								<p className="text-sm text-gray-500 mt-4">
									✓ Sem taxa de adesão • ✓ Resultados em 30 dias • ✓ Suporte
									especializado
								</p>
							</div>

							{/* Stats Grid */}
							<div className="grid grid-cols-2 gap-6">
								{[
									{
										icon: Building2,
										number: "150+",
										label: "Empresas Parceiras",
										color: "text-blue-600",
										bg: "bg-blue-100",
									},
									{
										icon: TrendingUp,
										number: "40%",
										label: "Aumento Médio",
										color: "text-green-600",
										bg: "bg-green-100",
									},
									{
										icon: Users,
										number: "2.500+",
										label: "Clientes Ativos",
										color: "text-purple-600",
										bg: "bg-purple-100",
									},
									{
										icon: Zap,
										number: "24h",
										label: "Setup Rápido",
										color: "text-orange-600",
										bg: "bg-orange-100",
									},
								].map((stat) => {
									const IconComponent = stat.icon;
									return (
										<div
											key={stat.label}
											className="text-center p-4 bg-gray-50 rounded-xl"
										>
											<div
												className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-3`}
											>
												<IconComponent className={`w-6 h-6 ${stat.color}`} />
											</div>
											<div className="text-2xl font-bold text-gray-900 mb-1">
												{stat.number}
											</div>
											<div className="text-sm text-gray-600">{stat.label}</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
