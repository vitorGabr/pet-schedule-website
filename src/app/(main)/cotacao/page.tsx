import { Suspense } from "react";
import { BenefitsSection } from "./_components/benefits-section";
import { HeroSection } from "./_components/hero-section";
import QuoteFormSection from "./_components/quote-form-section";
import { StatsSection } from "./_components/stats-section";
import { TestimonialsSection } from "./_components/testimonials-section";

export default function CotacaoPage() {
	return (
		<div className="flex flex-1 flex-col">
			<HeroSection />
			<BenefitsSection />
			<QuoteFormSection />
			<Suspense>
				<StatsSection />
			</Suspense>
			<TestimonialsSection />
		</div>
	);
}
