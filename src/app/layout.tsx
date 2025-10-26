import "./global.css";
import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
<<<<<<< HEAD
import { Suspense } from "react";
=======
>>>>>>> f3fe5d04d0a27156c00ee30b370f95b3c066c47c

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | PETI",
		default: "PETI - Encontre os melhores serviços para pets",
	},
	description:
		"Conecte-se com os melhores cuidadores de animais de estimação para tosa, hospedagem, passeios e muito mais.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
<<<<<<< HEAD
		<ClerkProvider
			localization={ptBR}
			appearance={{
				variables: {
					colorPrimary: "var(--primary)",
					colorForeground: "var(--foreground)",
					colorBackground: "var(--background)",
				},
				elements: {
					formButtonPrimary: "bg-slate-500 hover:bg-slate-400 text-sm",
				},
			}}
		>
			<html lang="pt-BR">
				<body className={`${spaceGrotesk.variable} font-sans antialiased`}>
					<Suspense>
						<Providers>
							<div className="relative flex size-full min-h-screen flex-col bg-[#f8fbfa] group/design-root">
								{children}
								<Footer />
								<Toaster />
								<SpeedInsights />
								<Analytics />
							</div>
						</Providers>
					</Suspense>
				</body>
			</html>
		</ClerkProvider>
=======
		<html lang="pt-BR">
			<body className={`${spaceGrotesk.variable} font-sans antialiased`}>
				<Suspense>
					<Providers>
						<div className="relative flex size-full min-h-screen flex-col bg-[#f8fbfa] group/design-root">
							{children}
							<Footer />
							<Toaster />
							<SpeedInsights />
							<Analytics />
						</div>
					</Providers>
				</Suspense>
			</body>
		</html>
>>>>>>> f3fe5d04d0a27156c00ee30b370f95b3c066c47c
	);
}
