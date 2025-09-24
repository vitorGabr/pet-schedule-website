"use client";

import { usePathname } from "next/navigation";
import { AUTH_ROUTES } from "@/constants/base-routes";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavLink } from "./nav-link";

export function AuthenticatedLinks() {
	const pathname = usePathname();
	const isMobile = useIsMobile();

	if (isMobile) return null;

	return (
		<div className="flex items-center gap-4">
			{AUTH_ROUTES.map((route) => (
				<NavLink
					key={route.href}
					href={route.href}
					isActive={pathname === route.href}
				>
					{route.label}
				</NavLink>
			))}
		</div>
	);
}
