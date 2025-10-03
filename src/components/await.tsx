import { Suspense } from "react";

type AwaitProps<T extends Promise<any> | (() => Promise<any>)> = {
	promise: T;
	children: (data: Awaited<T>) => React.ReactNode;
	fallback?: React.ReactNode;
};

export async function Await<T extends (() => Promise<any>) | Promise<any>>({
	promise,
	children,
	fallback,
}: AwaitProps<T>) {
	return (
		<Suspense fallback={fallback}>
			<AwaitClient promise={promise}>{children}</AwaitClient>
		</Suspense>
	);
}

async function AwaitClient<T extends Promise<any> | (() => Promise<any>)>({
	promise,
	children,
}: AwaitProps<T>) {
	const data = await promise;
	return children(data);
}
