import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AuthSection } from "@/components/auth/auth-section";
import { Await } from "@/components/await";
import { LinksSection } from "@/components/navigation/links-section";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Logo from "@/images/logo.png";
import { verifySession } from "@/lib/auth/verify-session";
import { AuthenticatedLinks } from "./authenticated-links";

export function MainHeader() {
	return (
		<header className="bg-background flex items-center justify-between border-b border-solid px-4 md:px-10">
			<div className="flex items-center gap-3 md:gap-10 w-full py-3 md:py-0">
				<Suspense>
					<MobileMenu />
				</Suspense>
				<Link href="/" className="h-10">
					<Image src={Logo} alt="Logo" width={70} height={70} />
				</Link>
				<Suspense>
					<div className="hidden md:block w-full">
						<LinksSection />
					</div>
				</Suspense>
			</div>
			<Await
				promise={verifySession()}
				fallback={<Skeleton className="w-10 h-10 rounded-full" />}
			>
				{(data) => (
					<div className="flex gap-4">
						{data && <AuthenticatedLinks />}
						<AuthSection user={data} />
					</div>
				)}
			</Await>
		</header>
	);
}
