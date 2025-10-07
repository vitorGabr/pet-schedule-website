import { Search } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import Banner from "@/images/hero-banner-2.webp";

export function HeroSection() {
	return (
		<div className="relative flex h-[70dvh] md:h-[90dvh] w-full flex-col items-center justify-center">
			<Image
				src={Banner}
				alt="Pets background"
				fill
				priority
				className="object-cover"
			/>

			<div className="relative w-full h-full inset-0 bg-gradient-to-b from-primary/40 to-primary/60 flex justify-center items-center flex-col">
				<div className="flex flex-col gap-6 text-center max-w-4xl px-4">
					<h1 className="text-white text-3xl md:text-5xl font-bold">
						Encontre os melhores serviços para pets perto de você
					</h1>
					<p className="text-white/90 text-base md:text-lg font-normal leading-normal">
						Conecte-se com os melhores cuidadores de animais de estimação para
						tosa, hospedagem, passeios e muito mais. Agende horários facilmente
						e gerencie a agenda do seu pet, tudo em um só lugar.
					</p>
				</div>

				<form
					className="mt-5 flex w-[90%] max-w-2xl items-center rounded-full bg-white"
					action="/s"
				>
					<InputGroup className="h-16 w-full min-w-0 flex-1 rounded-full">
						<InputGroupInput
							name="q"
							placeholder="Pesquise por serviços, empresas ou locais"
						/>
						<InputGroupAddon>
							<Search className="size-5" />
						</InputGroupAddon>
						<InputGroupAddon align="inline-end">
							<Button className="flex h-12 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full px-6 text-base font-bold leading-normal tracking-[0.015em]">
								<span className="truncate">Pesquisar</span>
							</Button>
						</InputGroupAddon>
					</InputGroup>
				</form>
			</div>
		</div>
	);
}
