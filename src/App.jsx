import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import FiltersBar from "./components/FiltersBar.jsx";
import ControlsBar from "./components/ControlsBar.jsx";
import StatsBar from "./components/StatsBar.jsx";
import NewsFeed from "./components/NewsFeed.jsx";
import CurrencyCharts from "./components/CurrencyCharts.jsx";

// Mock headlines to demonstrate the experience without any API calls.
const MOCK_NEWS = [
  {
    id: 1,
    currency: "USD",
    impact: "High",
    title: "US CPI beats expectations; Fed path repriced higher",
    source: "Bloomberg",
    minutesAgo: 8,
    url: "https://www.bloomberg.com/",
    sentiment: "bullish",
  },
  {
    id: 2,
    currency: "JPY",
    impact: "High",
    title: "BoJ hints at policy tweak as yen volatility persists",
    source: "Reuters",
    minutesAgo: 14,
    url: "https://www.reuters.com/",
    sentiment: "bearish",
  },
  {
    id: 3,
    currency: "CAD",
    impact: "Medium",
    title: "Canada jobs data mixed; loonie trims gains",
    source: "Financial Post",
    minutesAgo: 32,
    url: "https://financialpost.com/",
    sentiment: "neutral",
  },
  {
    id: 4,
    currency: "AUD",
    impact: "High",
    title: "RBA minutes flag inflation persistence; AUD pops",
    source: "The Sydney Morning Herald",
    minutesAgo: 47,
    url: "https://www.smh.com.au/",
    sentiment: "bullish",
  },
  {
    id: 5,
    currency: "EUR",
    impact: "Low",
    title: "Eurozone trade surplus widens on energy prices",
    source: "FT",
    minutesAgo: 64,
    url: "https://www.ft.com/",
    sentiment: "neutral",
  },
  {
    id: 6,
    currency: "GBP",
    impact: "Medium",
    title: "UK wage growth cools; BoE dovish bets rise",
    source: "The Guardian",
    minutesAgo: 75,
    url: "https://www.theguardian.com/",
    sentiment: "bearish",
  },
  {
    id: 7,
    currency: "USD",
    impact: "Low",
    title: "US housing permits edge higher; builders upbeat",
    source: "CNBC",
    minutesAgo: 120,
    url: "https://www.cnbc.com/",
    sentiment: "bullish",
  },
  {
    id: 8,
    currency: "JPY",
    impact: "Medium",
    title: "Japan trade balance narrows; exporters buoyed",
    source: "Nikkei",
    minutesAgo: 131,
    url: "https://asia.nikkei.com/",
    sentiment: "bullish",
  },
];

const impactRank = { High: 3, Medium: 2, Low: 1 };

export default function App() {
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "USD",
    "CAD",
    "AUD",
    "JPY",
  ]);
  const [selectedImpacts, setSelectedImpacts] = useState(["High", "Medium", "Low"]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("time_desc");
  const [density, setDensity] = useState("comfortable");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return MOCK_NEWS.filter((n) =>
      selectedCurrencies.includes(n.currency) &&
      selectedImpacts.includes(n.impact) &&
      (n.title.toLowerCase().includes(q) || n.source.toLowerCase().includes(q))
    );
  }, [selectedCurrencies, selectedImpacts, search]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "time_asc":
        return arr.sort((a, b) => a.minutesAgo - b.minutesAgo);
      case "impact_desc":
        return arr.sort((a, b) => impactRank[b.impact] - impactRank[a.impact] || a.minutesAgo - b.minutesAgo);
      case "impact_asc":
        return arr.sort((a, b) => impactRank[a.impact] - impactRank[b.impact] || a.minutesAgo - b.minutesAgo);
      case "time_desc":
      default:
        return arr.sort((a, b) => b.minutesAgo - a.minutesAgo);
    }
  }, [filtered, sortBy]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <FiltersBar
        selectedCurrencies={selectedCurrencies}
        setSelectedCurrencies={setSelectedCurrencies}
        selectedImpacts={selectedImpacts}
        setSelectedImpacts={setSelectedImpacts}
        search={search}
        setSearch={setSearch}
      />
      <ControlsBar sortBy={sortBy} setSortBy={setSortBy} density={density} setDensity={setDensity} />
      <StatsBar items={sorted} />
      <CurrencyCharts items={sorted} />
      <NewsFeed items={sorted} density={density} />

      <footer className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-slate-400">
        Data shown is sample-only. Live data can be wired up later via a secure backend API.
      </footer>
    </div>
  );
}
