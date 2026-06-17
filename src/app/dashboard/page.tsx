import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

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
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/study"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Study
            </Link>
            <Link
              href="/profile"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Profile
            </Link>
            <LogoutButton />
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 container-wide py-12">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl mb-2">
            Hello, {user.name || user.email}
          </h1>
          <p className="text-muted-foreground text-lg">
            Continue your IELTS preparation.
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/study"
            className="group rounded-2xl border border-border bg-[hsl(var(--muted))] p-6 hover:bg-[hsl(var(--border))] transition-colors no-underline"
          >
            <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            </div>
            <h3 className="font-semibold mb-1 group-hover:translate-x-0.5 transition-transform">
              Vocabulary Study
            </h3>
            <p className="text-sm text-muted-foreground">
              5 interactive modes: Flashcards, Learn, Test, Match &amp; Blast.
            </p>
          </Link>

          <div className="rounded-2xl border border-border bg-[hsl(var(--muted))] p-6 opacity-50 cursor-not-allowed">
            <div className="w-10 h-10 rounded-xl bg-muted-foreground/30 text-muted-foreground flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <h3 className="font-semibold mb-1">Writing Practice</h3>
            <p className="text-sm text-muted-foreground">
              Coming soon — AI-powered writing evaluation.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-[hsl(var(--muted))] p-6 opacity-50 cursor-not-allowed">
            <div className="w-10 h-10 rounded-xl bg-muted-foreground/30 text-muted-foreground flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>
            </div>
            <h3 className="font-semibold mb-1">Speaking Practice</h3>
            <p className="text-sm text-muted-foreground">
              Coming soon — AI speaking evaluation.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-2xl border border-border bg-[hsl(var(--muted))] p-8">
          <h2 className="text-xl font-semibold mb-6">Your Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-display">150</div>
              <div className="text-sm text-muted-foreground">Vocabulary words</div>
            </div>
            <div>
              <div className="text-3xl font-display">—</div>
              <div className="text-sm text-muted-foreground">Flashcards reviewed</div>
            </div>
            <div>
              <div className="text-3xl font-display">—</div>
              <div className="text-sm text-muted-foreground">Quizzes completed</div>
            </div>
            <div>
              <div className="text-3xl font-display">—</div>
              <div className="text-sm text-muted-foreground">Study streak</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
