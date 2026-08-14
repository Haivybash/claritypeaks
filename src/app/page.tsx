import { Hero } from "@/components/hero";
import { Industries } from "@/components/industries";
import { Pricing } from "@/components/pricing";
import { LeadForm } from "@/components/lead-form";
import { IndustryProvider } from "@/components/industry-context";

export default function Home() {
  return (
    <IndustryProvider>
      <div id="top">
        <Hero />
        <Industries />
        <Pricing />
        <LeadForm />
      </div>
    </IndustryProvider>
  );
}
