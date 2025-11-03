import { useMemo } from "react";
import { Search, Filter, RefreshCcw } from "lucide-react";

const ALL_CURRENCIES = ["USD", "CAD", "AUD", "JPY", "EUR", "GBP", "CHF", "NZD"];
const IMPACTS = ["High", "Medium", "Low"];

export default function FiltersBar({
  selectedCurrencies,
  setSelectedCurrencies,
  selectedImpacts,
  setSelectedImpacts,
  search,
  setSearch,
}) {
  const allSelected = useMemo(
    () => selectedCurrencies.length === ALL_CURRENCIES.length,
    [selectedCurrencies]
  );

  const toggleCurrency = (ccy) => {
    setSelectedCurrencies((prev) =>
      prev.includes(ccy) ? prev.filter((c) => c !== ccy) : [...prev, ccy]
    );
  };

  const toggleImpact = (imp) => {
    setSelectedImpacts((prev) =>
      prev.includes(imp) ? prev.filter((i) => i !== imp) : [...prev, imp]
    );
  };

  const selectAllCurrencies = () => setSelectedCurrencies(ALL_CURRENCIES);
  const clearToCore = () => setSelectedCurrencies(["USD", "CAD", "AUD", "JPY"]);
  const resetAll = () => {
    setSelectedCurrencies(["USD", "CAD", "AUD", "JPY"]);
    setSelectedImpacts(["High", "Medium", "Low"]);
    setSearch("");
  };

  return (
    <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-slate-200">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search headlines, sources, keywords"
              aria-label="Search headlines"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="rounded px-1.5 py-0.5 text-xs text-slate-400 hover:text-white"
                aria-label="Clear search"
              >
                clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-xs text-slate-300">
              <Filter className="h-3.5 w-3.5" /> Filters
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {ALL_CURRENCIES.map((ccy) => (
                <button
                  key={ccy}
                  onClick={() => toggleCurrency(ccy)}
                  className={`rounded-md border px-2 py-1 text-xs transition ${
                    selectedCurrencies.includes(ccy)
                      ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                      : "border-white/10 bg-slate-900 text-slate-300 hover:border-white/20"
                  }`}
                  aria-pressed={selectedCurrencies.includes(ccy)}
                >
                  {ccy}
                </button>
              ))}
              <button
                onClick={allSelected ? clearToCore : selectAllCurrencies}
                className="rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-xs text-slate-300 hover:border-white/20"
              >
                {allSelected ? "Core (USD, CAD, AUD, JPY)" : "Select all"}
              </button>
            </div>

            <div className="ml-2 flex items-center gap-2">
              {IMPACTS.map((imp) => (
                <button
                  key={imp}
                  onClick={() => toggleImpact(imp)}
                  className={`rounded-md border px-2 py-1 text-xs transition ${
                    selectedImpacts.includes(imp)
                      ? impactClasses(imp).active
                      : "border-white/10 bg-slate-900 text-slate-300 hover:border-white/20"
                  }`}
                  aria-pressed={selectedImpacts.includes(imp)}
                >
                  {imp}
                </button>
              ))}
            </div>

            <button
              onClick={resetAll}
              className="ml-2 inline-flex items-center gap-1 rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-xs text-slate-300 transition hover:border-white/20 hover:text-white"
              aria-label="Reset all filters"
              title="Reset all filters"
            >
              <RefreshCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span>
            Selected currencies: <span className="text-white">{selectedCurrencies.length}</span>
          </span>
          <span>
            Impact levels: <span className="text-white">{selectedImpacts.length}</span>
          </span>
          {search && (
            <span>
              Search: <span className="text-white">“{search}”</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function impactClasses(imp) {
  switch (imp) {
    case "High":
      return { active: "border-red-400/30 bg-red-500/10 text-red-300" };
    case "Medium":
      return { active: "border-amber-400/30 bg-amber-500/10 text-amber-300" };
    default:
      return { active: "border-sky-400/30 bg-sky-500/10 text-sky-300" };
  }
}
