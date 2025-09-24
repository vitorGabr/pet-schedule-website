"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

type MobileMenuProps = { auth: boolean; variant?: "full" | "essential" };
type MenuLink = { href: string; label: string; requiresAuth?: boolean };

const buildLinks = (auth: boolean, variant: "full" | "essential"): MenuLink[] => {
	const base: MenuLink[] = [
		{ href: "/", label: "Início" },
		{ href: "/s", label: "Pesquisa" },
		{ href: "/about", label: "Sobre nós" },
		{ href: "/contact", label: "Contato" },
	];

	if (auth) {
		const essentials: MenuLink[] = [
			{ href: "/appointments", label: "Meus Agendamentos", requiresAuth: true },
			{ href: "/pets", label: "Meus Pets", requiresAuth: true },
		];
		if (variant === "essential") {
			return essentials;
		}
		base.splice(2, 0, ...essentials);
	}

	return base;
};

export const MobileMenu = ({ auth, variant = "full" }: MobileMenuProps) => {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const pathname = usePathname();
	const menuId = useId();

	const handleToggle = () => setOpen((prev) => !prev);

	const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleToggle();
		}
		if (e.key === "Escape") {
			setOpen(false);
		}
	};

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

	const links = buildLinks(auth, variant);

	return (
		<div className="relative md:hidden">
			<button
				ref={buttonRef}
				type="button"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={menuId}
				onClick={handleToggle}
				onKeyDown={handleKeyDown}
				className="text-foreground inline-flex items-center justify-center rounded-full p-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<span className="sr-only">Abrir menu</span>
				<svg
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
					<path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
					<path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				</svg>
			</button>

			{open && (
				<div
					ref={menuRef}
					id={menuId}
					role="menu"
					className="bg-popover absolute left-0 z-50 mt-2 w-56 rounded-xl border p-2 shadow-md"
				>
					{links.map((link) => {
						const isActive = pathname === link.href;
						return (
							<Link
								key={link.href}
								href={link.href as any}
								className={[
									"block rounded-md px-3 py-2 text-sm",
									isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent",
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
