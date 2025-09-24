import "./global.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Noto_Sans, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { HeaderFallback } from "@/components/header-fallback";
import { MainHeader } from "@/components/navigation/main-header";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

const notoSans = Noto_Sans({
	variable: "--font-noto-sans",
	subsets: ["latin"],
	weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
	title: { template: "%s | PETI", default: "PETI - Encontre os melhores serviços para pets" },
	description:
		"Conecte-se com os melhores cuidadores de animais de estimação para tosa, hospedagem, passeios e muito mais.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="pt-BR">
			<body className={`${spaceGrotesk.variable} ${notoSans.variable} font-sans antialiased`}>
				<Providers>
					<div className="relative flex size-full min-h-screen flex-col bg-[#f8fbfa] group/design-root">
						<Suspense fallback={<HeaderFallback />}>
							<MainHeader />
						</Suspense>
						<main>{children}</main>
						<Footer />
					</div>
				</Providers>
				<Toaster />
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
