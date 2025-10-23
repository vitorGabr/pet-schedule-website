'use client';

import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";
import { Calendar1Icon, PawPrintIcon, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationMenu } from "./notification-menu";

export const AuthSection = () => {
	return (
		<>
			<SignedIn>
				<div className="flex items-center gap-4">
					<NotificationMenu />
					<UserButton>
						<UserButton.MenuItems>
							<UserButton.Link
								label="Agendamentos"
								labelIcon={<Calendar1Icon className="size-4" />}
								href="/appointments"
							/>
							<UserButton.Link
								label="Meus Pets"
								labelIcon={<PawPrintIcon className="size-4" />}
								href="/pets"
							/>
						</UserButton.MenuItems>
					</UserButton>
				</div>
			</SignedIn>
			<SignedOut>
				<div className="flex items-center gap-4">
					<SignInButton mode="modal">
						<Button
							variant="outline"
							className="flex items-center gap-2 px-4 py-2 rounded-full"
						>
							<UserIcon className="h-4 w-4" />
							Entrar
						</Button>
					</SignInButton>
					<SignUpButton mode="modal">
						<Button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
							<UserIcon className="h-4 w-4" />
							Criar conta
						</Button>
					</SignUpButton>
				</div>
			</SignedOut>
		</>
	);
};
