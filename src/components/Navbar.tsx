"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import logo from "@/src/assets/projyotish-logo-new.jpeg";
import { trackCustomEvent } from "@/src/lib/tracking";
import { useSourceGreeting } from "@/src/contexts/SourceGreetingContext";

const navLinks = [
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Use Cases", href: "/#use-cases" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Team", href: "/#founders" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { waUrl } = useSourceGreeting();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src={logo.src}
              alt="ProJyotish"
              className="h-20 w-20"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCustomEvent("Lead", { content_name: "Navbar Get Started" })}
              className="px-5 py-2 bg-primary text-primary-foreground font-body font-medium text-sm rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-base text-foreground py-2"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { setIsOpen(false); trackCustomEvent("Lead", { content_name: "Navbar Mobile Get Started" }); }}
                className="px-5 py-3 bg-primary text-primary-foreground font-body font-medium text-center rounded-lg"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
