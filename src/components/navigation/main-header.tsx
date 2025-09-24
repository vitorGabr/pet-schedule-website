import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { AuthSection } from "@/components/auth/auth-section";
import { Await } from "@/components/await";
import { LinksSection } from "@/components/navigation/links-section";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import Logo from "@/images/logo.png";
import { verifySession } from "@/lib/auth/verify-session";
import { getCookie } from "@/utils/cookie";

export async function MainHeader() {
	const isAuthenticed = await getCookie("token");

	return (
		<header className="bg-background flex items-center justify-between border-b border-solid px-4 md:px-10">
			<div className="flex items-center gap-3 md:gap-10 w-full py-3 md:py-0">
				<MobileMenu auth={!!isAuthenticed} />
				<Link href="/" className="h-10">
					<Image src={Logo} alt="Logo" width={70} height={70} />
				</Link>
				<div className="hidden md:block w-full">
					<LinksSection auth={!!isAuthenticed} />
				</div>
			</div>
			<Await promise={verifySession()} fallback={<Skeleton className="w-10 h-10 rounded-full" />}>
				{(data) => <AuthSection user={data} />}
			</Await>
		</header>
	);
}
