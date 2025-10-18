import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/images/logo.svg";
import { verifySession } from "@/lib/auth/verify-session";

export async function AppHeader() {
	const auth = await verifySession();

	return (
		<header className="flex items-center justify-between whitespace-nowrap px-6 py-4 bg-muted border-b border-primary/10">
			<div className="flex items-center gap-6">
				<Link href="/" className="h-10 flex items-center justify-center">
					<Image src={Logo} alt="Logo" width={100}/>
				</Link>
				<nav className="flex items-center gap-6 text-sm text-primary font-medium">
					<Link href="/pets">Meus Pets</Link>
					<Link href="/appointments">Agendamentos</Link>
					<Link href="/s">Buscar Serviços</Link>
					<Link href="/profile">Minha Conta</Link>
				</nav>
			</div>
			<div className="flex items-center gap-4">
				<button
					type="button"
					className="p-2 hover:bg-primary/10 rounded-full transition-colors"
				>
					<Bell className="w-5 h-5 text-primary" />
				</button>
				<div className="flex items-center gap-3">
					<Avatar className="size-10 border">
						<AvatarImage src={auth?.avatar} />
						<AvatarFallback>{auth?.name?.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<span className="text-sm font-bold text-primary">{auth?.name}</span>
						<span className="text-xs text-primary/70">{auth?.email}</span>
					</div>
				</div>
			</div>
		</header>
	);
}
