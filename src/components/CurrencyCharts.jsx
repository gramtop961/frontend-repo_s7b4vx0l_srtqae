import React, { useMemo } from "react";

const IMPACTS = ["High", "Medium", "Low"]; // order for consistent colors
const COLORS = {
  High: "#ef4444", // red-500
  Medium: "#f59e0b", // amber-500
  Low: "#22c55e", // green-500
};

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
      {IMPACTS.map((lvl) => (
        <div key={lvl} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: COLORS[lvl] }} />
          <span>{lvl} impact</span>
        </div>
      ))}
    </div>
  );
}

// Simple stacked bar chart using divs so we don't need a charting library
function StackedBar({ data }) {
  const total = IMPACTS.reduce((sum, lvl) => sum + (data[lvl] || 0), 0);
  if (total === 0) {
    return <div className="h-2 w-full rounded bg-slate-800" />;
  }
  return (
    <div className="flex h-2 w-full overflow-hidden rounded bg-slate-800">
      {IMPACTS.map((lvl) => {
        const v = data[lvl] || 0;
        const w = (v / total) * 100;
        return (
          <div
            key={lvl}
            className="h-full"
            style={{ width: `${w}%`, backgroundColor: COLORS[lvl] }}
            title={`${lvl}: ${v}`}
          />
        );
      })}
    </div>
  );
}

export default function CurrencyCharts({ items }) {
  const { byCurrency, totals, overall } = useMemo(() => {
    const byCurrency = {};
    const totals = {};
    const overall = { High: 0, Medium: 0, Low: 0 };

    items.forEach((n) => {
      if (!byCurrency[n.currency]) {
        byCurrency[n.currency] = { High: 0, Medium: 0, Low: 0 };
      }
      byCurrency[n.currency][n.impact] += 1;
      totals[n.currency] = (totals[n.currency] || 0) + 1;
      overall[n.impact] += 1;
    });

    // sort currencies by total desc
    const sortedEntries = Object.entries(byCurrency).sort(
      (a, b) => (totals[b[0]] || 0) - (totals[a[0]] || 0)
    );

    return { byCurrency: Object.fromEntries(sortedEntries), totals, overall };
  }, [items]);

  const totalHeadlines = items.length;

  return (
    <section className="mx-auto my-6 max-w-6xl px-4">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Major Currencies Overview</h2>
          <p className="text-sm text-slate-400">Headline distribution across currencies and impact levels.</p>
        </div>
        <Legend />
      </div>

      {/* Bars by currency */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
        <div className="grid grid-cols-12 gap-0 border-b border-slate-800/60 px-4 py-3 text-xs uppercase tracking-wide text-slate-400">
          <div className="col-span-2">Currency</div>
          <div className="col-span-8">Impact mix</div>
          <div className="col-span-2 text-right">Total</div>
        </div>
        <div className="divide-y divide-slate-800/60">
          {Object.keys(byCurrency).length === 0 ? (
            <div className="px-4 py-8 text-center text-slate-400">
              No data for the current filters.
            </div>
          ) : (
            Object.entries(byCurrency).map(([ccy, impacts]) => (
              <div key={ccy} className="grid grid-cols-12 items-center gap-3 px-4 py-3">
                <div className="col-span-2 font-medium text-slate-200">{ccy}</div>
                <div className="col-span-8">
                  <StackedBar data={impacts} />
                </div>
                <div className="col-span-2 text-right text-slate-300">{totals[ccy] || 0}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Overall summary mini-bars */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {IMPACTS.map((lvl) => (
          <div key={lvl} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-slate-300">{lvl} impact</span>
              <span className="text-sm font-semibold text-white">{overall[lvl]}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded bg-slate-800">
              <div
                className="h-full"
                style={{
                  width: `${totalHeadlines ? (overall[lvl] / totalHeadlines) * 100 : 0}%`,
                  backgroundColor: COLORS[lvl],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
