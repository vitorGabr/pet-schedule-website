import Image from "next/image";
import Link from "next/link";
import { AuthSection } from "@/components/auth/auth-section";
import { Await } from "@/components/await";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Logo from "@/images/logo.svg";
import { verifySession } from "@/lib/auth/verify-session";
import { SearchBar } from "../search-bar";

export function SearchHeader() {
	return (
		<header className="bg-background flex flex-col md:flex-row w-full">
			<div className="flex items-center justify-between w-full border-b border-solid px-4 md:px-10 py-3 md:py-0">
				<MobileMenu />
				<Link href="/" className="h-10 flex items-center justify-center">
					<Image src={Logo} alt="Logo" width={100} />
				</Link>
				<div className="flex-1 hidden md:flex">
					<SearchBar />
				</div>
				<Await
					promise={verifySession()}
					fallback={<Skeleton className="w-10 h-10 rounded-full" />}
				>
					{(data) => <AuthSection user={data} />}
				</Await>
			</div>
			<div className="w-full md:hidden py-2 border-b">
				<SearchBar />
			</div>
		</header>
	);
}
