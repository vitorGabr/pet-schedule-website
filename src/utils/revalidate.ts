"use server";
import type { Route } from "next";
import { revalidatePath, revalidateTag } from "next/cache";

type Props =
	| { type: "tag"; tags: readonly string[] }
	| { type: "path"; path: Route<string>; mode?: "layout" | "page" };

export const revalidateCache = async (props: Props) => {
	if (props.type === "tag") {
		await Promise.all(props.tags.map(revalidateTag));
		return;
	}
	revalidatePath(props.path, props.mode);
};
