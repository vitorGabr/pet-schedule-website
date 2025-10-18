import "./global.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { SignInModal } from "@/components/auth/sign-in";
import { SignUpModal } from "@/components/auth/sign-up";
import { Suspense } from "react";

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
		<html lang="pt-BR">
			<body className={`${spaceGrotesk.variable} font-sans antialiased`}>
				<Providers>
					<div className="relative flex size-full min-h-screen flex-col bg-[#f8fbfa] group/design-root">
						{children}
						<Footer />
						<Toaster />
						<SpeedInsights />
						<Analytics />
						<Suspense>
							<SignInModal />
							<SignUpModal />
						</Suspense>
					</div>
				</Providers>
			</body>
		</html>
	);
}
