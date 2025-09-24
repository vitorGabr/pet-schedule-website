import Link from "next/link";
import { Illustration } from "./_components/illustration";
import { SectionTitle } from "./_components/section-title";
import { ValueCard } from "./_components/value-card";

export const metadata = {
	title: "Sobre nós • PETI",
	description: "Conheça a missão, visão e valores do PETI e como conectamos pets e pessoas.",
};

export default function SobreNosPage() {
	return (
		<div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
			<SectionTitle
				overline="Sobre nós"
				title="Conectando pets e pessoas com"
				highlight="cuidado"
				description="Nossa missão é simplificar a vida de tutores e profissionais, oferecendo uma plataforma confiável para encontrar, comparar e agendar os melhores serviços para seus companheiros."
			/>

			<section className="mt-14 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
				<div>
					<p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
						O PETI nasceu da paixão por animais e do desejo de tornar mais fácil a conexão entre
						tutores e serviços de qualidade. Começamos como uma pequena equipe determinada a
						construir uma experiência simples, transparente e acolhedora.
					</p>
					<p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
						Hoje, nossa comunidade cresce com profissionais comprometidos e tutores que confiam na
						plataforma para cuidar melhor de quem faz parte da família.
					</p>

					<div className="mt-6 flex flex-wrap items-center gap-3">
						<Link
							href="/contato"
							className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							aria-label="Fale com nosso time"
							tabIndex={0}
						>
							Fale com a gente
						</Link>
						<span className="text-sm text-muted-foreground">ou saiba mais abaixo</span>
					</div>
				</div>

				<Illustration />
			</section>

			<section className="mt-16">
				<h2 className="text-2xl font-bold text-foreground sm:text-3xl">
					Nossa missão, visão e valores
				</h2>
				<p className="mt-2 max-w-3xl text-sm text-muted-foreground">
					Estes são os princípios que guiam nossas decisões e a experiência que criamos para a
					comunidade.
				</p>

				<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<ValueCard title="Missão" icon={<span aria-hidden>🐾</span>}>
						Conectar tutores aos melhores serviços de cuidados, garantindo que cada pet receba o
						acolhimento e a atenção que merece.
					</ValueCard>
					<ValueCard title="Visão" icon={<span aria-hidden>👀</span>}>
						Ser a plataforma referência em agendamento de serviços pet, unindo qualidade, confiança
						e tecnologia simples.
					</ValueCard>
					<ValueCard title="Valores" icon={<span aria-hidden>✨</span>}>
						Bem‑estar animal, empatia, transparência, melhoria contínua e a construção de uma
						comunidade segura e engajada.
					</ValueCard>
				</div>
			</section>
		</div>
	);
}
