import Link from "next/link";

// NOTE: This is a UI scaffold only. There is no real authentication wired
// up yet. Before this goes live, this form needs to be connected to a
// real auth provider (e.g. Supabase Auth or NextAuth) with two roles:
//   - "nfa_admin": sees every client and every post
//   - "client": scoped to only their own client profile's posts
// The <form> below currently does nothing on submit — it's here to
// show the intended layout.

export const metadata = { title: "Admin Login", robots: { index: false } };

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-signal">
        Admin
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink">
        Sign in
      </h1>
      <p className="mt-2 text-sm text-charcoal/70">
        NFA team and client logins share this screen — access is scoped by
        role after sign-in.
      </p>

      <form className="mt-8 space-y-4">
        <div>
          <label className="font-mono text-[11px] uppercase tracking-widest text-slate">
            Email
          </label>
          <input
            type="email"
            className="mt-1 w-full border-2 border-ink bg-white px-3 py-2 text-sm"
            placeholder="you@newfoundagency.com"
          />
        </div>
        <div>
          <label className="font-mono text-[11px] uppercase tracking-widest text-slate">
            Password
          </label>
          <input
            type="password"
            className="mt-1 w-full border-2 border-ink bg-white px-3 py-2 text-sm"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper hover:bg-signal"
        >
          Sign In (not yet wired to auth)
        </button>
      </form>

      <Link
        href="/admin/dashboard"
        className="mt-6 text-center font-mono text-[11px] uppercase tracking-widest text-slate hover:text-signal"
      >
        Preview dashboard layout →
      </Link>
    </main>
  );
}
