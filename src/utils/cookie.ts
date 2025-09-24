"use server";

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const getCookie = async (name: string): Promise<string | undefined> => {
	const value = (await cookies()).get(name)?.value;
	return value;
};

export const setCookie = async (
	...args:
		| [key: string, value: string, cookie?: Partial<ResponseCookie>]
		| [options: ResponseCookie]
) => {
	(await cookies()).set(...args);
};

export const removeCookie = async (name: string) => {
	(await cookies()).delete(name);
};
