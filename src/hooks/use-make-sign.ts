"use client";

import { ptBR } from "@clerk/localizations/pt-BR";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { parseAsString, useQueryState } from "nuqs";
import { toast } from "sonner";
import { SignInFormData } from "@/schemas/sign-in";
import { SignUpFormData } from "@/schemas/sign-up";

const errosDict = ptBR?.unstable__errors;
export const useMakeSign = () => {
	const [redirectUrl] = useQueryState("redirect_url", parseAsString);
	const [authMode, setAuthMode] = useQueryState("auth");
	const { setActive, signUp } = useSignUp();
	const { signIn, setActive: setActiveSignIn } = useSignIn();

	const onSignUp = async (form: SignUpFormData) => {
		try {
			const [firstName, ...lastNameParts] = form.name.trim().split(" ");
			const lastName = lastNameParts.join(" ") || undefined;
			const response = await signUp?.create({
				firstName,
				lastName,
				emailAddress: form.email,
				password: form.password,
			});
			if (response?.status === "complete") {
				await setActive?.({
					session: response.createdSessionId,
					redirectUrl: redirectUrl || undefined,
				});
				setAuthMode(null);
			}
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				const code = error.errors[0]?.code;
				const message = getErrorMessage(code);
				toast.error(message);
			}
		}
	};

	const onSignIn = async (form: SignInFormData) => {
		try {
			const response = await signIn?.create({
				identifier: form.email,
				password: form.password,
			});
			if (response?.status === "complete") {
				await setActiveSignIn?.({
					session: response.createdSessionId,
					redirectUrl: redirectUrl || undefined,
				});
				setAuthMode(null);
			}
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				const code = error.errors[0]?.code;
				const message = getErrorMessage(code);
				toast.error(message);
			}
		}
	};

	function getErrorMessage(code: string) {
		let msg = "Ocorreu um erro ao fazer login. Por favor, tente novamente.";
		if (errosDict) {
			const getErrorFromDict = errosDict[code as keyof typeof errosDict];
			if (typeof getErrorFromDict === "string") {
				msg = getErrorFromDict;
			}
		}
		return msg;
	}

	function handleAuthMode(mode: "signin" | "signup" | null) {
		setAuthMode(mode);
	}

	return { onSignUp, onSignIn, authMode, handleAuthMode };
};
