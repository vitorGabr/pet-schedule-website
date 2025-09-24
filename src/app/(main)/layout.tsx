import { Suspense } from "react";
import { SignInModal } from "@/components/auth/sign-in";
import { SignUpModal } from "@/components/auth/sign-up";

export default function MainLayout({ children }: LayoutProps<"/">) {
	return (
		<div>
			{children}
			<Suspense>
				<SignInModal />
				<SignUpModal />
			</Suspense>
		</div>
	);
}
