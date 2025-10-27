import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
			<AuthenticateWithRedirectCallback />
			<div id="clerk-captcha" />
		</div>
	);
}
