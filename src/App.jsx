import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import FiltersBar from "./components/FiltersBar.jsx";
import StatsBar from "./components/StatsBar.jsx";
import NewsFeed from "./components/NewsFeed.jsx";

// Mock headlines to demonstrate the experience without any API calls.
const MOCK_NEWS = [
  {
    id: 1,
    currency: "USD",
    impact: "High",
    title: "US CPI beats expectations; Fed path repriced higher",
    source: "Bloomberg",
    time: "8m ago",
    url: "https://www.bloomberg.com/",
    sentiment: "bullish",
  },
  {
    id: 2,
    currency: "JPY",
    impact: "High",
    title: "BoJ hints at policy tweak as yen volatility persists",
    source: "Reuters",
    time: "14m ago",
    url: "https://www.reuters.com/",
    sentiment: "bearish",
  },
  {
    id: 3,
    currency: "CAD",
    impact: "Medium",
    title: "Canada jobs data mixed; loonie trims gains",
    source: "Financial Post",
    time: "32m ago",
    url: "https://financialpost.com/",
    sentiment: "neutral",
  },
  {
    id: 4,
    currency: "AUD",
    impact: "High",
    title: "RBA minutes flag inflation persistence; AUD pops",
    source: "The Sydney Morning Herald",
    time: "47m ago",
    url: "https://www.smh.com.au/",
    sentiment: "bullish",
  },
  {
    id: 5,
    currency: "EUR",
    impact: "Low",
    title: "Eurozone trade surplus widens on energy prices",
    source: "FT",
    time: "1h ago",
    url: "https://www.ft.com/",
    sentiment: "neutral",
  },
  {
    id: 6,
    currency: "GBP",
    impact: "Medium",
    title: "UK wage growth cools; BoE dovish bets rise",
    source: "The Guardian",
    time: "1h ago",
    url: "https://www.theguardian.com/",
    sentiment: "bearish",
  },
  {
    id: 7,
    currency: "USD",
    impact: "Low",
    title: "US housing permits edge higher; builders upbeat",
    source: "CNBC",
    time: "2h ago",
    url: "https://www.cnbc.com/",
    sentiment: "bullish",
  },
  {
    id: 8,
    currency: "JPY",
    impact: "Medium",
    title: "Japan trade balance narrows; exporters buoyed",
    source: "Nikkei",
    time: "2h ago",
    url: "https://asia.nikkei.com/",
    sentiment: "bullish",
  },
];

export default function App() {
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "USD",
    "CAD",
    "AUD",
    "JPY",
  ]);
  const [selectedImpacts, setSelectedImpacts] = useState(["High", "Medium", "Low"]);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return MOCK_NEWS.filter((n) =>
      selectedCurrencies.includes(n.currency) &&
      selectedImpacts.includes(n.impact) &&
      (n.title.toLowerCase().includes(q) || n.source.toLowerCase().includes(q))
    );
  }, [selectedCurrencies, selectedImpacts, search]);

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
      <StatsBar items={filtered} />
      <NewsFeed items={filtered} />

      <footer className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-slate-400">
        Data shown is sample-only. Live data can be wired up later via a secure backend API.
      </footer>
    </div>
  );
}
