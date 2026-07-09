import { generateMetadata } from "@/lib/seo";
import { PricingPageContent } from "./PricingPageContent";

export const metadata = generateMetadata({
  title: "Pricing",
  description: "Choose the perfect plan for your shorthand learning journey.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <PricingPageContent />
      </div>
    </div>
  );
}
