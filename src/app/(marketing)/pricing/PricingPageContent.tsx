"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "Get started with basic lessons and practice.",
    features: [
      { included: true, text: "10 free lessons" },
      { included: true, text: "Basic dictionary search" },
      { included: true, text: "Daily practice" },
      { included: false, text: "AI explanations" },
      { included: false, text: "Progress tracking" },
      { included: false, text: "Achievements" },
      { included: false, text: "Unlimited dictation" },
      { included: false, text: "Priority support" },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 12, yearly: 99 },
    description: "Full access for serious learners.",
    features: [
      { included: true, text: "All lessons" },
      { included: true, text: "Full dictionary access" },
      { included: true, text: "Daily + unlimited practice" },
      { included: true, text: "AI explanations" },
      { included: true, text: "Progress tracking" },
      { included: true, text: "Achievements & streaks" },
      { included: true, text: "Unlimited dictation" },
      { included: false, text: "Priority support" },
    ],
    cta: "Start Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 49, yearly: 490 },
    description: "For schools and organizations.",
    features: [
      { included: true, text: "All Pro features" },
      { included: true, text: "Team management" },
      { included: true, text: "Custom curriculum" },
      { included: true, text: "API access" },
      { included: true, text: "Analytics dashboard" },
      { included: true, text: "Dedicated support" },
      { included: true, text: "Custom integrations" },
      { included: true, text: "Priority support" },
    ],
    cta: "Contact Us",
    popular: false,
  },
];

export function PricingPageContent() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground mb-8">
          Choose the plan that fits your learning journey. Upgrade anytime.
        </p>
        <div className="inline-flex items-center gap-3 rounded-full border p-1">
          <button
            onClick={() => setYearly(false)}
            className={cn(
              "px-4 py-1.5 text-sm rounded-full transition-colors font-medium",
              !yearly && "bg-primary text-primary-foreground"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={cn(
              "px-4 py-1.5 text-sm rounded-full transition-colors font-medium",
              yearly && "bg-primary text-primary-foreground"
            )}
          >
            Yearly
            <span className="ml-1 text-xs opacity-80">-30%</span>
          </button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier, i) => {
          const price = yearly ? tier.price.yearly : tier.price.monthly;
          const period = yearly ? "/year" : "/month";

          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={cn(
                "relative rounded-2xl border p-8 flex flex-col",
                tier.popular
                  ? "border-primary shadow-lg shadow-primary/10"
                  : "bg-card"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">{tier.name}</h2>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold">${price}</span>
                <span className="text-muted-foreground ml-1">{period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3 text-sm">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={feature.included ? "" : "text-muted-foreground/50"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.popular ? "default" : "outline"}
                size="lg"
                className="w-full"
              >
                {tier.cta}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
