import { TrendingUp } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500/10 p-2 ring-1 ring-emerald-500/30">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">USD Impact Radar</h1>
          </div>
          <a
            href="#"
            className="hidden rounded-md border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 transition hover:border-white/20 hover:text-white sm:inline-block"
          >
            How it works
          </a>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Track market-moving news on USD and closely linked currencies like CAD, AUD, and JPY. Filter by impact to focus on what matters.
        </p>
      </div>
    </header>
  );
}
