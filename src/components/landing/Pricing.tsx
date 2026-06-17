"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingPricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing">
      <div className="landing-container">
        <div className="fade">
          <div className="label">Pricing</div>
          <h2 className="price-h">Simple, transparent<br/><span className="accent">pricing</span></h2>
          <p className="price-sub">Start free and scale as you grow. Achieve your target band without hidden costs.</p>
          <div className="price-toggle">
            <button 
              className={`tog ${!isAnnual ? 'on' : ''}`} 
              onClick={() => setIsAnnual(false)}
            >Monthly</button>
            <button 
              className={`tog ${isAnnual ? 'on' : ''}`} 
              onClick={() => setIsAnnual(true)}
            >Annual<span className="save-chip">Save 20%</span></button>
          </div>
        </div>
        <div className="price-cards fade d1">
          <PricingCard 
            tier="Starter" 
            desc="For individuals beginning their journey" 
            price="0" 
            period="forever free"
            cta="Start free →"
            href="/register"
            features={[
              "Up to 3 mock tests / mo",
              "150+ vocabulary words",
              "Basic AI evaluation",
              "Community support",
              "Standard analytics"
            ]}
          />
          <PricingCard 
            tier="Pro" 
            desc="For serious candidates aiming high" 
            price={isAnnual ? "19" : "24"} 
            period={isAnnual ? "per month, billed annually" : "per month, billed monthly"}
            cta="Start free trial →"
            href="/register"
            featured={true}
            features={[
              "Unlimited mock tests",
              "Full vocabulary library",
              "Advanced AI evaluation",
              "Priority tutor support",
              "Detailed band analysis",
              "Speaking practice mode"
            ]}
          />
          <PricingCard 
            tier="Institutional" 
            desc="For coaching centers and schools" 
            price="Custom" 
            period="tailored to your needs"
            cta="Contact us →"
            href="mailto:hello@doshomik.com"
            features={[
              "Everything in Pro",
              "Bulk student management",
              "Teacher dashboard",
              "Custom mock tests",
              "SSO / LMS Integration",
              "Dedicated account manager"
            ]}
          />
        </div>
        <p className="price-foot">All plans include automatic updates, 99.9% availability, and data privacy. <Link href="#">Compare all features →</Link></p>
      </div>
    </section>
  );
}

function PricingCard({ tier, desc, price, period, cta, href, features, featured = false }: { 
  tier: string; 
  desc: string; 
  price: string; 
  period: string; 
  cta: string; 
  href: string; 
  features: string[];
  featured?: boolean;
}) {
  return (
    <div className={`price-card ${featured ? 'featured' : ''}`}>
      <div className={`pc-tier ${featured ? 'on' : ''}`}>{tier}</div>
      <div className="pc-desc">{desc}</div>
      <div className="pc-price">
        <div className="pc-amt" style={price === "Custom" ? {fontSize:'42px', letterSpacing:'-.03em', lineHeight:'1.1'} : {}}>
          {price !== "Custom" && <sup>$</sup>}{price}
        </div>
        <div className="pc-per">{period}</div>
      </div>
      <Link href={href} className={`pc-cta ${featured ? 'cta-fill' : 'cta-ghost'}`}>
        {cta}
      </Link>
      <ul className="pc-list">
        {features.map((feat, i) => (
          <li key={i}>
            <svg className="chk" viewBox="0 0 15 15" fill="none"><path d="M3 7.5l3.5 3.5L12 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {feat}
          </li>
        ))}
      </ul>
    </div>
  );
}
