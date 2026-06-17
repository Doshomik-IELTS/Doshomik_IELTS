import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <nav className="container-wide flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-sm">
              D
            </div>
            <span className="font-display text-lg">DOshomik</span>
            <span className="text-xs text-muted-foreground tracking-widest uppercase ml-1">
              IELTS
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/study"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Study
            </Link>
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center h-9 px-4 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="container-wide py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--muted))] border border-border text-sm text-muted-foreground mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(142_76%_36%)]" />
              IELTS preparation platform
            </div>

            <h1 className="font-display text-5xl md:text-7xl leading-tight mb-6">
              Platform to<br />
              <span className="text-muted-foreground italic">Create</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              Build skills with owned resources, practise each IELTS module,
              complete original mock tests, and see transparent unofficial band
              estimates.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              {session ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center h-12 px-8 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity gap-2"
                >
                  Go to Dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="inline-flex items-center h-12 px-8 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity gap-2"
                >
                  Start learning free
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              )}
              <Link
                href="/study"
                className="inline-flex items-center h-12 px-8 rounded-full border border-border text-sm font-medium hover:bg-[hsl(var(--muted))] transition-colors"
              >
                Try study demo
              </Link>
            </div>
          </div>
        </section>

        {/* Feature highlights */}
        <section className="border-t border-border">
          <div className="container-wide py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-display mb-3">150</div>
                <div className="text-sm text-muted-foreground">IELTS vocabulary words with Bangla meanings</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display mb-3">5</div>
                <div className="text-sm text-muted-foreground">Interactive study modes: Flashcards, Learn, Test, Match, Blast</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display mb-3">100%</div>
                <div className="text-sm text-muted-foreground">Free — no credit card required</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-wide py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              Ready to achieve your<br />target band score?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Join thousands of learners improving their IELTS skills with
              DOshomik. Start free, scale as you grow.
            </p>
            {!session && (
              <Link
                href="/register"
                className="inline-flex items-center h-12 px-8 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity gap-2"
              >
                Start learning free
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            )}
            <p className="text-xs text-muted-foreground mt-4">
              No credit card required
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-foreground text-background flex items-center justify-center text-xs font-bold">
              D
            </div>
            <span className="text-sm text-muted-foreground">
              DOshomik IELTS
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DOshomik. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
