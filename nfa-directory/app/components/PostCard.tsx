import Link from "next/link";
import { BlogPost } from "../lib/data";

export default function PostCard({
  post,
  href,
}: {
  post: BlogPost;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block border-l-2 border-ink py-4 pl-5 transition-colors hover:border-signal"
    >
      <p className="font-mono text-[11px] uppercase tracking-widest text-slate">
        {post.logNumber} — {post.dateISO}
      </p>
      <h3 className="mt-1 font-display text-lg font-bold text-ink group-hover:text-signal">
        {post.title}
      </h3>
      <p className="mt-1 text-sm text-charcoal/80">{post.excerpt}</p>
    </Link>
  );
}
