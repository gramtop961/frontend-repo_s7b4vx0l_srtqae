import { LayoutList, LayoutGrid } from "lucide-react";

export default function ControlsBar({ sortBy, setSortBy, density, setDensity }) {
  return (
    <div className="w-full bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <label htmlFor="sort" className="text-slate-400">Sort by</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-sm text-slate-200 outline-none hover:border-white/20"
            >
              <option value="time_desc">Newest first</option>
              <option value="time_asc">Oldest first</option>
              <option value="impact_desc">Impact: High → Low</option>
              <option value="impact_asc">Impact: Low → High</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-300">
            <span className="text-slate-400">Density</span>
            <div className="inline-flex overflow-hidden rounded-md border border-white/10">
              <button
                className={`flex items-center gap-1 px-3 py-1 transition ${
                  density === "comfortable"
                    ? "bg-slate-800 text-white"
                    : "bg-slate-900 text-slate-300 hover:text-white"
                }`}
                onClick={() => setDensity("comfortable")}
                aria-pressed={density === "comfortable"}
              >
                <LayoutGrid className="h-4 w-4" /> Comfortable
              </button>
              <button
                className={`flex items-center gap-1 px-3 py-1 transition ${
                  density === "compact"
                    ? "bg-slate-800 text-white"
                    : "bg-slate-900 text-slate-300 hover:text-white"
                }`}
                onClick={() => setDensity("compact")}
                aria-pressed={density === "compact"}
              >
                <LayoutList className="h-4 w-4" /> Compact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
