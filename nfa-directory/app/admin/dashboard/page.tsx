import { getAllClients, getPostsByClient } from "../../lib/data";

// NOTE: UI scaffold only — not gated by real auth yet, and the "New Post"
// form does not persist anything (there's no database write behind it).
// To make this functional:
//   1. Wire /admin (login) to real auth with nfa_admin / client roles
//   2. Replace app/lib/data.ts with real database queries
//   3. Give this page a server action (or API route) that inserts a row
//      instead of the static list below

export const metadata = { title: "Dashboard", robots: { index: false } };

export default function AdminDashboardPage() {
  const clients = getAllClients();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-signal">
        Admin
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink">
        Client Posts
      </h1>
      <p className="mt-2 text-sm text-charcoal/70">
        Every client and their posting status. Click a client to draft or
        edit their weekly entry.
      </p>

      <div className="mt-8 space-y-4">
        {clients.map((client) => {
          const clientPosts = getPostsByClient(client.slug);
          const latest = clientPosts[0];
          return (
            <div
              key={client.slug}
              className="flex items-center justify-between border-2 border-ink bg-white p-4"
            >
              <div>
                <p className="font-display text-lg font-bold text-ink">
                  {client.businessName}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-widest text-slate">
                  {clientPosts.length} posts filed
                  {latest ? ` · last: ${latest.dateISO}` : " · none yet"}
                </p>
              </div>
              <button className="border-2 border-ink px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink hover:bg-ink hover:text-paper">
                Draft new post
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-12 border-2 border-dashed border-slate p-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate">
          New Post — Draft Form (UI only, not yet saving)
        </p>
        <form className="mt-4 space-y-4">
          <select className="w-full border-2 border-ink bg-white px-3 py-2 text-sm">
            {clients.map((c) => (
              <option key={c.slug}>{c.businessName}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Post title"
            className="w-full border-2 border-ink bg-white px-3 py-2 text-sm"
          />
          <textarea
            placeholder="Post body…"
            rows={6}
            className="w-full border-2 border-ink bg-white px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper hover:bg-signal"
          >
            Publish (not yet wired)
          </button>
        </form>
      </div>
    </main>
  );
}
