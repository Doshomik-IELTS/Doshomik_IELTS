import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function ProfilePage() {
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
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/study"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Study
            </Link>
            <LogoutButton />
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 container-wide py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-4xl mb-8">Profile</h1>

          <div className="rounded-2xl border border-border bg-[hsl(var(--muted))] p-8 space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-border">
              <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center text-2xl font-bold">
                {(user.name || user.email || "?").charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-xl font-semibold">{user.name || "Unnamed"}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Name</label>
                <div className="text-foreground">{user.name || "—"}</div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Email</label>
                <div className="text-foreground">{user.email}</div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Email verified</label>
                <div className="text-foreground">
                  {user.emailVerified ? (
                    <span className="text-[hsl(var(--color-success))]">Yes</span>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">User ID</label>
                <div className="text-sm font-mono text-muted-foreground">{user.id}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
