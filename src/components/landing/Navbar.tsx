"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import type { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session | null;

export default function LandingNavbar({ session }: { session: Session }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header id="nav" className={scrolled ? "pill" : "top"}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            DOshomik <span className="tm">IELTS</span>
          </Link>
          <ul className="nav-links">
            <li><Link href="#features">Features</Link></li>
            <li><Link href="#how">How it works</Link></li>
            <li><Link href="#study">Study</Link></li>
            <li><Link href="#pricing">Pricing</Link></li>
          </ul>
          <div className="nav-right">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme} 
              aria-label="Toggle dark mode"
            >
              <svg className="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              <svg className="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </button>
            {session ? (
              <Link href="/dashboard" className="btn-nav">Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="nav-signin">Sign in</Link>
                <Link href="/register" className="btn-nav">Start learning</Link>
              </>
            )}
            <button 
              className={`nav-burger ${mobileOpen ? 'open' : ''}`} 
              onClick={() => setMobileOpen(!mobileOpen)} 
              aria-label="Menu"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} id="mobile-menu">
        <div className="mobile-menu-inner">
          <Link href="#features" className="mob-link" onClick={() => setMobileOpen(false)}>Features</Link>
          <Link href="#how" className="mob-link" onClick={() => setMobileOpen(false)}>How it works</Link>
          <Link href="#study" className="mob-link" onClick={() => setMobileOpen(false)}>Study</Link>
          <Link href="#pricing" className="mob-link" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <div className="mob-actions">
            {!session ? (
              <>
                <Link href="/login" className="btn btn-outline" style={{justifyContent:'center'}}>Sign in</Link>
                <Link href="/register" className="btn btn-dark" style={{justifyContent:'center'}}>Start learning</Link>
              </>
            ) : (
              <Link href="/dashboard" className="btn btn-dark" style={{justifyContent:'center'}}>Dashboard</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
