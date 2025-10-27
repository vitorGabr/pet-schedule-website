"use client";

import { useSignIn, useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";
import { SIGN_FORM_ERRORS } from "@/constants/sign-form-errors";
import { SignInFormData } from "@/schemas/sign-in";
import { SignUpFormData } from "@/schemas/sign-up";

export const useMakeSign = () => {
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
				await setActive?.({ session: response.createdSessionId });
			}
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				const code = error.errors[0]?.code;
				const message =
					SIGN_FORM_ERRORS[code as keyof typeof SIGN_FORM_ERRORS] ||
					"Ocorreu um erro ao criar a conta. Por favor, tente novamente.";
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
				await setActiveSignIn?.({ session: response.createdSessionId });
			}
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				const code = error.errors[0]?.code;
				const message =
					SIGN_FORM_ERRORS[code as keyof typeof SIGN_FORM_ERRORS] ||
					"Ocorreu um erro ao criar a conta. Por favor, tente novamente.";
				toast.error(message);
			}
		}
	};

	return { onSignUp, onSignIn };
};
