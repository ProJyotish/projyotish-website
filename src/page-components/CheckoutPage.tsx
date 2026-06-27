"use client";

import { useMemo, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Star, Users } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { trackCustomEvent } from "@/src/lib/tracking";
import pricingData from "@/content/pricing.json";
import logo from "@/src/assets/file.svg";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  crown: Crown,
  users: Users,
  star: Star,
};

const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, "").slice(0, 12);

const isIndianPhoneNumber = (phone: string | null) => {
  if (!phone) return false;
  return normalizePhone(phone).replace(/\D/g, "").startsWith("91");
};

type RazorpayOptions = {
  key: string;
  name: string;
  description: string;
  subscription_id: string;
  prefill?: {
    contact?: string;
  };
  theme?: {
    color: string;
  };
  handler?: (response: unknown) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

const loadRazorpayScript = async () => {
  if (typeof window === "undefined") return false;
  if (window.Razorpay) return true;

  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const parsePriceStringToMinorUnits = (price: string, currency: "INR" | "USD") => {
  // Example: "₹499" / "$19.99"
  const cleaned = price.replace(/,/g, "").replace(/[^\d.]/g, "");
  const value = Number.parseFloat(cleaned);
  if (Number.isNaN(value) || value <= 0) return 0;

  // Razorpay expects minor units (paisa/cents).
  return value;
};

const getLaunchReferencePrice = (displayPrice: string) => {
  const symbolMatch = displayPrice.match(/[^\d.,]/);
  const symbol = symbolMatch ? symbolMatch[0] : "";
  const cleaned = displayPrice.replace(/,/g, "").replace(/[^\d.]/g, "");
  const value = Number.parseFloat(cleaned);
  if (Number.isNaN(value) || value <= 0) return displayPrice;

  // Launch reference price = current price +30%.
  // INR prices are rounded to nearest 100 as requested.
  const bumped = value * 1.3;
  const rounded = symbol === "₹" ? Math.round(bumped / 100) * 100 : Math.round(bumped);
  return `${symbol}${rounded.toLocaleString("en-IN")}`;
};

const checkoutFaqs = [
  {
    question: "How can I upgrade to Power User if I am on Premium?",
    answer:
      "You can upgrade anytime. Your old subscription will be cancelled, and any unused balance will be refunded.",
  },
  {
    question: "How can I cancel?",
    answer: "You can cancel your subscription directly from your UPI app or through your credit card provider. Cancellations will be effective from the next billing date and subscription will stay active until the end of the current billing period. You can also contact us at support[@]projyotish.com for assistance.",
  },
  {
    question: "Refund policy",
    answer:
      "We do not offer refunds once payment is made. We provide a free trial of 10 questions and 3 days of personalized reports so you can evaluate our service before subscribing.",
  },
];

const CheckoutPage = () => {
  const [isQuarterly, setIsQuarterly] = useState(false);
  const searchParams = useSearchParams();

  const userId =
    searchParams.get("phone") ??
    searchParams.get("phoneNumber") ??
    searchParams.get("mobile") ??
    "";

  const normalizedUserId = useMemo(() => userId.replace(/\D/g, ""), [userId]);
  
  const region: "india" | "international" = useMemo(
    () => (isIndianPhoneNumber(userId) ? "india" : "international"),
    [userId],
  );

  const plans = pricingData[region];
  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const subscriptionApiUrl = process.env.NEXT_PUBLIC_SUBSCRIPTION_API_URL;
  const currency: "INR" | "USD" = region === "india" ? "INR" : "USD";

  const handleRazorpayPayNow = async (plan: (typeof plans)[number]) => {
    if (!razorpayKey) {
      window.alert("Payment is temporarily unavailable. Razorpay key is missing.");
      return;
    }
    if (!subscriptionApiUrl) {
      window.alert("Payment is temporarily unavailable. Subscription API URL is missing.");
      return;
    }

    const billingTerm = isQuarterly ? "QUARTERLY" : "MONTHLY";
    const planNameKey = plan.name.replace(/\s+/g, "_").toUpperCase();
    const regionKey = region === "india" ? "INDIA" : "INTERNATIONAL";
    const price = isQuarterly ? plan.quarterlyPrice : plan.monthlyPrice;

    const loaded = await loadRazorpayScript();
    if (!loaded || !window.Razorpay) {
      window.alert("Unable to load Razorpay checkout. Please try again.");
      return;
    }

    const billingTermLabel = isQuarterly ? "Quarterly" : "Monthly";
    const subscriptionRes = await fetch(subscriptionApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parsePriceStringToMinorUnits(price, currency),
        totalCount: 12,
        customerNotify: 1,
        phoneNumber: normalizedUserId,
        // Optional context for your external API/logging
        metadata: {
          region: regionKey,
          plan: planNameKey,
          term: billingTerm,
          user_id: normalizedUserId || undefined,
        },
      }),
    });

    if (!subscriptionRes.ok) {
      window.alert("Unable to create subscription. Please try again.");
      return;
    }

    const subscriptionData = (await subscriptionRes.json()) as { id?: string; subscriptionId?: string };
    const subscriptionId = subscriptionData.id || subscriptionData.subscriptionId;
    if (!subscriptionId) {
      window.alert("Subscription ID was not returned by API.");
      return;
    }

    const payment = new window.Razorpay({
      key: razorpayKey,
      name: "ProJyotish",
      description: `${plan.name} ${billingTermLabel} Subscription`,
      subscription_id: subscriptionId,
      prefill: normalizedUserId ? { contact: normalizedUserId } : undefined,
      theme: { color: "#7C3AED" },
      handler: () => {
        /* trackCustomEvent("Purchase", {
          event_id: subscriptionId,
          price: price,
          content_name: `Checkout ${plan.name} ${billingTermLabel}`,
          value: price,
          region: region,
          currency: currency,
          subscription_id: subscriptionId,
          mode: "subscription",
          phone_provided: Boolean(normalizedUserId),
          langfuse_user_id: normalizedUserId,
          distinct_id: normalizedUserId,
          plan: plan.name,
          term: billingTermLabel,
          user_id: normalizedUserId,
        }); */
        window.location.href = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`;
      },
    });

    /* trackCustomEvent("InitiateCheckout", {
      event_id: subscriptionId,
      price: price,
      content_name: `Checkout ${plan.name} ${billingTermLabel}`,
      checkout_region: region,
      currency: currency,
      value: price,
      subscription_id: subscriptionId,
      checkout_mode: "subscription",
      phone_provided: Boolean(normalizedUserId),
      langfuse_user_id: normalizedUserId,
      distinct_id: normalizedUserId
    }); */

    payment.open();
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div
        role="banner"
        className="w-full border-b border-primary/20 bg-primary text-primary-foreground shadow-sm"
      >
        <div className="container mx-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3">
          <Sparkles className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
          <p className="font-body text-center text-xs font-semibold uppercase tracking-wide sm:text-sm">
            Introductory launch pricing — limited time
          </p>
        </div>
      </div>
      <main>
        <section className="pt-10 pb-24 sm:pt-12">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="flex justify-center mb-3">
                <div className="relative">
                  <div className="absolute inset-0 -z-10 rounded-xl bg-primary/35 blur-xl" />
                  <img
                    src={logo.src}
                    alt="ProJyotish Logo"
                    className="w-20 h-20 md:w-28 md:h-28 mx-auto rounded-2xl shadow-elevated animate-float"
                  />
                </div>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                Checkout
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                {pricingData.description}
              </p>
            </motion.div>

            <div className="flex items-center justify-center gap-3 mb-10">
              <span
                className={`font-body text-sm font-medium transition-colors ${
                  !isQuarterly ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsQuarterly(!isQuarterly)}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isQuarterly ? "bg-primary" : "bg-input"
                }`}
              >
                <span
                  className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                    isQuarterly ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`font-body text-sm font-medium transition-colors ${
                  isQuarterly ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Quarterly
              </span>
              <span
                className={`w-20 text-center px-2 py-0.5 rounded-full text-xs font-body font-semibold transition-opacity ${
                  isQuarterly
                    ? "bg-accent/20 text-accent opacity-100"
                    : "opacity-0"
                }`}
              >
                  Best Value
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plans.map((plan, index) => {
                const price = isQuarterly ? plan.quarterlyPrice : plan.monthlyPrice;
                const total = isQuarterly ? plan.quarterlyTotal : plan.monthlyTotal;
                const monthlyPrice = plan.monthlyPrice;
                const launchReferencePrice = getLaunchReferencePrice(price);
                const launchReferenceTotal = getLaunchReferencePrice(total);
                const savings = isQuarterly ? plan.quarterlySavings : "";
                const Icon = iconMap[plan.iconType] || Crown;

                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative rounded-2xl p-8 flex flex-col h-full ${
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
                      <div
                        className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                          plan.popular ? "bg-primary-foreground/20" : "bg-primary/10"
                        }`}
                      >
                        <Icon
                          className={`w-7 h-7 ${
                            plan.popular ? "text-primary-foreground" : "text-primary"
                          }`}
                        />
                      </div>

                      <h3
                        className={`font-display text-2xl font-bold mb-2 ${
                          plan.popular ? "" : "text-foreground"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      

                      <div className="mt-4">
                        {isQuarterly ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end justify-center gap-2">
                              <span
                                className={`font-display text-4xl font-bold ${
                                  plan.popular ? "text-accent" : "text-primary"
                                }`}
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                              >
                                {price}
                              </span>
                              <span
                                className={`font-body text-4xl line-through ${
                                  plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"
                                }`}
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                              >
                                {launchReferencePrice}
                              </span>
                              <span
                                className={`font-body ml-1 ${
                                  plan.popular
                                    ? "text-primary-foreground/80"
                                    : "text-muted-foreground"
                                }`}
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                              >
                                /quarter
                              </span>
                            </div>
                            <span className={`font-body text-sm text-muted-foreground ${plan.popular
                                    ? "text-primary-foreground/80"
                                    : "text-muted-foreground"}`}>({plan.effectiveMonthlyPrice})</span>
                          </div>
                        ) : (
                          <div className="flex items-end justify-center gap-2 whitespace-nowrap">
                            <span
                              className={`font-display text-4xl font-bold ${
                                plan.popular ? "text-accent" : "text-primary"
                              }`}
                              style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                              {price}
                            </span>
                            <span
                              className={`font-display text-4xl font-bold line-through ${
                                plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`}
                              style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                              {launchReferencePrice}
                            </span>
                            <span
                              className={`font-body ${
                                plan.popular
                                  ? "text-primary-foreground/80"
                                  : "text-muted-foreground"
                              }`}
                              style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                              /month
                            </span>
                          </div>
                        )}
                      </div>

                      {isQuarterly && savings && (
                        <span className="inline-block mt-2 bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-body font-semibold">
                          {savings}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check
                            className={`w-5 h-5 shrink-0 mt-0.5 ${
                              plan.popular ? "text-accent" : "text-primary"
                            }`}
                          />
                          <span
                            className={`font-body text-sm ${
                              plan.popular
                                ? "text-primary-foreground/90"
                                : "text-foreground"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                      size="lg"
                      onClick={() => handleRazorpayPayNow(plan)}
                    >
                      Pay Now
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {checkoutFaqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-xl border border-border bg-background/80 p-5"
                  >
                    <h3 className="font-body text-base md:text-lg font-semibold text-foreground">
                      {faq.question}
                    </h3>
                    <p className="mt-2 font-body text-sm md:text-base text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CheckoutPage;

