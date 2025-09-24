import { Card } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
	{
		id: 1,
		name: "Maria Silva",
		role: "Tutora da Luna",
		content:
			"O atendimento foi excepcional! A Luna ficou linda depois da tosa e o ambiente é super acolhedor. Já agendei o próximo banho!",
		rating: 5,
		petName: "Luna",
		petType: "Golden Retriever",
		image:
			"https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
	},
	{
		id: 2,
		name: "Carlos Oliveira",
		role: "Tutor do Max e Bella",
		content:
			"Encontrei os melhores profissionais através da plataforma. Meus pets adoram ir ao spa! Recomendo para todos os tutores.",
		rating: 5,
		petName: "Max e Bella",
		petType: "Border Collie",
		image:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
	},
	{
		id: 3,
		name: "Ana Costa",
		role: "Tutora do Simba",
		content:
			"A facilidade para agendar e a qualidade do serviço me surpreenderam. O Simba sempre volta para casa feliz e cheiroso!",
		rating: 5,
		petName: "Simba",
		petType: "Gato Persa",
		image:
			"https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
	},
];

export function TestimonialsSection() {
	return (
		<section className="py-16 px-4 bg-white">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
						<Star className="w-8 h-8 text-yellow-500 fill-current" />
					</div>
					<h2 className="text-4xl font-bold text-gray-900 mb-4">O que nossos clientes dizem</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Histórias reais de tutores que confiam nos nossos serviços para cuidar de seus pets com
						carinho e profissionalismo
					</p>
				</div>

				{/* Testimonials Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial) => (
						<Card
							key={testimonial.id}
							className="p-6 bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300"
						>
							{/* Quote Icon */}
							<div className="mb-4">
								<Quote className="w-8 h-8 text-primary/30" />
							</div>

							{/* Rating */}
							<div className="flex items-center gap-1 mb-4">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={`testimonial-${testimonial.id}-star-${star}`}
										className={`w-4 h-4 ${
											star <= testimonial.rating
												? "fill-yellow-400 text-yellow-400"
												: "text-gray-300"
										}`}
									/>
								))}
							</div>

							{/* Content */}
							<p className="text-gray-700 leading-relaxed mb-6 text-sm">"{testimonial.content}"</p>

							{/* Author */}
							<div className="flex items-center gap-3">
								<div className="relative">
									<Image
										src={testimonial.image}
										alt={`Foto de ${testimonial.name}`}
										width={48}
										height={48}
										className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
									/>
								</div>
								<div className="flex-1">
									<h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
									<p className="text-xs text-gray-500">{testimonial.role}</p>
									<p className="text-xs text-primary font-medium">
										🐾 {testimonial.petName} • {testimonial.petType}
									</p>
								</div>
							</div>
						</Card>
					))}
				</div>

				{/* CTA Bottom */}
				<div className="text-center mt-12">
					<div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
						<span className="text-primary font-semibold text-sm">
							📈 Mais de 2.500+ avaliações 5 estrelas
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
