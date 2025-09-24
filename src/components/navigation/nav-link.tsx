import Link from "next/link";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function NavLink({
	href,
	children,
	isActive,
}: {
	href: ComponentProps<typeof Link>["href"];
	children: React.ReactNode;
	isActive: boolean;
}) {
	return (
		<Link
			href={href}
			className={"group text-foreground font-medium text-sm py-3"}
		>
			<div
				data-status={isActive}
				className={cn(
					"px-4 py-1 rounded-full not-[data-status=true]:group-hover:bg-muted",
					"data-[status=true]:bg-primary data-[status=true]:text-primary-foreground",
				)}
			>
				{children}
			</div>
		</Link>
	);
}
