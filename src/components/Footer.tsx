import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import logo from "@/src/assets/file.svg";

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col gap-8">
          {/* Grid layout */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-8">
            {/* Logo + Brand + Social — icons under logo, labels under brand name */}
            <div className="col-span-3 md:col-span-1 flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-3">
                <img src={logo.src} alt="ProJyotish" className="w-10 h-10 shrink-0 rounded-lg" />
                <span className="font-display text-xl font-semibold text-foreground">ProJyotish</span>
              </Link>
              <div className="flex flex-col gap-2">
                <a
                  href="https://instagram.com/projyotish_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="ProJyotish on Instagram"
                >
                  <span className="w-10 shrink-0 flex justify-center">
                    <Instagram className="w-4 h-4" />
                  </span>
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/ProJyotish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="ProJyotish on Facebook"
                >
                  <span className="w-10 shrink-0 flex justify-center">
                    <Facebook className="w-4 h-4" />
                  </span>
                  Facebook
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-2">
              <span className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Navigate</span>
              <a href="/#how-it-works" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
              <a href="/#use-cases" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Use Cases</a>
              <a href="/#founders" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Team</a>
              <Link href="/blog" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-2">
              <span className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Legal</span>
              <Link href="/terms" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</Link>
              <Link href="/privacy" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/contact" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
            </div>

            {/* Guidance */}
            <div className="flex flex-col gap-2">
              <span className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Guidance</span>
              <Link href="/career" className="font-body text-xs text-muted-foreground/80 hover:text-foreground transition-colors">Career</Link>
              <Link href="/business" className="font-body text-xs text-muted-foreground/80 hover:text-foreground transition-colors">Business</Link>
              <Link href="/health" className="font-body text-xs text-muted-foreground/80 hover:text-foreground transition-colors">Health</Link>
              <Link href="/love" className="font-body text-xs text-muted-foreground/80 hover:text-foreground transition-colors">Love</Link>
              <Link href="/wealth" className="font-body text-xs text-muted-foreground/80 hover:text-foreground transition-colors">Wealth</Link>
              <Link href="/exam-results" className="font-body text-xs text-muted-foreground/80 hover:text-foreground transition-colors">Exam & Admission</Link>
              <Link href="/child-future" className="font-body text-xs text-muted-foreground/80 hover:text-foreground transition-colors">Child&apos;s Future</Link>
              <Link href="/husband-health" className="font-body text-xs text-muted-foreground/80 hover:text-foreground transition-colors">Husband&apos;s Health</Link>
            </div>
          </div>

          {/* Bottom row: Copyright */}
          <div className="border-t border-border pt-6 text-center">
            <p className="font-body text-sm text-muted-foreground">
              © 2026 ProJyotish. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
