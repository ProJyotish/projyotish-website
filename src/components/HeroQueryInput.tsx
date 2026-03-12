"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { trackMetaEvent } from "@/src/lib/tracking";

const suggestions = [
  "When to schedule salary hike meeting with boss",
  "Health insights",
  "Will my relationship survive?",
  "Best time to accept job offer",
  "When will I buy a house?",
  "Do I have combinations for wealth?",
  "Will I settle abroad?",
];

// WhatsApp icon as inline SVG component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const HeroQueryInput = () => {
  const [query, setQuery] = useState("");

  const whatsappUrl = useMemo(() => {
    const message = query.trim() || "Namaste";
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/918291218234?text=${encodedMessage}`;
  }, [query]);

  const handleChipClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      trackMetaEvent("Lead", { content_name: "Hero WhatsApp CTA" });
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Input field with send button */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your kundli, muhurat, career..."
          className="w-full h-14 pl-5 pr-14 bg-card border-2 border-border rounded-full font-body text-foreground placeholder:text-muted-foreground shadow-soft focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
        />
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMetaEvent("Lead", { content_name: "Hero WhatsApp CTA" })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 w-10 h-10 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-elevated hover:bg-[#20BD5A] transition-all duration-300"
        >
          <WhatsAppIcon className="w-5 h-5" />
        </motion.a>
      </div>

      {/* Suggestion chips with marquee animation */}
      <div className="mt-4 overflow-hidden relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="flex gap-2 animate-marquee hover:pause-marquee">
          {/* Duplicate chips for seamless loop */}
          {[...suggestions, ...suggestions].map((suggestion, index) => (
            <motion.button
              key={`${suggestion}-${index}`}
              onClick={() => handleChipClick(suggestion)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 px-4 py-2 bg-card border border-border rounded-full font-body text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-accent/10 transition-all duration-200 cursor-pointer"
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroQueryInput;
