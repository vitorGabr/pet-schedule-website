import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Logo from "@/images/logo.svg";

export async function Footer() {
	"use cache";
	return (
		<footer className="bg-gray-50 py-12 px-4 border-t">
			<div className="max-w-7xl mx-auto">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
					{/* Company Information */}
					<div className="space-y-4">
						<Image src={Logo} alt="Logo" width={100} />
						<p className="text-gray-700 text-sm leading-relaxed">
							Cuidando do seu pet com amor e profissionalismo desde 2025.
						</p>
					</div>

					{/* Services */}
					<div className="space-y-4">
						<h4 className="text-lg font-bold text-gray-900">Serviços</h4>
						<ul className="space-y-2 text-sm text-gray-700">
							<li>Banho Completo</li>
							<li>Tosa Profissional</li>
							<li>Spa Relaxante</li>
							<li>Cuidados Especiais</li>
						</ul>
					</div>

					{/* For Companies */}
					<div className="space-y-4">
						<h4 className="text-lg font-bold text-gray-900">Para Empresas</h4>
						<ul className="space-y-2 text-sm text-gray-700">
							<li>
								<a
									href="/cotacao"
									className="hover:text-primary transition-colors"
								>
									Solicitar Cotação
								</a>
							</li>
							<li>
								<a
									href="/cotacao"
									className="hover:text-primary transition-colors"
								>
									Seja um Parceiro
								</a>
							</li>
							<li>
								<a
									href="/cotacao"
									className="hover:text-primary transition-colors"
								>
									Planos Empresariais
								</a>
							</li>
							<li>
								<a
									href="/cotacao"
									className="hover:text-primary transition-colors"
								>
									Suporte Comercial
								</a>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div className="space-y-4">
						<h4 className="text-lg font-bold text-gray-900">Contato</h4>
						<div className="space-y-3 text-sm text-gray-700">
							<div className="flex items-center space-x-2">
								<MapPin className="w-4 h-4 text-gray-500" />
								<span>Rua das Flores, 123</span>
							</div>
							<div className="flex items-center space-x-2">
								<Phone className="w-4 h-4 text-gray-500" />
								<span>(11) 99999-9999</span>
							</div>
						</div>
					</div>

					{/* Hours */}
					<div className="space-y-4">
						<h4 className="text-lg font-bold text-gray-900">Horários</h4>
						<ul className="space-y-2 text-sm text-gray-700">
							<li>Segunda a Sexta: 8h às 18h</li>
							<li>Sábado: 8h às 16h</li>
							<li>Domingo: Fechado</li>
						</ul>
					</div>
				</div>

				{/* Separator */}
				<div className="border-t border-gray-200 pt-6">
					<p className="text-center text-sm text-gray-700">
						© {new Date().getFullYear()} PetEsy. Todos os direitos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
}
