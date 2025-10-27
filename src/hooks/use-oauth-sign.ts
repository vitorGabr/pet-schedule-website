import { useSignIn } from "@clerk/nextjs";

export const useOAuthSign = () => {
	const { signIn, isLoaded } = useSignIn();

	const signInWithGoogle = async () => {
		if (!isLoaded) {
			return;
		}

		try {
			await signIn.authenticateWithRedirect({
				strategy: "oauth_google",
				redirectUrl: "/sign-in/sso-callback",
				redirectUrlComplete: "/",
			});
		} catch (err) {
			console.error("Erro ao fazer login com Google:", err);
		}
	};

	return { signInWithGoogle };
};
