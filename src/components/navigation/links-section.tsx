"use client";

import { usePathname } from "next/navigation";
import { BASE_ROUTES } from "@/constants/base-routes";
import { NavLink } from "./nav-link";

export function LinksSection() {
	const pathname = usePathname();

	if(!pathname) return null;

	return (
		<nav className="hidden md:flex flex-1 items-center justify-center gap-4">
			{BASE_ROUTES.map((route) => (
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
