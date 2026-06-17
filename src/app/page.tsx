import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import LandingNavbar from "@/components/landing/Navbar";
import LandingHero from "@/components/landing/Hero";
import LandingFeatures, { useIntersectionObserver } from "@/components/landing/Features";
import LandingHowItWorks from "@/components/landing/HowItWorks";
import LandingStats from "@/components/landing/Stats";
import LandingIntegrations from "@/components/landing/Integrations";
import LandingPricing from "@/components/landing/Pricing";
import LandingCTA from "@/components/landing/CTA";
import LandingFooter from "@/components/landing/Footer";

import "./landing.css";

export default async function HomePage() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  return (
    <div className="landing-body">
      <LandingNavbar session={session} />
      <LandingHero session={session} />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingStats />
      <LandingIntegrations />
      <LandingPricing />
      <LandingCTA session={session} />
      <LandingFooter />
      <AnimationInitializer />
    </div>
  );
}

function AnimationInitializer() {
  useIntersectionObserver();
  return null;
}
