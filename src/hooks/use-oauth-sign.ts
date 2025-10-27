import { useSignIn } from "@clerk/nextjs";
import { toast } from "sonner";

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
			toast.error("Erro ao fazer login com Google. Tente novamente.");
		}
	};

	return { signInWithGoogle };
};
