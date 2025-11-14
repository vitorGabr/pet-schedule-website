import { Footer } from "@/components/footer";
import { MainHeader } from "@/components/navigation/main-header";

export default function MainLayout({ children }: LayoutProps<"/">) {
	return (
		<div>
			<MainHeader />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
