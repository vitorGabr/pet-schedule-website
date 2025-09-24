import { getGetSessionQueryKey, type SignInRequestDto, signIn } from "@/lib/http";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { setCookie } from "@/utils/cookie";
import { revalidateCache } from "@/utils/revalidate";

type Props = { onSuccess?: () => void };

export const useMakeSignIn = ({ onSuccess }: Props) => {
	const queryClient = useQueryClient();

	const makeSignIn = async (data: SignInRequestDto) => {
		try {
			const response = await signIn(data);
			setCookie("token", response.accessToken, { path: "/", maxAge: 60 * 60 * 24 * 30 });

			await Promise.all([
				queryClient.setQueryData(getGetSessionQueryKey(), data),
				revalidateCache({ type: "tag", tags: getGetSessionQueryKey() }),
			]);

			toast.success("Login realizado com sucesso");
			onSuccess?.();
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				toast.error(error.response?.data?.message ?? "Ocorreu um erro ao fazer o login");
			}
		}
	};

	return { execute: makeSignIn };
};
