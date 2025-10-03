import { cache } from "react";
import { getGetSessionQueryKey, getSession } from "@/lib/http";

export const verifySession = cache(async () => {
	try {
		const session = await getSession({
			fetchOptions: { next: { tags: getGetSessionQueryKey() } },
		});
		return session;
	} catch (_) {
		return null;
	}
});
