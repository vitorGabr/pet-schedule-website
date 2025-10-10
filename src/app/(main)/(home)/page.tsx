import { Suspense } from "react";
import { BusinessCtaSection } from "./_components/business-cta-section";
import { CompaniesSection } from "./_components/companies-section";
import { HeroSection } from "./_components/hero-section";
import { NewsletterSection } from "./_components/newsletter-section";
import { ServicesSection } from "./_components/services-section";
import { StatsSection } from "./_components/stats-section";
import { TestimonialsSection } from "./_components/testimonials-section";
import { WhyChooseUsSection } from "./_components/why-choose-us-section";

export default function Home() {
	return (
		<div className="flex flex-1 flex-col">
			<HeroSection />
			<ServicesSection />
			<StatsSection />
			<Suspense>
				<CompaniesSection />
			</Suspense>
			<WhyChooseUsSection />
			<BusinessCtaSection />
			<TestimonialsSection />
			<NewsletterSection />
		</div>
	);
}
