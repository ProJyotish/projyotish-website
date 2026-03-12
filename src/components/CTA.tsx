"use client";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";

import { trackMetaEvent } from "@/src/lib/tracking";
const CTA = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-accent" />
          
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Begin Your Astrological Journey Today
          </h2>
          
          <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Connect with ProJyotish on WhatsApp or iMessage and discover the cosmic guidance 
            that awaits you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/918291218234?text=Namaste"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMetaEvent("Lead", { content_name: "CTA Get Started" })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-foreground text-primary font-body font-semibold rounded-xl shadow-elevated hover:bg-primary-foreground/90 transition-all duration-300 hover:-translate-y-1"
            >
              <Sparkles className="w-5 h-5" />
              Get Started Now
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-primary-foreground font-body font-medium rounded-xl border-2 border-primary-foreground/30 hover:border-primary-foreground/60 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Learn More
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
