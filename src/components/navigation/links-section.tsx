"use client";

import { usePathname } from "next/navigation";
import { SearchBar } from "@/components/search-bar";
import { BASE_ROUTES } from "@/constants/base-routes";
import { NavLink } from "./nav-link";

const notShowSearchBar = ["/", "/about", "/contact", "/cotacao"];

export function LinksSection() {
	const pathname = usePathname();
	const isNotShowSearchBar = notShowSearchBar.includes(pathname);
	const availableRoutes = BASE_ROUTES.filter(
		(route) => !["/about", "/contact"].includes(route.href),
	);

	if (isNotShowSearchBar) {
		return (
			<nav className="w-full flex items-center gap-4">
				{availableRoutes.map((route) => (
					<NavLink
						key={route.href as string}
						href={route.href}
						isActive={pathname === route.href}
					>
						{route.label}
					</NavLink>
				))}
			</nav>
		);
	}

	return <SearchBar />;
}
