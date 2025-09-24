"use server";

import type { Route } from "next";
import { redirect } from "next/navigation";

/**
 * Redirect to the given URL.
 * @param url - The URL to redirect to.
 */
export const redirectTo = async (url: Route<string>) => {
	await redirect(url);
};
