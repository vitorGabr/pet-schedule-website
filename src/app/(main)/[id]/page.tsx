import { getCompanyById, listAnimalsFromUser, listCompanyRatings } from "@/lib/http";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { CheckCircle, MapPin, MessageCircle, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { verifySession } from "@/lib/auth/verify-session";
import { BookingModal } from "../../../components/booking/modal";
import { ContactInfo } from "./_components/contact-info";
import { LocationMap } from "./_components/location-map";
import { ServiceCard } from "./_components/service-card";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ id?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const company = await getCompanyById(id).catch(() => null);

	if (!company) {
		return {
			title: "Empresa não encontrada",
			description: "A empresa solicitada não foi encontrada.",
		};
	}

	const title = `${company.name} | PETI - Serviços para Pets`;
	const description =
		company.description ||
		`Conheça ${company.name}, especializada em cuidados para pets. ${company.services.map((s) => s.name).join(", ")}. Avaliação ${company.averageRating || 0}/5 estrelas.`;
	const imageUrl = company.images[0]?.url || "/placeholder.svg";
	const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://peti.com.br";

	return {
		title,
		description,
		keywords: [
			company.name,
			"pet",
			"cuidados para pets",
			"tosa",
			"hospedagem",
			"passeio",
			company.address.city,
			company.address.state,
			...company.services.map((s) => s.name),
		],
		authors: [{ name: company.name }],
		openGraph: {
			type: "website",
			locale: "pt_BR",
			url: `${siteUrl}/${id}`,
			title,
			description,
			siteName: "PETI",
			images: [
				{ url: imageUrl, width: 1200, height: 630, alt: `${company.name} - Serviços para Pets` },
			],
		},
	};
}

export default async function EmpresaPage({ params, searchParams }: Props) {
	const { id } = await params;
	const { id: serviceId } = await searchParams;

	const session = await verifySession();
	const company = await getCompanyById(id).catch(() => null);

	if (!company) return notFound();
	const [reviews, animals] = await Promise.all([
		listCompanyRatings(id).catch(() => null),
		listAnimalsFromUser(session?.id ?? "").catch(() => null),
	]);
	const selectedService = company.services.find((s) => s.id === serviceId);

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-6">
				<div className="grid lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Hero Section */}
						<div className="relative">
							<div className="h-64 md:h-96 rounded-xl overflow-hidden">
								<Image
									src={company.images[0].url || "/placeholder.svg"}
									alt={company.name}
									className="w-full h-full object-cover"
									width={800}
									height={800}
								/>
							</div>
						</div>

						{/* Company Info */}
						<div>
							<h1 className="text-3xl md:text-4xl font-bold mb-4">{company.name}</h1>
							<div className="flex items-center space-x-1 mb-4">
								<div className="flex">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`w-5 h-5 ${
												i < Math.floor(company.averageRating ?? 0)
													? "text-yellow-400 fill-current"
													: "text-gray-300"
											}`}
										/>
									))}
								</div>
								<span className="text-lg font-semibold">{company.averageRating ?? 0}</span>
								<span className="text-muted-foreground">
									({company.ratingCount ?? 0} avaliações)
								</span>
							</div>
							<div className="flex items-center text-muted-foreground mb-4">
								<MapPin className="w-5 h-5 mr-2" />
								<span>{company.address.addressLine}</span>
							</div>
							<p className="text-lg text-muted-foreground">{company.description}</p>
						</div>

						{/* Services */}
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl">Serviços Disponíveis</CardTitle>
								<CardDescription>Escolha o melhor cuidado para seu pet</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4">
									{company?.services.map((service) => (
										<ServiceCard
											key={service.id}
											service={service}
											authenticated={!!session?.id}
											hasAnimal={!!animals?.items?.length}
										/>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Reviews */}
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl flex items-center gap-2">
									<MessageCircle className="w-6 h-6" />
									Avaliações dos Clientes
								</CardTitle>
								<CardDescription>{company.averageRating} avaliações verificadas</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									{reviews?.items?.map((review) => (
										<div key={review.id} className="border-b border-border pb-6 last:border-b-0">
											<div className="flex items-start gap-4">
												<Avatar>
													<AvatarImage src={"#"} />
													<AvatarFallback>{review.user?.name?.charAt(0)}</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<div className="flex items-center justify-between mb-2">
														<h4 className="font-semibold">{review.user?.name}</h4>
														<span className="text-sm text-muted-foreground">
															{format(new Date(review.createdAt), "dd/MM/yyyy")}
														</span>
													</div>
													<div className="flex items-center gap-2 mb-2">
														<div className="flex">
															{[...Array(5)].map((_, i) => (
																<Star
																	key={i}
																	className={`w-4 h-4 ${
																		i < review.rating
																			? "text-yellow-400 fill-current"
																			: "text-gray-300"
																	}`}
																/>
															))}
														</div>
													</div>
													<p className="text-muted-foreground">{review.comment}</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						<ContactInfo data={company} />
						<LocationMap address={company.address} />

						{/* Features */}
						<Card>
							<CardHeader>
								<CardTitle>Diferenciais</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<CheckCircle className="w-5 h-5 text-green-500" />
										<span className="text-sm">Profissionais Certificados</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle className="w-5 h-5 text-green-500" />
										<span className="text-sm">Produtos Premium</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle className="w-5 h-5 text-green-500" />
										<span className="text-sm">Ambiente Climatizado</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle className="w-5 h-5 text-green-500" />
										<span className="text-sm">Agendamento Online</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
			{selectedService && session?.id && (
				<BookingModal
					service={selectedService}
					companyId={company.id ?? ""}
					animals={animals?.items ?? []}
					userId={session?.id}
				/>
			)}
		</div>
	);
}
