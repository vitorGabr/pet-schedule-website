import Image from "next/image";
import Link from "next/link";
import { AuthSection } from "@/components/auth-section";
import { LinksSection } from "@/components/navigation/links-section";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import Logo from "@/images/logo.svg";

export function MainHeader() {
	return (
		<header className="bg-background flex items-center justify-between border-b border-solid px-4 md:px-10 min-h-16">
			<MobileMenu />
			<Link href="/" className="h-10 flex items-center justify-center">
				<Image src={Logo} alt="Logo" width={100} />
			</Link>
			<LinksSection />
			<AuthSection />
		</header>
	);
}
