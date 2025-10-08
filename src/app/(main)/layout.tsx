import { Suspense } from "react";
import { SignInModal } from "@/components/auth/sign-in";
import { SignUpModal } from "@/components/auth/sign-up";
import { MainHeader } from "@/components/navigation/main-header";

export default function MainLayout({ children }: LayoutProps<"/">) {
	return (
		<div>
			<MainHeader />
			<main>{children}</main>
			<Suspense>
				<SignInModal />
				<SignUpModal />
			</Suspense>
		</div>
	);
}
