export default function StatsBar({ items }) {
  const totals = items.reduce(
    (acc, n) => {
      acc.total++;
      acc[n.impact] = (acc[n.impact] || 0) + 1;
      acc[n.currency] = (acc[n.currency] || 0) + 1;
      return acc;
    },
    { total: 0 }
  );

  const chips = [
    { label: "High", value: totals.High || 0, color: "bg-red-500/10 text-red-300 border-red-400/30" },
    { label: "Medium", value: totals.Medium || 0, color: "bg-amber-500/10 text-amber-300 border-amber-400/30" },
    { label: "Low", value: totals.Low || 0, color: "bg-sky-500/10 text-sky-300 border-sky-400/30" },
  ];

  return (
    <section className="w-full bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-300">
            Showing <span className="font-semibold text-white">{totals.total}</span> headlines
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <span
                key={c.label}
                className={`rounded-md border px-2 py-1 text-xs ${c.color}`}
              >
                {c.label}: <span className="font-semibold">{c.value}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
