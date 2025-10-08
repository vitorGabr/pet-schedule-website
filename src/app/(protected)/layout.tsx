import { SearchHeader } from "@/components/navigation/search-header";

export default function ProtectedLayout({ children }: LayoutProps<"/">) {
	return (
		<div>
			<SearchHeader />
			<main>{children}</main>
		</div>
	);
}
