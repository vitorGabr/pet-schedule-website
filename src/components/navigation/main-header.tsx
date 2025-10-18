import Image from "next/image";
import Link from "next/link";
import { AuthSection } from "@/components/auth/auth-section";
import { Await } from "@/components/await";
import { LinksSection } from "@/components/navigation/links-section";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Logo from "@/images/logo.svg";
import { verifySession } from "@/lib/auth/verify-session";

export function MainHeader() {
	return (
		<header className="bg-background flex items-center justify-between border-b border-solid px-4 md:px-10 min-h-16">
			<MobileMenu />
			<Link href="/" className="h-10 flex items-center justify-center">
				<Image src={Logo} alt="Logo" width={100} />
			</Link>
			<LinksSection />
			<Await
				promise={verifySession()}
				fallback={<Skeleton className="w-10 h-10 rounded-full" />}
			>
				{(data) => <AuthSection user={data} />}
			</Await>
		</header>
	);
}
