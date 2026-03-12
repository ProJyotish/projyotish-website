"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, MessageCircle, Users, Globe, Star } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { trackMetaEvent } from "@/src/lib/tracking";
import pricingData from "@/content/pricing.json";
import settingsData from "@/content/settings.json";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  crown: Crown,
  users: Users,
  star: Star,
};

const Pricing = () => {
  const [isQuarterly, setIsQuarterly] = useState(false);
  const [region, setRegion] = useState<"india" | "international">("india");

  const plans = pricingData[region];

  return (
    <section id="pricing" className="py-24 bg-card">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            {pricingData.heading}
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {pricingData.description}
          </p>
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="font-body text-sm font-medium">{pricingData.trialBadge}</span>
          </div>

          {/* Region Toggle */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <div className="inline-flex bg-muted rounded-full p-1">
              <button
                onClick={() => setRegion("india")}
                className={`px-4 py-1.5 rounded-full text-sm font-body font-medium transition-colors ${
                  region === "india"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                India
              </button>
              <button
                onClick={() => setRegion("international")}
                className={`px-4 py-1.5 rounded-full text-sm font-body font-medium transition-colors ${
                  region === "international"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                International
              </button>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`font-body text-sm font-medium transition-colors ${!isQuarterly ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsQuarterly(!isQuarterly)}
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isQuarterly ? "bg-primary" : "bg-input"}`}
            >
              <span className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${isQuarterly ? "translate-x-7" : "translate-x-1"}`} />
            </button>
            <span className={`font-body text-sm font-medium transition-colors ${isQuarterly ? "text-foreground" : "text-muted-foreground"}`}>
              Quarterly
            </span>
            {isQuarterly && (
              <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs font-body font-semibold">
                Best Value
              </span>
            )}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const price = isQuarterly ? plan.quarterlyPrice : plan.monthlyPrice;
            const total = isQuarterly ? plan.quarterlyTotal : plan.monthlyTotal;
            const whatsapp = isQuarterly ? plan.quarterlyWhatsapp : plan.monthlyWhatsapp;
            const savings = isQuarterly ? plan.quarterlySavings : "";
            const Icon = iconMap[plan.iconType] || Crown;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-background border-2 border-border"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-body font-semibold shadow-soft">
                    {plan.badge}
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    plan.popular ? "bg-primary-foreground/20" : "bg-primary/10"
                  }`}>
                    <Icon className={`w-7 h-7 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                  </div>

                  <h3 className={`font-display text-2xl font-bold mb-2 ${
                    plan.popular ? "" : "text-foreground"
                  }`}>
                    {plan.name}
                  </h3>
                  <p className={`font-body text-sm ${
                    plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}>
                    {total}
                  </p>

                  <div className="mt-4">
                    <span className={`font-display text-4xl font-bold ${
                      plan.popular ? "" : "text-foreground"
                    }`}>
                      {price}
                    </span>
                    <span className={`font-body ${
                      plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}>
                      /month
                    </span>
                  </div>

                  {isQuarterly && savings && (
                    <span className="inline-block mt-2 bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-body font-semibold">
                      {savings}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 shrink-0 mt-0.5 ${
                        plan.popular ? "text-accent" : "text-primary"
                      }`} />
                      <span className={`font-body text-sm ${
                        plan.popular ? "text-primary-foreground/90" : "text-foreground"
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                  size="lg"
                >
                  <a
                    href={`https://wa.me/${settingsData.whatsappNumber}?text=${encodeURIComponent(whatsapp)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackMetaEvent("Lead", { content_name: `Pricing ${plan.name} ${isQuarterly ? "Quarterly" : "Monthly"}` })}
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Get Started
                  </a>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
