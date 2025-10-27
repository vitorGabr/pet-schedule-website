import Axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { getCookie } from "@/utils/cookie";

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
	async (err) => {
		const url = err.config?.url;
		const status = err.response?.status;
		console.error(`Error on request to ${url}: Status ${status}`);

		if (err.response) {
			console.error("AXIOS RESPONSE ERROR:", {
				status: err.response.status,
				headers: err.response.headers,
				data: err.response.data,
				url: err.config?.url,
				method: err.config?.method,
			});
		} else {
			console.error("AXIOS ERROR (no response):", err.message, err);
		}
		throw err;
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
