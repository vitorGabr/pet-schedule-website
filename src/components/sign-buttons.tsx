"use client";

import { UserIcon } from "lucide-react";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { Button } from "./ui/button";

export default function SignButtons() {
	const [_, setAuthMode] = useQueryState(
		"auth",
		parseAsStringLiteral(["signin", "signup"]),
	);

	return (
		<>
			<div className="items-center gap-4 hidden lg:flex">
				<Button
					variant="outline"
					className="flex items-center gap-2 px-4 py-2 rounded-full"
					onClick={() => setAuthMode("signin")}
				>
					<UserIcon />
					Entrar
				</Button>
				<Button
					className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
					onClick={() => setAuthMode("signup")}
				>
					<UserIcon />
					Criar conta
				</Button>
			</div>
			<Button
				variant="ghost"
				className="px-1 rounded-full block lg:hidden"
				onClick={() => setAuthMode("signin")}
			>
				<UserIcon className="size-4" />
			</Button>
		</>
	);
}
