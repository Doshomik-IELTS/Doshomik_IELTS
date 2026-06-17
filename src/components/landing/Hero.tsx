"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import type { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session | null;

export default function LandingHero({ session }: { session: Session }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const W = 350, H = 350;
    c.width = W; c.height = H;

    const dots: { x: number; y: number; z: number }[] = [];
    const R = 130;
    const rings = 28;
    for (let i = 0; i <= rings; i++) {
      const phi = (Math.PI * i) / rings;
      const y3 = R * Math.cos(phi);
      const r2 = R * Math.sin(phi);
      const count = Math.max(1, Math.round(rings * 2.2 * Math.sin(phi)));
      for (let j = 0; j < count; j++) {
        const theta = (2 * Math.PI * j) / count;
        dots.push({ x: r2 * Math.cos(theta), y: y3, z: r2 * Math.sin(theta) });
      }
    }

    let angle = 0;
    let frameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const ca = Math.cos(angle), sa = Math.sin(angle);
      const tc = Math.cos(0.25), ts = Math.sin(0.25);

      const pts = dots.map((d) => {
        const x1 = d.x * ca - d.z * sa;
        const z1 = d.x * sa + d.z * ca;
        const y1 = d.y * tc - z1 * ts;
        const z2 = d.y * ts + z1 * tc;
        const s = 700 / (700 + z2);
        return { sx: cx + x1 * s, sy: cy - y1 * s, z: z2 };
      });

      pts.sort((a, b) => a.z - b.z);
      
      const isDark = document.documentElement.classList.contains('dark') || resolvedTheme === 'dark';
      
      pts.forEach((p) => {
        const b = (p.z + R) / (2 * R);
        const a = 0.04 + b * 0.22;
        const r = 1.0 + b * 1.2;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${a.toFixed(2)})`
          : `rgba(12,12,12,${a.toFixed(2)})`;
        ctx.fill();
      });

      angle += 0.0025;
      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, [resolvedTheme]);

  useEffect(() => {
    // Immediate fade in for hero elements
    const heroFades = document.querySelectorAll('#hero .fade');
    heroFades.forEach((el) => el.classList.add('in'));
  }, []);

  return (
    <section id="hero">
      <div className="hero-grid-bg"></div>
      <div className="hero-canvas-wrap">
        <canvas ref={canvasRef} id="dot-canvas" width="350" height="350"></canvas>
      </div>

      <div className="hero-body" style={{paddingTop:'64px', paddingBottom:'100px'}}>
        <div className="hero-eyebrow fade">
          <span className="hero-eyebrow-line"></span>
          The platform for future scholars
        </div>
        <h1 className="hero-h fade d1">Achieve your<br/>target band</h1>
        <div className="hero-bottom fade d2">
          <p className="hero-sub">
            Your comprehensive toolkit for IELTS preparation. AI-powered evaluation, interactive practice modules, and real mock tests to accelerate your journey.
          </p>
          <div className="hero-cta">
            {session ? (
              <Link href="/dashboard" className="btn btn-dark">
                Go to Dashboard 
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            ) : (
              <Link href="/register" className="btn btn-dark">
                Start free trial 
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            )}
            <Link href="/study" className="btn btn-outline">Try demo</Link>
          </div>
        </div>
      </div>

      <div className="marquee-wrap fade d4">
        <div className="marquee-track">
          <MarqueeItem num="150+" label="vocabulary words" brand="RESOURCES" />
          <MarqueeItem num="5" label="study modes" brand="INTERACTIVE" />
          <MarqueeItem num="98%" label="student satisfaction" brand="SUCCESS" />
          <MarqueeItem num="0$" label="to start" brand="ACCESSIBLE" />
          {/* Duplicate for infinite effect */}
          <MarqueeItem num="150+" label="vocabulary words" brand="RESOURCES" />
          <MarqueeItem num="5" label="study modes" brand="INTERACTIVE" />
          <MarqueeItem num="98%" label="student satisfaction" brand="SUCCESS" />
          <MarqueeItem num="0$" label="to start" brand="ACCESSIBLE" />
        </div>
      </div>
    </section>
  );
}

function MarqueeItem({ num, label, brand }: { num: string; label: string; brand: string }) {
  return (
    <div className="marquee-item">
      <span className="marquee-num">{num}</span>
      <div className="marquee-meta">
        <span className="marquee-label">{label}</span>
        <span className="marquee-brand">{brand}</span>
      </div>
    </div>
  );
}
