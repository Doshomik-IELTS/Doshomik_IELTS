"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import type { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session | null;

export default function LandingCTA({ session }: { session: Session }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const W = 420, H = 360;
    c.width = W; c.height = H;

    const ANG = Math.PI / 6;
    const COS = Math.cos(ANG), SIN = Math.sin(ANG);
    const SC = 30;

    const iso = (gx: number, gy: number, gz: number) => {
      return {
        x: W / 2 + (gx - gy) * COS * SC,
        y: H * 0.64 + (gx + gy) * SIN * SC - gz * SC
      };
    };

    const ln = (ax: number, ay: number, az: number, bx: number, by: number, bz: number, a: number, isDark: boolean) => {
      const p = iso(ax, ay, az), q = iso(bx, by, bz);
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
      ctx.strokeStyle = isDark ? `rgba(240,239,237,${a})` : `rgba(12,12,12,${a})`; 
      ctx.lineWidth = 0.7; ctx.stroke();
    };

    const block = (x: number, y: number, h: number, a: number, isDark: boolean) => {
      const tl = iso(x, y, h), tr = iso(x + 1, y, h), br = iso(x + 1, y + 1, h), bl = iso(x, y + 1, h);
      const color = isDark ? '240,239,237' : '12,12,12';
      
      ctx.beginPath(); ctx.moveTo(tl.x, tl.y); ctx.lineTo(tr.x, tr.y); ctx.lineTo(br.x, br.y); ctx.lineTo(bl.x, bl.y); ctx.closePath();
      ctx.fillStyle = `rgba(${color},${a * 0.04})`; ctx.fill();
      ctx.strokeStyle = `rgba(${color},${a * 0.22})`; ctx.lineWidth = 0.7; ctx.stroke();
      
      const b0 = iso(x, y + 1, 0), b1 = iso(x + 1, y + 1, 0);
      ctx.beginPath(); ctx.moveTo(bl.x, bl.y); ctx.lineTo(b0.x, b0.y); ctx.lineTo(b1.x, b1.y); ctx.lineTo(br.x, br.y); ctx.closePath();
      ctx.fillStyle = `rgba(${color},${a * 0.05})`; ctx.fill();
      ctx.strokeStyle = `rgba(${color},${a * 0.12})`; ctx.stroke();
      
      const b2 = iso(x + 1, y, 0);
      ctx.beginPath(); ctx.moveTo(tr.x, tr.y); ctx.lineTo(b2.x, b2.y); ctx.lineTo(b1.x, b1.y); ctx.lineTo(br.x, br.y); ctx.closePath();
      ctx.fillStyle = `rgba(${color},${a * 0.03})`; ctx.fill();
      ctx.strokeStyle = `rgba(${color},${a * 0.08})`; ctx.stroke();
    };

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark') || resolvedTheme === 'dark';
      ctx.clearRect(0, 0, W, H);
      
      for (let i = 0; i <= 9; i++) {
        ln(i, 0, 0, i, 9, 0, 0.05, isDark);
        ln(0, i, 0, 9, i, 0, 0.05, isDark);
      }

      const blds: [number, number, number, number][] = [
        [2, 2, 5, 1], [3, 2, 7, 1], [4, 2, 6, 1], [5, 2, 4, 1], [6, 2, 3, 0.8],
        [2, 3, 3, 0.9], [3, 3, 5, 1], [4, 3, 9, 1], [5, 3, 7, 1], [6, 3, 4, 0.9],
        [3, 4, 4, 0.8], [4, 4, 6, 1], [5, 4, 5, 0.9], [6, 4, 3, 0.7],
        [2, 4, 2, 0.6], [7, 3, 2, 0.6], [1, 3, 2, 0.5],
      ];
      blds.forEach(b => block(b[0], b[1], b[2], b[3], isDark));

      ctx.setLineDash([3, 3]);
      const peaks = blds.slice(0, 6);
      for (let i = 0; i < peaks.length - 1; i++) {
        const a = peaks[i], b = peaks[i + 1];
        const pa = iso(a[0] + 0.5, a[1] + 0.5, a[2] + 0.2);
        const pb = iso(b[0] + 0.5, b[1] + 0.5, b[2] + 0.2);
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = isDark ? 'rgba(240,239,237,0.12)' : 'rgba(12,12,12,0.12)'; 
        ctx.lineWidth = 0.6; ctx.stroke();
      }
      ctx.setLineDash([]);
      blds.forEach(b => {
        const p = iso(b[0] + 0.5, b[1] + 0.5, b[2] + 0.2);
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(240,239,237,0.4)' : 'rgba(12,12,12,0.4)'; 
        ctx.fill();
      });
    };

    draw();
  }, [resolvedTheme]);

  return (
    <section id="cta">
      <div className="landing-container">
        <div className="cta-grid">
          <div className="fade">
            <h2 className="cta-h">Ready to build your<br/>future?</h2>
            <p className="cta-sub">Join thousands of students achieving their target band scores with DOshomik. Start free, succeed infinitely.</p>
            <div className="cta-btns">
              {!session ? (
                <>
                  <Link href="/register" className="btn btn-dark">Start building free →</Link>
                  <Link href="mailto:hello@doshomik.com" className="btn btn-outline">Talk to us</Link>
                </>
              ) : (
                <Link href="/dashboard" className="btn btn-dark">Go to Dashboard →</Link>
              )}
            </div>
            <p className="cta-trust">No credit card required &nbsp;·&nbsp; Free forever plan &nbsp;·&nbsp; Cancel anytime</p>
          </div>
          <div className="cta-right fade d2">
            <canvas ref={canvasRef} id="wire-canvas" width="420" height="360"></canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
