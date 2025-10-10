"use server";
import type { Route } from "next";
import { revalidatePath, updateTag } from "next/cache";

type Props =
	| { type: "tag"; tags: readonly string[] }
	| { type: "path"; path: Route<string>; mode?: "layout" | "page" };

export const revalidateCache = async (props: Props) => {
	if (props.type === "tag") {
		await Promise.all(props.tags.map(updateTag));
		return;
	}
	revalidatePath(props.path, props.mode);
};
