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
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
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
					<span className="text-foreground truncate text-sm font-medium">{name}</span>
					<span className="text-muted-foreground truncate text-xs font-normal">{email}</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{/* <DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href="/profile">
							<UserCircle size={16} className="opacity-60" aria-hidden="true" />
							<span>Minha Conta</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup> */}
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					<LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
