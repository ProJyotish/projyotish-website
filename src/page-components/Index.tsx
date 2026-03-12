"use client";
import { Suspense, lazy } from "react";
import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import { MessageCircle } from "lucide-react";
import { trackMetaEvent } from "@/src/lib/tracking";

// Lazy load below-the-fold components for progressive loading
const HowItWorks = lazy(() => import("@/src/components/HowItWorks"));
const UseCases = lazy(() => import("@/src/components/UseCases"));
const Testimonials = lazy(() => import("@/src/components/Testimonials"));
const Founders = lazy(() => import("@/src/components/Founders"));
const CTA = lazy(() => import("@/src/components/CTA"));
const Footer = lazy(() => import("@/src/components/Footer"));

// Loading skeleton component
const SectionSkeleton = () => (
  <div className="w-full h-96 bg-gradient-to-b from-muted to-muted/50 animate-pulse" />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        
        {/* Lazy load sections with fallback UI */}
        <Suspense fallback={<SectionSkeleton />}>
          <HowItWorks />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <UseCases />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <Founders />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <CTA />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
      {/* Floating Get Started button - mobile only */}
      <a
        href="https://wa.me/918291218234?text=Namaste"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackMetaEvent("Lead", { content_name: "Floating WhatsApp CTA" })}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-body font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-colors md:hidden"
      >
        <MessageCircle className="w-5 h-5" />
        Get Started
      </a>
    </div>
  );
};

export default Index;
