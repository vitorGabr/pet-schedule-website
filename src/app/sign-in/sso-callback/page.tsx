import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { Spinner } from "@/components/ui/spinner";
export default function Page() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<AuthenticateWithRedirectCallback
				signInFallbackRedirectUrl={"/"}
				signInForceRedirectUrl={"/"}
			/>
			<Spinner />
		</div>
	);
}
