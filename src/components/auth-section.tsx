import {
  CalendarIcon,
  ChevronDownIcon,
  LogOutIcon,
  PawPrintIcon,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
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
import SignButtons from "./sign-buttons";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { SignOutButton } from "@clerk/nextjs";

export function AuthSection() {
  return (
    <Suspense fallback={<Skeleton className="size-10 rounded-full" />}>
      <Content />
    </Suspense>
  );
}

async function Content() {
  "use cache: private";
  const user = await currentUser();

  if (!user) {
    return <SignButtons />;
  }

  return (
    <div className="flex items-center gap-4">
      <NotificationMenu />
      <DropdownMenu>
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
          <SignOutButton>
            <DropdownMenuItem>
              <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Sair</span>
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
