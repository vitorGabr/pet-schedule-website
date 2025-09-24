import { Card } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
	{
		name: "Dr. Maria Silva",
		role: "Veterinária",
		company: "Clínica VetLife",
		location: "São Paulo, SP",
		rating: 5,
		text: "A plataforma transformou completamente nossa gestão. Antes perdíamos muito tempo com ligações e confirmações. Agora tudo é automático e nossos clientes adoram a praticidade de agendar pelo app.",
		avatar: "👩‍⚕️",
		results: "Aumento de 45% no faturamento"
	},
	{
		name: "Carlos Mendes",
		role: "Proprietário",
		company: "Pet Paradise Hotel",
		location: "Rio de Janeiro, RJ",
		rating: 5,
		text: "Em apenas 4 meses conseguimos lotar nossa hospedagem. A ferramenta de marketing da plataforma nos trouxe visibilidade que nunca tivemos antes. Recomendo para todos os colegas do setor.",
		avatar: "👨‍💼",
		results: "100% de ocupação em temporadas"
	},
	{
		name: "Ana Paula Costa",
		role: "Tosadora Profissional",
		company: "Beleza Pet Studio",
		location: "Belo Horizonte, MG",
		rating: 5,
		text: "Como profissional autônoma, a plataforma me deu credibilidade e organização que eu não tinha. Hoje tenho agenda cheia e uma lista de espera. Meu sonho de ter meu próprio negócio se tornou realidade!",
		avatar: "✂️",
		results: "Agenda lotada por 3 meses"
	},
	{
		name: "Roberto Lima",
		role: "Diretor",
		company: "MegaPet Shopping",
		location: "Brasília, DF",
		rating: 5,
		text: "A integração com nosso sistema foi perfeita. Os relatórios nos ajudam muito na tomada de decisões. Nossos clientes elogiam sempre a facilidade de agendar serviços pelo site.",
		avatar: "🏢",
		results: "Otimização de 30% nos processos"
	},
	{
		name: "Fernanda Oliveira",
		role: "Dog Walker",
		company: "PetWalk Serviços",
		location: "Porto Alegre, RS",
		rating: 5,
		text: "Comecei com poucos clientes e hoje atendo mais de 50 pets por semana. A plataforma me conectou com tutores que realmente valorizam um serviço profissional. Mudou minha vida!",
		avatar: "🐕",
		results: "De 5 para 50+ pets por semana"
	},
	{
		name: "Dr. João Santos",
		role: "Veterinário",
		company: "Clínica Animal Care",
		location: "Salvador, BA",
		rating: 5,
		text: "O sistema de avaliações nos ajudou muito a construir uma reputação sólida. Hoje somos referência na região e temos clientes que vêm de outras cidades. A qualidade dos leads é excelente.",
		avatar: "👨‍⚕️",
		results: "Referência regional em 8 meses"
	}
];

export function TestimonialsSection() {
	return (
		<section className="py-20 px-4 bg-white">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						O que Nossos Parceiros Dizem
					</h2>
					<p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
						Histórias reais de sucesso de empresas que cresceram conosco. 
						Veja como nossa plataforma pode transformar seu negócio também.
					</p>
				</div>

				{/* Testimonials Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<Card 
							key={`${testimonial.name}-${index}`}
							className="p-6 border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300 relative"
						>
							{/* Quote Icon */}
							<div className="absolute top-4 right-4 opacity-10">
								<Quote className="w-8 h-8 text-primary" />
							</div>

							{/* Rating */}
							<div className="flex items-center gap-1 mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star 
										key={`star-${testimonial.name}-${i}`}
										className="w-4 h-4 fill-yellow-400 text-yellow-400" 
									/>
								))}
							</div>

							{/* Testimonial Text */}
							<p className="text-gray-700 leading-relaxed mb-6 italic">
								"{testimonial.text}"
							</p>

							{/* Results Badge */}
							<div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
								<p className="text-sm font-semibold text-green-800">
									📈 {testimonial.results}
								</p>
							</div>

							{/* Author Info */}
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl">
									{testimonial.avatar}
								</div>
								<div>
									<h4 className="font-semibold text-gray-900">
										{testimonial.name}
									</h4>
									<p className="text-sm text-gray-600">
										{testimonial.role}
									</p>
									<p className="text-sm font-medium text-primary">
										{testimonial.company}
									</p>
									<p className="text-xs text-gray-500">
										{testimonial.location}
									</p>
								</div>
							</div>
						</Card>
					))}
				</div>

				{/* Bottom CTA */}
				<div className="text-center mt-16">
					<div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12">
						<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
							Sua Empresa Pode Ser a Próxima História de Sucesso!
						</h3>
						<p className="text-lg text-gray-600 mb-6">
							Junte-se a centenas de empresas que já transformaram seus negócios com nossa plataforma
						</p>
						<div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
							<span className="flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full" />
								Implementação rápida
							</span>
							<span className="flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full" />
								Suporte dedicado
							</span>
							<span className="flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full" />
								Resultados garantidos
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
