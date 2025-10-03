"use client";

import { useForm } from "@tanstack/react-form";
import {
	Building2,
	CheckCircle,
	Clock,
	FileText,
	MapPin,
	Phone,
	Users,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	type QuoteCompanySchema,
	quoteCompanySchema,
} from "@/schemas/quote-company";

const businessTypes = [
	{ value: "clinica-veterinaria", label: "Clínica Veterinária" },
	{ value: "pet-shop", label: "Pet Shop" },
	{ value: "banho-tosa", label: "Banho e Tosa" },
	{ value: "hotel-pet", label: "Hotel/Hospedagem Pet" },
	{ value: "dog-walker", label: "Dog Walker/Passeador" },
	{ value: "adestramento", label: "Adestramento" },
	{ value: "transporte-pet", label: "Transporte Pet" },
	{ value: "outro", label: "Outro" },
];

const serviceOptions = [
	"Consultas Veterinárias",
	"Vacinação",
	"Cirurgias",
	"Banho e Tosa",
	"Hospedagem",
	"Day Care",
	"Passeios",
	"Adestramento",
	"Transporte",
	"Produtos Pet",
	"Ração e Medicamentos",
	"Outros",
];

export default function QuoteFormSection() {
	const [isSubmitted, setIsSubmitted] = useState(false);

	const form = useForm({
		defaultValues: {} as QuoteCompanySchema,
		validators: { onChange: quoteCompanySchema },
		onSubmit: async (_) => {
			await new Promise((r) => setTimeout(r, 1500));
			setIsSubmitted(true);
		},
	});

	if (isSubmitted) {
		return (
			<section
				id="quote-form"
				className="py-20 px-4 bg-gradient-to-br from-green-50 to-green-100"
			>
				<div className="max-w-4xl mx-auto text-center">
					<Card className="p-12 border bg-white">
						<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<CheckCircle className="w-10 h-10 text-green-600" />
						</div>
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Cotação Enviada com Sucesso!
						</h2>
						<p className="text-lg text-gray-600 mb-6">
							Recebemos sua solicitação e nossa equipe entrará em contato em até
							24 horas para apresentar uma proposta personalizada para seu
							negócio.
						</p>
						<div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
							<h3 className="font-semibold text-green-800 mb-2">
								Próximos Passos:
							</h3>
							<ul className="text-left text-green-700 space-y-2">
								<li className="flex items-center gap-2">
									<div className="w-2 h-2 bg-green-600 rounded-full" /> Análise
									da sua empresa e necessidades
								</li>
								<li className="flex items-center gap-2">
									<div className="w-2 h-2 bg-green-600 rounded-full" /> Contato
									da nossa equipe comercial
								</li>
								<li className="flex items-center gap-2">
									<div className="w-2 h-2 bg-green-600 rounded-full" />{" "}
									Apresentação de proposta personalizada
								</li>
								<li className="flex items-center gap-2">
									<div className="w-2 h-2 bg-green-600 rounded-full" />{" "}
									Demonstração da plataforma
								</li>
							</ul>
						</div>
						<Button
							onClick={() => {
								window.location.href = "/";
							}}
							className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg"
						>
							Voltar ao Início
						</Button>
					</Card>
				</div>
			</section>
		);
	}

	return (
		<section id="quote-form" className="py-20 px-4 bg-gray-50">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						Solicite sua Cotação Personalizada
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Preencha o formulário abaixo e nossa equipe preparará uma proposta
						sob medida para as necessidades do seu negócio.
					</p>
					<div className="flex items-center justify-center gap-2 mt-4 text-sm text-green-600">
						<Clock className="w-4 h-4" />
						<span>Resposta em até 24 horas</span>
					</div>
				</div>

				<Card className="p-8 md:p-12 border bg-white">
					{/* form.handleSubmit triggers the onSubmit defined in useForm */}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="space-y-8"
					>
						{/* Informações da Empresa */}
						<div>
							<div className="flex items-center gap-2 mb-6">
								<Building2 className="w-5 h-5 text-primary" />
								<h3 className="text-xl font-semibold text-gray-900">
									Informações da Empresa
								</h3>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<form.Field name="companyName">
									{(field) => (
										<div>
											<Label
												htmlFor="companyName"
												className="text-sm font-medium text-gray-700 mb-2 block"
											>
												Nome da Empresa *
											</Label>
											<Input
												id="companyName"
												type="text"
												value={field.state.value ?? ""}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className="h-12"
												placeholder="Ex: Pet Care Clínica Veterinária"
											/>
											{!field.state.meta.isValid && (
												<p className="text-sm text-red-600 mt-1">
													{field.state.meta.errors.join(", ")}
												</p>
											)}
										</div>
									)}
								</form.Field>

								<form.Field name="ownerName">
									{(field) => (
										<div>
											<Label
												htmlFor="ownerName"
												className="text-sm font-medium text-gray-700 mb-2 block"
											>
												Nome do Responsável *
											</Label>
											<Input
												id="ownerName"
												type="text"
												value={field.state.value ?? ""}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className="h-12"
												placeholder="Seu nome completo"
											/>
											{!field.state.meta.isValid && (
												<p className="text-sm text-red-600 mt-1">
													{field.state.meta.errors.join(", ")}
												</p>
											)}
										</div>
									)}
								</form.Field>
							</div>
						</div>

						{/* Contato */}
						<div>
							<div className="flex items-center gap-2 mb-6">
								<Phone className="w-5 h-5 text-primary" />
								<h3 className="text-xl font-semibold text-gray-900">
									Informações de Contato
								</h3>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<form.Field name="email">
									{(field) => (
										<div>
											<Label
												htmlFor="email"
												className="text-sm font-medium text-gray-700 mb-2 block"
											>
												E-mail Comercial *
											</Label>
											<Input
												id="email"
												type="email"
												value={field.state.value ?? ""}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className="h-12"
												placeholder="contato@suaempresa.com"
											/>
											{!field.state.meta.isValid && (
												<p className="text-sm text-red-600 mt-1">
													{field.state.meta.errors.join(", ")}
												</p>
											)}
										</div>
									)}
								</form.Field>

								<form.Field name="phone">
									{(field) => (
										<div>
											<Label
												htmlFor="phone"
												className="text-sm font-medium text-gray-700 mb-2 block"
											>
												Telefone/WhatsApp *
											</Label>
											<Input
												id="phone"
												type="tel"
												value={field.state.value ?? ""}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className="h-12"
												placeholder="(11) 99999-9999"
											/>
											{!field.state.meta.isValid && (
												<p className="text-sm text-red-600 mt-1">
													{field.state.meta.errors.join(", ")}
												</p>
											)}
										</div>
									)}
								</form.Field>
							</div>
						</div>

						{/* Localização */}
						<div>
							<div className="flex items-center gap-2 mb-6">
								<MapPin className="w-5 h-5 text-primary" />
								<h3 className="text-xl font-semibold text-gray-900">
									Localização
								</h3>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<form.Field name="city">
									{(field) => (
										<div>
											<Label
												htmlFor="city"
												className="text-sm font-medium text-gray-700 mb-2 block"
											>
												Cidade *
											</Label>
											<Input
												id="city"
												type="text"
												value={field.state.value ?? ""}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className="h-12"
												placeholder="Ex: São Paulo"
											/>
											{!field.state.meta.isValid && (
												<p className="text-sm text-red-600 mt-1">
													{field.state.meta.errors.join(", ")}
												</p>
											)}
										</div>
									)}
								</form.Field>

								<form.Field name="state">
									{(field) => (
										<div>
											<Label
												htmlFor="state"
												className="text-sm font-medium text-gray-700 mb-2 block"
											>
												Estado *
											</Label>
											<Input
												id="state"
												type="text"
												value={field.state.value ?? ""}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className="h-12"
												placeholder="Ex: SP"
											/>
											{!field.state.meta.isValid && (
												<p className="text-sm text-red-600 mt-1">
													{field.state.meta.errors.join(", ")}
												</p>
											)}
										</div>
									)}
								</form.Field>
							</div>
						</div>

						{/* Negócio */}
						<div>
							<div className="flex items-center gap-2 mb-6">
								<Users className="w-5 h-5 text-primary" />
								<h3 className="text-xl font-semibold text-gray-900">
									Sobre seu Negócio
								</h3>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<form.Field name="businessType">
									{(field) => (
										<div>
											<Label
												htmlFor="businessType"
												className="text-sm font-medium text-gray-700 mb-2 block"
											>
												Tipo de Negócio *
											</Label>
											<select
												id="businessType"
												value={field.state.value ?? ""}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className="h-12 w-full px-3 border border-gray-300 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
											>
												<option value="">Selecione...</option>
												{businessTypes.map((type) => (
													<option key={type.value} value={type.value}>
														{type.label}
													</option>
												))}
											</select>
											{!field.state.meta.isValid && (
												<p className="text-sm text-red-600 mt-1">
													{field.state.meta.errors.join(", ")}
												</p>
											)}
										</div>
									)}
								</form.Field>

								<form.Field name="employeeCount">
									{(field) => (
										<div>
											<Label
												htmlFor="employeeCount"
												className="text-sm font-medium text-gray-700 mb-2 block"
											>
												Número de Funcionários
											</Label>
											<select
												id="employeeCount"
												value={field.state.value ?? ""}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className="h-12 w-full px-3 border border-gray-300 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
											>
												<option value="">Selecione...</option>
												<option value="1-3">1 a 3 funcionários</option>
												<option value="4-10">4 a 10 funcionários</option>
												<option value="11-25">11 a 25 funcionários</option>
												<option value="25+">Mais de 25 funcionários</option>
											</select>
										</div>
									)}
								</form.Field>
							</div>
						</div>

						{/* Serviços Oferecidos */}
						<div>
							<Label className="text-sm font-medium text-gray-700 mb-4 block">
								Quais serviços sua empresa oferece? *
							</Label>

							<form.Field name="services">
								{(field) => (
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										{serviceOptions.map((service) => {
											const checked = (field.state.value ?? []).includes(
												service,
											);

											const toggle = () => {
												const current = field.state.value ?? [];
												if (current.includes(service)) {
													field.handleChange(
														current.filter((s: string) => s !== service),
													);
												} else {
													field.handleChange([...current, service]);
												}
											};

											return (
												<div
													key={service}
													className="flex items-center space-x-2"
												>
													<Checkbox
														id={service}
														checked={checked}
														onCheckedChange={toggle}
													/>
													<Label
														htmlFor={service}
														className="text-sm text-gray-700 cursor-pointer"
													>
														{service}
													</Label>
												</div>
											);
										})}

										{!field.state.meta.isValid && (
											<p className="text-sm text-red-600 mt-1">
												{field.state.meta.errors.join(", ")}
											</p>
										)}
									</div>
								)}
							</form.Field>
						</div>

						{/* Informações Adicionais */}
						<div>
							<div className="flex items-center gap-2 mb-6">
								<FileText className="w-5 h-5 text-primary" />
								<h3 className="text-xl font-semibold text-gray-900">
									Informações Adicionais
								</h3>
							</div>

							<div className="space-y-6">
								<form.Field name="challenges">
									{(field) => (
										<div>
											<Label
												htmlFor="challenges"
												className="text-sm font-medium text-gray-700 mb-2 block"
											>
												Principais desafios do seu negócio
											</Label>
											<Textarea
												id="challenges"
												value={field.state.value ?? ""}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className="min-h-[100px]"
												placeholder="Ex: Dificuldade em gerenciar agendamentos, perda de clientes, falta de visibilidade online..."
											/>
										</div>
									)}
								</form.Field>

								<form.Field name="expectations">
									{(field) => (
										<div>
											<Label
												htmlFor="expectations"
												className="text-sm font-medium text-gray-700 mb-2 block"
											>
												O que espera da nossa plataforma?
											</Label>
											<Textarea
												id="expectations"
												value={field.state.value ?? ""}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className="min-h-[100px]"
												placeholder="Conte-nos suas expectativas e objetivos..."
											/>
										</div>
									)}
								</form.Field>
							</div>
						</div>

						{/* Checkbox de Termos */}
						<div className="flex items-start space-x-2 pt-4 border-t border-gray-200">
							<form.Field name="acceptsTerms">
								{(field) => (
									<>
										<Checkbox
											id="acceptsTerms"
											checked={Boolean(field.state.value)}
											onCheckedChange={(v) => field.handleChange(Boolean(v))}
										/>
										<Label
											htmlFor="acceptsTerms"
											className="text-sm text-gray-600 leading-relaxed"
										>
											Concordo em receber contato da equipe comercial e aceito
											os{" "}
											<span className="text-primary hover:underline cursor-pointer">
												termos de uso
											</span>{" "}
											e{" "}
											<span className="text-primary hover:underline cursor-pointer">
												política de privacidade
											</span>
											.
										</Label>
										{!field.state.meta.isValid && (
											<p className="text-sm text-red-600 mt-1">
												{field.state.meta.errors.join(", ")}
											</p>
										)}
									</>
								)}
							</form.Field>
						</div>

						{/* Submit Button */}
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
						>
							{([canSubmit, isSubmitting]) => (
								<Button
									type="submit"
									disabled={!canSubmit || isSubmitting}
									className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-semibold text-lg rounded-lg transition-all disabled:opacity-50"
								>
									{isSubmitting ? "Enviando..." : "Solicitar Cotação Gratuita"}
								</Button>
							)}
						</form.Subscribe>
						{/* Security Note */}
						<p className="text-xs text-gray-500 text-center">
							🔒 Seus dados estão seguros conosco. Não compartilhamos
							informações com terceiros.
						</p>
					</form>
				</Card>
			</div>
		</section>
	);
}
