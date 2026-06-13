import type { Metadata } from "next";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { Toaster } from "@/src/components/ui/toaster";
import { Toaster as Sonner } from "@/src/components/ui/sonner";
import Providers from "./providers";
import "@/src/index.css";

export const metadata: Metadata = {
  title: "ProJyotish - Astrologer developed by IITians trained in Astrology",
  description:
    "Get personalized muhurtas, daily ideal time slots, and deep karmic insights from AI-powered Vedic Astrology. Built by IIT alumni, trained on thousands of real cases.",
  keywords:
    "Vedic astrology, Jyotish, horoscope, kundli, birth chart, AI astrology, WhatsApp astrology, muhurta, predictions, karma",
  authors: [{ name: "ProJyotish" }],
  metadataBase: new URL("https://projyotish.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://projyotish.com",
    title: "ProJyotish - Astrologer developed by IITians trained in Astrology",
    description:
      "Get instant, personalized Vedic astrology readings via WhatsApp. AI-powered horoscope predictions, birth chart analysis, and spiritual guidance.",
    images: [
      {
        url: "/file.svg",
        width: 1200,
        height: 1200,
        alt: "ProJyotish",
      },
    ],
    siteName: "ProJyotish",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProJyotish - Astrologer developed by IITians trained in Astrology",
    description:
      "Get instant, personalized Vedic astrology readings via WhatsApp. AI-powered horoscope predictions and spiritual guidance.",
    images: ["/file.svg"],
    site: "@ProJyotish",
    creator: "@ProJyotish",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
          {/* <Script id="gtm" strategy="lazyOnload">
            {`(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-KRGPDT77');`}
          </Script> */}

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PRVMWX5W');`}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MSRSJ04P4T"
          strategy="lazyOnload"
        />
        <Script id="ga4" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MSRSJ04P4T');`}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '4447268778893377');
          fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4447268778893377&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "v9f9xqikhz");`}
        </Script>

        <Script id="posthog" strategy="afterInteractive">
          {`window.posthog = window.posthog && typeof window.posthog.push === "function" ? window.posthog : [];
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setGroupPropertiesForFlags resetGroupPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroups setPersonPropertiesForFlags opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog);
          posthog.init('phc_N5p2DVRO6BXcEIKv86kabRWxa1l7wywFIrpgNQbsMic',{api_host:'https://f.projyotish.com',ui_host: 'https://us.posthog.com',person_profiles: 'always',defaults:'2026-05-30'})`}
        </Script>

        <Script>
          {`
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get("phone") ?? urlParams.get("phoneNumber") ?? urlParams.get("mobile") ?? "";
            const normalizedUserId = userId.replace(/\D/g, "");
            window.posthog?.identify(normalizedUserId);
          `}
        </Script>

        {/* Reddit Pixel */}
        <Script id="reddit-pixel" strategy="lazyOnload">
          {`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js?pixel_id=a2_inhxatfmgann",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_inhxatfmgann');rdt('track', 'PageVisit');`}
        </Script>


        {/* gtag delayed navigation helper */}
        <Script id="gtag-helper" strategy="lazyOnload">
          {`function gtagSendEvent(url) {
          var callback = function () {
            if (typeof url === 'string') { window.open(url, '_blank'); }
          };
          if (typeof gtag === 'function') {
            gtag('event', 'click', { 'event_callback': callback, 'event_timeout': 2000 });
          } else { callback(); }
          return false;
          }`}
        </Script>

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KRGPDT77"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PRVMWX5W"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
