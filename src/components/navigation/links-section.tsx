"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { SearchBar } from "@/components/search-bar";

const notShowSearchBar = ["/", "/about", "/contact", "/cotacao"];

export function LinksSection({ auth }: { auth: boolean }) {
	const pathname = usePathname();
	const isNotShowSearchBar = notShowSearchBar.includes(pathname);

	return (
		<nav className="w-full flex items-center gap-4">
			{isNotShowSearchBar && (
				<>
					<LinkItem href="/" isActive={pathname === "/"}>
						Início
					</LinkItem>
					<LinkItem href={{ pathname: "/s" }} isActive={pathname.startsWith("/s")}>
						Pesquisa
					</LinkItem>
					<LinkItem href="/cotacao" isActive={pathname === "/cotacao"}>
						Para Empresas
					</LinkItem>
				</>
			)}
			{!isNotShowSearchBar && <SearchBar />}
			{auth && <AccountLinks pathname={pathname} />}
		</nav>
	);
}

function AccountLinks({ pathname }: { pathname: string }) {
	return (
		<>
			<LinkItem href="/appointments" isActive={pathname === "/appointments"}>
				Meus Agendamentos
			</LinkItem>
			<LinkItem href="/pets" isActive={pathname === "/pets"}>
				Meus Pets
			</LinkItem>
		</>
	);
}

function LinkItem({
	href,
	children,
	isActive,
}: {
	href: ComponentProps<typeof Link>["href"];
	children: React.ReactNode;
	isActive: boolean;
}) {
	return (
		<Link href={href} className={"group text-foreground font-medium text-sm py-3"}>
			<div
				data-status={isActive}
				className={cn(
					"px-4 py-1 rounded-full not-[data-status=true]:group-hover:bg-muted",
					"data-[status=true]:bg-primary data-[status=true]:text-primary-foreground",
				)}
			>
				{children}
			</div>
		</Link>
	);
}
