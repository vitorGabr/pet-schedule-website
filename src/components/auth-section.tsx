"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import {
	CalendarIcon,
	ChevronDownIcon,
	LogOutIcon,
	PawPrintIcon,
	User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { parseAsStringLiteral as parse, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NotificationMenu } from "./notification-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

export const AuthSection = () => {
	const pathname = usePathname();
	const [openUserMenu, setOpenUserMenu] = useState(false);
	const [_, setAuthMode] = useQueryState("auth", parse(["signin", "signup"]));
	const { isSignedIn, signOut, isLoaded } = useAuth();
	const { user } = useUser();

	useEffect(() => {
		setOpenUserMenu(false);
	}, [pathname]);

	if (!isLoaded) {
		return <Skeleton className="h-10 w-32 rounded-full" />;
	}

	if (!isSignedIn) {
		return (
			<div className="flex items-center gap-4">
				<Button
					variant="outline"
					className="flex items-center gap-2 px-4 py-2 rounded-full"
					onClick={() => setAuthMode("signin")}
				>
					<UserIcon className="h-4 w-4" />
					Entrar
				</Button>
				<Button
					className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
					onClick={() => setAuthMode("signup")}
				>
					<UserIcon className="h-4 w-4" />
					Criar conta
				</Button>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-4">
			<NotificationMenu />
			<DropdownMenu open={openUserMenu} onOpenChange={setOpenUserMenu}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
						<Avatar>
							<AvatarImage
								src={user?.imageUrl}
								alt={user?.firstName ?? "User Avatar"}
							/>
							<AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
						</Avatar>
						<ChevronDownIcon
							size={16}
							className="opacity-60"
							aria-hidden="true"
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel className="flex min-w-0 flex-col">
						<span className="truncate text-sm font-medium text-foreground">
							{user?.firstName} {user?.lastName}
						</span>
						<span className="truncate text-xs font-normal text-muted-foreground">
							{user?.primaryEmailAddress?.emailAddress}
						</span>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link href="/appointments">
								<CalendarIcon
									size={16}
									className="opacity-60"
									aria-hidden="true"
								/>
								<span>Agendamentos</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/pets">
								<PawPrintIcon
									size={16}
									className="opacity-60"
									aria-hidden="true"
								/>
								<span>Meus Pets</span>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => signOut()}>
						<LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
						<span>Sair</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
