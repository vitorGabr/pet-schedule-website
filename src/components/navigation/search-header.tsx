import Image from "next/image";
import Link from "next/link";
import { AuthSection } from "@/components/auth-section";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import Logo from "@/images/logo.svg";
import { SearchBar } from "../search-bar";

export function SearchHeader() {
	return (
		<header className="bg-background flex flex-col md:flex-row w-full">
			<div className="flex items-center justify-between w-full border-b border-solid px-4 md:px-10 py-3 md:py-0">
				<MobileMenu />
				<Link href="/">
					<Image src={Logo} alt="Logo" width={100} className="cursor-pointer" />
				</Link>
				<div className="flex-1 hidden md:flex">
					<SearchBar />
				</div>
				<AuthSection location="search" />
			</div>
			<div className="w-full md:hidden py-2 border-b">
				<SearchBar />
			</div>
		</header>
	);
}
