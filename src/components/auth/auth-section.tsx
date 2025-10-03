"use client";

import { User } from "lucide-react";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/user-menu";
import type { SessionResponseDtoOutput } from "@/lib/http";
import { NotificationMenu } from "../notification-menu";

interface AuthSectionProps {
	user?: SessionResponseDtoOutput | null;
}

export const AuthSection = ({ user }: AuthSectionProps) => {
	const [_, setAuthMode] = useQueryState(
		"auth",
		parseAsStringLiteral(["signin", "signup"]),
	);

	if (user) {
		return (
			<div className="flex items-center gap-4">
				<NotificationMenu subscriberId={user.id} />
				<UserMenu name={user.name} email={user.email} avatar={user.avatar} />
			</div>
		);
	}

	return (
		<div className="flex items-center gap-4">
			<Button
				variant="outline"
				className="flex items-center gap-2 px-4 py-2 rounded-full"
				onClick={() => setAuthMode("signin")}
			>
				<User className="h-4 w-4" />
				<span>Entrar</span>
			</Button>
			<Button
				className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
				onClick={() => setAuthMode("signup")}
			>
				<User className="h-4 w-4" />
				<span>Criar conta</span>
			</Button>
		</div>
	);
};
