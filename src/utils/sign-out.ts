"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function signOutUser() {
	const { sessionId } = await auth();
	const client = await clerkClient();
	if (sessionId) {
		await client?.sessions.revokeSession(sessionId);
	}
	await redirect("/");
}
