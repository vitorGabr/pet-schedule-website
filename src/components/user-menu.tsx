import { Calendar1Icon, LogOutIcon, PawPrintIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeCookie } from "@/utils/cookie";

type UserMenuProps = { name: string; email: string; avatar?: string };

export function UserMenu({ name, email, avatar }: UserMenuProps) {
	const router = useRouter();
	const handleLogout = async () => {
		await removeCookie("token");
		router.push("/");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
					<Avatar className="size-10 border">
						<AvatarImage src={avatar} alt="Profile image" />
						<AvatarFallback>{name.charAt(0)}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-64" align="end">
				<DropdownMenuLabel className="flex min-w-0 flex-col">
					<span className="text-foreground truncate text-sm font-medium">
						{name}
					</span>
					<span className="text-muted-foreground truncate text-xs font-normal">
						{email}
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/appointments">
						<Calendar1Icon
							size={16}
							className="opacity-60"
							aria-hidden="true"
						/>
						<span>Agendamentos</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/pets">
						<PawPrintIcon size={16} className="opacity-60" aria-hidden="true" />
						<span>Pets</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					<LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
