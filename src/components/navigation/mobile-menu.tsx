"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BASE_ROUTES } from "@/constants/base-routes";

export const MobileMenu = () => {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const menuId = useId();

	const handleToggle = () => setOpen((prev) => !prev);

	useEffect(() => {
		if (!open) return;
		const onClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (
				menuRef.current &&
				!menuRef.current.contains(target) &&
				buttonRef.current &&
				!buttonRef.current.contains(target)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", onClickOutside);
		return () => document.removeEventListener("mousedown", onClickOutside);
	}, [open]);

	return (
		<div className="relative md:hidden">
			<button
				ref={buttonRef}
				type="button"
				aria-haspopup="menu"
				aria-expanded={open}
				onClick={handleToggle}
				className="text-foreground inline-flex items-center justify-center rounded-full p-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<MenuIcon />
			</button>

			{open && (
				<div
					ref={menuRef}
					id={menuId}
					role="menu"
					className="bg-popover absolute left-0 z-50 mt-2 w-56 rounded-xl border p-2 shadow-md"
				>
					{[...BASE_ROUTES].map((link) => {
						const isActive = pathname === link.href;
						return (
							<Link
								key={link.href}
								href={link.href as any}
								className={[
									"block rounded-md px-3 py-2 text-sm",
									isActive
										? "bg-primary text-primary-foreground"
										: "hover:bg-accent",
								].join(" ")}
								tabIndex={0}
								aria-label={link.label}
								onClick={() => setOpen(false)}
								onKeyDown={(e) => {
									if (e.key === "Enter") setOpen(false);
								}}
							>
								{link.label}
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
};
