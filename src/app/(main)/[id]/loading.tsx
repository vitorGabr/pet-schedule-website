import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, MapPin, MessageCircle } from "lucide-react";

export default function Loading() {
	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-6">
				<div className="grid lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Hero Section Skeleton */}
						<div className="relative">
							<div className="h-64 md:h-96 rounded-xl overflow-hidden">
								<Skeleton className="w-full h-full" />
							</div>
						</div>

						{/* Company Info Skeleton */}
						<div>
							<Skeleton className="h-10 w-3/4 mb-4" />
							<div className="flex items-center space-x-1 mb-4">
								<div className="flex">
									{[...Array(5)].map((_, i) => (
										<Skeleton key={i} className="w-5 h-5 rounded-sm" />
									))}
								</div>
								<Skeleton className="h-6 w-8 ml-2" />
								<Skeleton className="h-6 w-24 ml-2" />
							</div>
							<div className="flex items-center text-muted-foreground mb-4">
								<MapPin className="w-5 h-5 mr-2" />
								<Skeleton className="h-5 w-64" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-5 w-full" />
								<Skeleton className="h-5 w-5/6" />
								<Skeleton className="h-5 w-4/5" />
							</div>
						</div>

						{/* Services Skeleton */}
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl">Serviços Disponíveis</CardTitle>
								<CardDescription>Escolha o melhor cuidado para seu pet</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4">
									{[...Array(3)].map((_, i) => (
										<div key={i} className="p-4 rounded-lg border border-border">
											<div className="flex items-center justify-between">
												<div className="flex-1">
													<div className="flex items-center gap-3 mb-2">
														<Skeleton className="h-6 w-32" />
													</div>
													<Skeleton className="h-4 w-full mb-2" />
													<Skeleton className="h-4 w-3/4 mb-2" />
													<div className="flex items-center gap-4 text-sm text-muted-foreground">
														<div className="flex items-center gap-1">
															<Skeleton className="w-4 h-4" />
															<Skeleton className="h-4 w-32" />
														</div>
													</div>
												</div>
												<div className="text-right">
													<Skeleton className="h-6 w-24 mb-2" />
													<Skeleton className="h-8 w-20" />
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Reviews Skeleton */}
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl flex items-center gap-2">
									<MessageCircle className="w-6 h-6" />
									Avaliações dos Clientes
								</CardTitle>
								<CardDescription>
									<Skeleton className="h-4 w-32" />
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									{[...Array(3)].map((_, i) => (
										<div key={i} className="border-b border-border pb-6 last:border-b-0">
											<div className="flex items-start gap-4">
												<Avatar>
													<AvatarFallback>
														<Skeleton className="w-10 h-10 rounded-full" />
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<div className="flex items-center justify-between mb-2">
														<Skeleton className="h-5 w-24" />
														<Skeleton className="h-4 w-20" />
													</div>
													<div className="flex items-center gap-2 mb-2">
														<div className="flex">
															{[...Array(5)].map((_, j) => (
																<Skeleton key={j} className="w-4 h-4 rounded-sm" />
															))}
														</div>
													</div>
													<div className="space-y-2">
														<Skeleton className="h-4 w-full" />
														<Skeleton className="h-4 w-5/6" />
														<Skeleton className="h-4 w-4/5" />
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar Skeleton */}
					<div className="space-y-6">
						{/* Contact Info Skeleton */}
						<Card>
							<CardHeader>
								<CardTitle>Informações de Contato</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center gap-3">
									<Skeleton className="w-5 h-5" />
									<Skeleton className="h-4 w-32" />
								</div>
								<div className="flex items-center gap-3">
									<Skeleton className="w-5 h-5" />
									<Skeleton className="h-4 w-40" />
								</div>
								<div className="flex items-center gap-3">
									<Skeleton className="w-5 h-5" />
									<Skeleton className="h-4 w-36" />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Horários</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{[...Array(5)].map((_, i) => (
									<div key={i} className="flex items-center gap-3">
										<Skeleton className="w-5 h-5" />
										<Skeleton className="h-4 w-32" />
									</div>
								))}
							</CardContent>
						</Card>

						{/* Location Map Skeleton */}
						<Card>
							<CardHeader>
								<CardTitle>Localização</CardTitle>
							</CardHeader>
							<CardContent>
								<Skeleton className="h-48 w-full rounded-lg" />
							</CardContent>
						</Card>

						{/* Features Skeleton */}
						<Card>
							<CardHeader>
								<CardTitle>Diferenciais</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{[...Array(4)].map((_, i) => (
										<div key={i} className="flex items-center gap-3">
											<CheckCircle className="w-5 h-5 text-green-500" />
											<Skeleton className="h-4 w-32" />
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
