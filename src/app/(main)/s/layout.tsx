import { CategoryTabs } from "@/components/category-tabs";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-1 flex-col">
			<CategoryTabs />
			{children}
		</div>
	);
}
