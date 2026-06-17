"use client";

import { useEffect } from "react";

export function useIntersectionObserver() {
  useEffect(() => {
    const fades = document.querySelectorAll('.fade:not(.in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fades.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function LandingFeatures() {
  return (
    <section id="features">
      <div className="landing-container">
        <div className="feat-h-block fade">
          <div className="label">Capabilities</div>
          <h2 className="feat-headline">Everything you need.<br/><span className="dim">Nothing you don&apos;t.</span></h2>
        </div>
        <ul className="feat-list">
          <FeatureItem 
            num="01" 
            title="Instant AI Evaluation" 
            desc="Get immediate feedback on your writing and speaking tasks. Our AI engine provides unofficial band estimates and detailed suggestions for improvement."
            delayClass=""
          >
            <svg width="140" height="110" viewBox="0 0 200 160" fill="none">
              <rect x="30" y="20" width="140" height="120" rx="4" stroke="#ccc" strokeWidth="1.5"/>
              <rect x="40" y="36" width="120" height="10" rx="2" fill="#e5e4e2"><animate attributeName="width" values="20;120;20" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".3;.9;.3" dur="2s" repeatCount="indefinite"/></rect>
              <rect x="40" y="52" width="90" height="10" rx="2" fill="#e5e4e2"><animate attributeName="width" values="20;90;20" dur="2s" begin=".2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".3;.9;.3" dur="2s" begin=".2s" repeatCount="indefinite"/></rect>
              <rect x="40" y="68" width="110" height="10" rx="2" fill="#e5e4e2"><animate attributeName="width" values="20;110;20" dur="2s" begin=".4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".3;.9;.3" dur="2s" begin=".4s" repeatCount="indefinite"/></rect>
              <rect x="40" y="84" width="70" height="10" rx="2" fill="#e5e4e2"><animate attributeName="width" values="20;70;20" dur="2s" begin=".6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".3;.9;.3" dur="2s" begin=".6s" repeatCount="indefinite"/></rect>
              <rect x="40" y="100" width="100" height="10" rx="2" fill="#e5e4e2"><animate attributeName="width" values="20;100;20" dur="2s" begin=".8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".3;.9;.3" dur="2s" begin=".8s" repeatCount="indefinite"/></rect>
            </svg>
          </FeatureItem>

          <FeatureItem 
            num="02" 
            title="Interactive Study Modes" 
            desc="Master IELTS vocabulary and grammar with Flashcards, Learn, Test, Match, and Blast modes. Personalized paths focus on your weakest areas."
            delayClass="d1"
          >
            <svg width="140" height="110" viewBox="0 0 200 160" fill="none">
              <circle cx="100" cy="80" r="14" stroke="#ccc" strokeWidth="1.5"><animate attributeName="r" values="14;16;14" dur="2s" repeatCount="indefinite"/></circle>
              <line x1="100" y1="80" x2="156" y2="80" stroke="#e5e4e2" strokeWidth="1"><animate attributeName="opacity" values=".4;1;.4" dur="2s" begin="0s" repeatCount="indefinite"/></line>
              <circle cx="160" cy="80" r="6" stroke="#ccc" strokeWidth="1.5"><animate attributeName="r" values="6;8;6" dur="2s" begin="0s" repeatCount="indefinite"/></circle>
              <line x1="100" y1="80" x2="128" y2="128" stroke="#e5e4e2" strokeWidth="1"><animate attributeName="opacity" values=".4;1;.4" dur="2s" begin=".35s" repeatCount="indefinite"/></line>
              <circle cx="128" cy="132" r="6" stroke="#ccc" strokeWidth="1.5"><animate attributeName="r" values="6;8;6" dur="2s" begin=".35s" repeatCount="indefinite"/></circle>
              <line x1="100" y1="80" x2="72" y2="128" stroke="#e5e4e2" strokeWidth="1"><animate attributeName="opacity" values=".4;1;.4" dur="2s" begin=".7s" repeatCount="indefinite"/></line>
              <circle cx="68" cy="132" r="6" stroke="#ccc" strokeWidth="1.5"><animate attributeName="r" values="6;8;6" dur="2s" begin=".7s" repeatCount="indefinite"/></circle>
              <line x1="100" y1="80" x2="44" y2="80" stroke="#e5e4e2" strokeWidth="1"><animate attributeName="opacity" values=".4;1;.4" dur="2s" begin="1.05s" repeatCount="indefinite"/></line>
              <circle cx="40" cy="80" r="6" stroke="#ccc" strokeWidth="1.5"><animate attributeName="r" values="6;8;6" dur="2s" begin="1.05s" repeatCount="indefinite"/></circle>
              <line x1="100" y1="80" x2="72" y2="32" stroke="#e5e4e2" strokeWidth="1"><animate attributeName="opacity" values=".4;1;.4" dur="2s" begin="1.4s" repeatCount="indefinite"/></line>
              <circle cx="68" cy="28" r="6" stroke="#ccc" strokeWidth="1.5"><animate attributeName="r" values="6;8;6" dur="2s" begin="1.4s" repeatCount="indefinite"/></circle>
              <line x1="100" y1="80" x2="128" y2="32" stroke="#e5e4e2" strokeWidth="1"><animate attributeName="opacity" values=".4;1;.4" dur="2s" begin="1.75s" repeatCount="indefinite"/></line>
              <circle cx="128" cy="28" r="6" stroke="#ccc" strokeWidth="1.5"><animate attributeName="r" values="6;8;6" dur="2s" begin="1.75s" repeatCount="indefinite"/></circle>
            </svg>
          </FeatureItem>

          <FeatureItem 
            num="03" 
            title="Real-time Collaboration" 
            desc="Work with study partners or tutors seamlessly. Live preview of essays, instant feedback, and version control for your progress."
            delayClass="d2"
          >
            <svg width="140" height="110" viewBox="0 0 200 160" fill="none">
              <rect x="24" y="46" width="54" height="64" rx="4" stroke="#ccc" strokeWidth="1.5"/>
              <circle cx="51" cy="31" r="13" stroke="#ccc" strokeWidth="1.5"/>
              <rect x="122" y="46" width="54" height="64" rx="4" stroke="#ccc" strokeWidth="1.5"/>
              <circle cx="149" cy="31" r="13" stroke="#ccc" strokeWidth="1.5"/>
              <line x1="78" y1="78" x2="122" y2="78" stroke="#e5e4e2" strokeWidth="1.5" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" values="0;-8" dur=".5s" repeatCount="indefinite"/></line>
              <circle r="4" fill="#0c0c0c"><animateMotion dur="1.8s" repeatCount="indefinite"><mpath href="#cpath"/></animateMotion></circle>
              <path id="cpath" d="M78 78 L122 78" fill="none"/>
            </svg>
          </FeatureItem>

          <FeatureItem 
            num="04" 
            title="Original Mock Tests" 
            desc="Practice with exclusive full-length mock tests designed by IELTS experts. Experience the real test environment and track your performance over time."
            delayClass="d3"
          >
            <svg width="140" height="110" viewBox="0 0 200 160" fill="none">
              <path d="M100 18L148 40v48q0 38-48 54Q52 126 52 88V40z" stroke="#ccc" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M100 32L138 50v36q0 28-38 42Q62 114 62 86V50z" fill="#0c0c0c" opacity=".06"><animate attributeName="opacity" values=".06;.12;.06" dur="2.5s" repeatCount="indefinite"/></path>
              <rect x="86" y="72" width="28" height="24" rx="3" fill="#ccc"/>
              <path d="M90 72V62q0-10 10-10 10 0 10 10v10" stroke="#ccc" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="100" cy="82" r="3.5" fill="#fff"/>
              <rect x="98.5" y="84" width="3" height="7" fill="#fff"/>
            </svg>
          </FeatureItem>
        </ul>
      </div>
    </section>
  );
}

function FeatureItem({ num, title, desc, delayClass, children }: { num: string; title: string; desc: string; delayClass: string; children: React.ReactNode }) {
  return (
    <li className={`feat-item fade ${delayClass}`}>
      <span className="feat-num">{num}</span>
      <div className="feat-body">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className="feat-icon-wrap">
        {children}
      </div>
    </li>
  );
}
