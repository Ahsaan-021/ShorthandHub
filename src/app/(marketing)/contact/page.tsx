import { generateMetadata } from "@/lib/seo";
import { ContactPageContent } from "./ContactPageContent";

export const metadata = generateMetadata({
  title: "Contact",
  description: "Get in touch with the ShorthandHub team. We'd love to hear from you.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-2xl">
        <ContactPageContent />
      </div>
    </div>
  );
}
