import { SearchHeader } from "@/components/navigation/search-header";

export default function SearchLayout({ children }: LayoutProps<"/">) {
	return (
		<div>
			<SearchHeader />
			<main>{children}</main>
		</div>
	);
}
