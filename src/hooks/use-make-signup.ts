import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import posthog from "posthog-js";
import { toast } from "sonner";
import {
	getGetSessionQueryKey,
	type SignUpRequestDto,
	signIn,
	signUp,
} from "@/lib/http";
import { setCookie } from "@/utils/cookie";
import { revalidateCache } from "@/utils/revalidate";

type Props = { onSuccess?: () => void };

export const useMakeSignUp = ({ onSuccess }: Props) => {
	const queryClient = useQueryClient();

	const makeSignUp = async (data: SignUpRequestDto) => {
		try {
			await signUp(data);
			const response = await signIn({
				email: data.email,
				password: data.password,
			});
			await Promise.all([
				setCookie("token", response.accessToken, {
					path: "/",
					maxAge: 60 * 60 * 24 * 30,
				}),
				queryClient.setQueryData(getGetSessionQueryKey(), response),
				revalidateCache({ type: "tag", tags: getGetSessionQueryKey() }),
			]);

			toast.success("Conta criada com sucesso");
			onSuccess?.();
			posthog.identify(response.id, {
				email: response.email,
				name: response.name,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(
					error.response?.data?.message ??
						"Ocorreu um erro ao fazer o cadastro",
				);
			}
		}
	};

	return { execute: makeSignUp };
};
