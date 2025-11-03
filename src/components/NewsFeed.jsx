import { Clock, ExternalLink } from "lucide-react";

const sentimentColor = (s) =>
  s === "bullish"
    ? "text-emerald-300"
    : s === "bearish"
    ? "text-red-300"
    : "text-slate-300";

const impactBadge = (imp) => {
  switch (imp) {
    case "High":
      return "bg-red-500/10 text-red-300 ring-1 ring-red-400/30";
    case "Medium":
      return "bg-amber-500/10 text-amber-300 ring-1 ring-amber-400/30";
    default:
      return "bg-sky-500/10 text-sky-300 ring-1 ring-sky-400/30";
  }
};

function formatMinutesAgo(mins) {
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h < 24) return m ? `${h}h ${m}m ago` : `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function NewsCard({ item, density }) {
  const dense = density === "compact";
  return (
    <article
      className={`${
        dense ? "p-3" : "p-4"
      } group rounded-xl border border-white/10 bg-slate-900/60 transition hover:border-white/20`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className={`rounded-md px-2 py-0.5 text-[10px] ${impactBadge(item.impact)}`}>
              {item.impact} impact
            </span>
            <span className="rounded-md border border-white/10 bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
              {item.currency}
            </span>
            {item.sentiment && (
              <span className={`text-[10px] ${sentimentColor(item.sentiment)}`}>
                {item.sentiment}
              </span>
            )}
          </div>
          <h3 className={`${dense ? "text-[13px]" : "text-sm"} font-medium text-white`}>
            {item.title}
          </h3>
          <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
            <span className="truncate">{item.source}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {formatMinutesAgo(item.minutesAgo)}
            </span>
          </div>
        </div>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-slate-800 text-slate-300 transition hover:border-white/20 hover:text-white"
            aria-label="Open source"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function NewsFeed({ items, density }) {
  if (!items.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center">
          <p className="text-sm text-slate-300">
            No headlines match your filters. Try selecting more currencies, expanding impact levels,
            or clearing the search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className={`grid grid-cols-1 gap-4 md:grid-cols-2`}>
        {items.map((item) => (
          <NewsCard key={item.id} item={item} density={density} />
        ))}
      </div>
    </section>
  );
}
