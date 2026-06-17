"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function LandingFooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const footer = footerRef.current;
    if (!canvas || !footer) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 55;
    const CONNECT_D = 140;
    const SPEED = 0.3;

    let pts: { x: number; y: number; vx: number; vy: number }[] = [];
    let W = 0, H = 0;

    const resize = () => {
      W = footer.offsetWidth;
      H = footer.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      pts = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      }));
    };

    let frameId: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.classList.contains('dark') || resolvedTheme === 'dark';
      const fg = isDark ? "255,255,255" : "0,0,0";

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += W;
        if (p.x > W) p.x -= W;
        if (p.y < 0) p.y += H;
        if (p.y > H) p.y -= H;
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_D) {
            const a = (1 - d / CONNECT_D) * (isDark ? 0.18 : 0.10);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${fg},${a.toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${fg},${isDark ? 0.35 : 0.2})`;
        ctx.fill();
      });

      frameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, [resolvedTheme]);

  return (
    <footer ref={footerRef}>
      <canvas ref={canvasRef} id="footer-canvas"></canvas>
      <div className="landing-container">
        <div className="foot-inner">
          <div>
            <Link href="/" className="foot-logo">DOshomik <span className="tm">IELTS</span></Link>
            <p className="foot-tag">The platform for every student to learn, practice, and succeed.</p>
            <div className="foot-socials">
              <Link href="#" className="foot-soc" aria-label="Twitter">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </Link>
              <Link href="#" className="foot-soc" aria-label="GitHub">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </Link>
            </div>
          </div>
          <div className="foot-links">
            <div className="foot-col">
              <h5>Product</h5>
              <ul>
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
                <li><Link href="/study">Study Modes</Link></li>
                <li><Link href="#">Mock Tests</Link></li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>Resources</h5>
              <ul>
                <li><Link href="#">Vocabulary</Link></li>
                <li><Link href="#">Grammar Guide</Link></li>
                <li><Link href="#">Writing Samples</Link></li>
                <li><Link href="#">Speaking Tips</Link></li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>Company</h5>
              <ul>
                <li><Link href="#">About</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="mailto:hello@doshomik.com">Contact</Link></li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>Legal</h5>
              <ul>
                <li><Link href="#">Privacy</Link></li>
                <li><Link href="#">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <p className="foot-copy">&copy; {new Date().getFullYear()} DOshomik. All rights reserved.</p>
          <div className="foot-legal">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
