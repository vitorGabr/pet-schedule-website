import Axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { getCookie } from "@/utils/cookie";
import { signOutUser } from "@/utils/sign-out";

export const AXIOS_INSTANCE = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

AXIOS_INSTANCE.interceptors.request.use(async (config) => {
	const token = await getCookie("__session");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

AXIOS_INSTANCE.interceptors.response.use(
	(response) => response,
	async (error) => {
		const status = error.response?.status;
		if ([401, 403].includes(status)) {
			console.log(status, error);
			console.log("Sessão expirada. Saindo...");
			await signOutUser();
		}
		throw error;
	},
);

export const customFetch = <T>(
	config: AxiosRequestConfig,
	options?: AxiosRequestConfig,
): Promise<T> => {
	const source = Axios.CancelToken.source();
	const promise = AXIOS_INSTANCE({
		...config,
		...options,
		cancelToken: source.token,
	}).then(({ data }) => data);

	// @ts-expect-error
	promise.cancel = () => {
		source.cancel("Query was cancelled");
	};

	return promise;
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
