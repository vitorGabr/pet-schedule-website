import { getGetSessionQueryKey, getSession } from "@/lib/http";
import { AxiosError } from "axios";

export const verifySession = async () => {
	try {
		const session = await getSession({ fetchOptions: { next: { tags: getGetSessionQueryKey() } } });
		return session;
	} catch (e) {
		if (e instanceof AxiosError) {
			if (e.config) {
				console.log("Headers enviados:", e.config.headers);

				// Se quiser checar especificamente o Authorization
				const authHeader =
					(e.config.headers as any)?.Authorization || (e.config.headers as any)?.authorization;

				console.log("Authorization enviado:", authHeader);
			}
		}
		console.log("Error verifying session", e);
		return null;
	}
};
