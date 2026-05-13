"use client";

import React, { useMemo, useState } from "react";

const logoUrl = "/logo.png";

const deals = [
  { id: 1, month: "MAY", city: "Bali", country: "Indonesia", price: 432, save: "-32%", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80", tags: ["Beach", "Luxury", "Budget"] },
  { id: 2, month: "JUN", city: "Bangkok", country: "Thailand", price: 398, save: "-28%", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80", tags: ["Food", "Culture", "City"] },
  { id: 3, month: "JUL", city: "Lisbon", country: "Portugal", price: 455, save: "-26%", image: "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?auto=format&fit=crop&w=1200&q=80", tags: ["Europe", "Food", "Culture"] },
  { id: 4, month: "AUG", city: "Cancun", country: "Mexico", price: 499, save: "-24%", image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=1200&q=80", tags: ["Beach", "Resort", "Nightlife"] },
  { id: 5, month: "SEP", city: "Miami", country: "Florida", price: 287, save: "-21%", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", tags: ["Domestic", "Beach", "Nightlife"] },
  { id: 6, month: "NOV", city: "San Juan", country: "Puerto Rico", price: 338, save: "-29%", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", tags: ["Warm", "Beach", "No passport"] }
];

const months = ["Any Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function cx() {
  return Array.prototype.slice.call(arguments).filter(Boolean).join(" ");
}

function money(value) {
  var numberValue = Number(value);
  var safeValue = Number.isFinite(numberValue) ? numberValue : 0;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(safeValue);
}

function getDeals(search) {
  var query = String(search.query || "").toLowerCase();
  var month = search.month || "Any Month";
  var maxPrice = Number.isFinite(Number(search.maxPrice)) ? Number(search.maxPrice) : 9999;

  return deals.filter(function (deal) {
    var monthMatch = month === "Any Month" || deal.month.toLowerCase().indexOf(month.slice(0, 3).toLowerCase()) !== -1;
    var queryMatch = !query || deal.city.toLowerCase().indexOf(query) !== -1 || deal.country.toLowerCase().indexOf(query) !== -1 || deal.tags.join(" ").toLowerCase().indexOf(query) !== -1;
    var priceMatch = deal.price <= maxPrice;
    return monthMatch && queryMatch && priceMatch;
  }).sort(function (a, b) { return a.price - b.price; });
}

function runTests() {
  console.assert(money(900) === "$900", "money() should format whole dollar amounts");
  console.assert(money("bad") === "$0", "money() should safely format invalid values as $0");
  console.assert(getDeals({ query: "beach", month: "Any Month", maxPrice: 999 }).length >= 3, "Beach search should return beach deals");
  console.assert(getDeals({ query: "", month: "August", maxPrice: 999 })[0].city === "Cancun", "August should return Cancun");
  console.assert(getDeals({ query: "", month: "Any Month", maxPrice: 300 }).some(function (deal) { return deal.city === "Miami"; }), "Max price filter should include Miami under $300");
  console.assert(getDeals({ query: "xyz", month: "Any Month", maxPrice: 999 }).length === 0, "Unknown query should return zero results");
}

if (typeof window !== "undefined") runTests();

function Button(props) {
  return <button type={props.type || "button"} onClick={props.onClick} className={cx("inline-flex items-center justify-center rounded-xl font-semibold transition duration-200 active:scale-[0.98]", props.className)}>{props.children}</button>;
}

function Field(props) {
  return (
    <label className="rounded-xl border border-purple-400/15 bg-zinc-950/70 p-4 text-white">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{props.label}</span>
      {props.children}
    </label>
  );
}

export default function BoueeTravelSite() {
  const [from, setFrom] = useState("Anywhere");
  const [to, setTo] = useState("Anywhere");
  const [month, setMonth] = useState("Any Month");
  const [traveler, setTraveler] = useState("1 Traveler");
  const [maxPrice, setMaxPrice] = useState(600);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [saved, setSaved] = useState([]);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const results = useMemo(function () {
    return getDeals({ query: query, month: month, maxPrice: maxPrice });
  }, [query, month, maxPrice]);

  function toggleSave(id) {
    setSaved(function (current) {
      return current.indexOf(id) !== -1 ? current.filter(function (item) { return item !== id; }) : current.concat([id]);
    });
  }

  function joinWaitlist(event) {
    event.preventDefault();
    if (email.trim()) setJoined(true);
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#050208] text-white">
      <style>{".glass{box-shadow:0 22px 80px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.06)}.purple-grid{background-image:linear-gradient(rgba(168,85,247,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,.06) 1px,transparent 1px);background-size:48px 48px}.logo-glow{filter:drop-shadow(0 0 16px rgba(168,85,247,.55))}.hero-logo{filter:drop-shadow(0 0 45px rgba(168,85,247,.55))}"}</style>

      <div className="pointer-events-none fixed inset-0 purple-grid opacity-40" />
      <div className="pointer-events-none fixed -left-40 top-0 h-[520px] w-[520px] rounded-full bg-purple-800/25 blur-[120px]" />
      <div className="pointer-events-none fixed right-[-180px] top-24 h-[460px] w-[460px] rounded-full bg-fuchsia-700/20 blur-[120px]" />

      <header className="relative z-10 border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <img src={logoUrl} alt="Bouee logo" className="logo-glow h-12 w-12 rounded-full object-cover mix-blend-screen" />
            <span className="bg-gradient-to-r from-purple-200 via-fuchsia-200 to-white bg-clip-text text-2xl font-black uppercase tracking-[0.22em] text-transparent">BOUEE</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-zinc-300 md:flex">
            <a href="#explore" className="hover:text-white">Explore</a>
            <a href="#months" className="hover:text-white">Best Months</a>
            <a href="#planner" className="hover:text-white">Trip Planner</a>
            <a href="#deals" className="hover:text-white">Deals</a>
            <a href="#alerts" className="hover:text-white">Alerts</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden items-center gap-2 text-sm font-semibold text-white sm:flex"><span className="text-purple-300">♡</span> Saved</button>
            <Button className="border border-purple-500/50 bg-black px-5 py-3 text-white hover:bg-purple-950/70">Sign In</Button>
          </div>
        </nav>
      </header>

      <main id="top" className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
        <section className="glass mt-6 overflow-hidden rounded-[2rem] border border-purple-500/15 bg-black/50">
          <div className="grid min-h-[560px] gap-10 p-8 md:grid-cols-[1fr_1.05fr] md:p-16">
            <div className="flex flex-col justify-center">
              <div className="mb-5 w-fit rounded-full border border-purple-500/30 bg-purple-950/50 px-4 py-2 text-sm font-semibold text-purple-100">Curated Travel Deals</div>
              <h1 className="max-w-xl text-5xl font-black leading-[1.05] md:text-6xl">
                Find the cheapest places to go, <span className="bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">any month.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-300">Bouee helps you compare affordable flights, stays, and destinations so you can book more and experience more.</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#months"><Button className="bg-gradient-to-r from-purple-700 to-fuchsia-600 px-8 py-4 text-white shadow-xl shadow-purple-900/30 hover:from-purple-600 hover:to-fuchsia-500">Explore Destinations <span className="ml-2">→</span></Button></a>
                <a href="#planner"><Button className="border border-purple-500/60 bg-black/40 px-8 py-4 text-purple-100 hover:bg-purple-950/60">Plan My Trip</Button></a>
              </div>
            </div>
            <div className="relative flex items-center justify-center overflow-hidden rounded-[1.5rem]">
              <div className="absolute h-[430px] w-[430px] rounded-full bg-purple-700/20 blur-[90px]" />
              <img src={logoUrl} alt="Bouee travel logo" className="hero-logo relative z-10 max-h-[520px] w-full max-w-[560px] object-contain mix-blend-screen opacity-95" />
            </div>
          </div>
        </section>

        <section id="explore" className="glass -mt-8 mx-auto max-w-6xl rounded-[1.5rem] border border-purple-500/20 bg-[#08040f]/95 p-4 backdrop-blur-xl">
          <div className="mb-4 grid gap-2 text-sm font-semibold text-zinc-200 md:grid-cols-4">
            <button className="rounded-xl bg-purple-900/70 px-4 py-3 text-white">Anywhere</button>
            <button className="rounded-xl px-4 py-3 hover:bg-purple-950/50">Cheapest by Month</button>
            <button className="rounded-xl px-4 py-3 hover:bg-purple-950/50">Specific Dates</button>
            <button className="rounded-xl px-4 py-3 hover:bg-purple-950/50">Multi-City</button>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_0.85fr_0.85fr]">
            <Field label="From"><input value={from} onChange={function (e) { setFrom(e.target.value); }} className="w-full bg-transparent font-bold outline-none" /></Field>
            <Field label="To"><input value={to} onChange={function (e) { setTo(e.target.value); setQuery(e.target.value === "Anywhere" ? "" : e.target.value); }} className="w-full bg-transparent font-bold outline-none" /></Field>
            <Field label="Month"><select value={month} onChange={function (e) { setMonth(e.target.value); }} className="w-full bg-zinc-950 font-bold outline-none">{months.map(function (item) { return <option key={item}>{item}</option>; })}</select></Field>
            <Field label="Travelers"><input value={traveler} onChange={function (e) { setTraveler(e.target.value); }} className="w-full bg-transparent font-bold outline-none" /></Field>
            <Button onClick={function () { setSearched(true); }} className="min-h-[74px] bg-gradient-to-r from-purple-700 to-fuchsia-600 px-8 text-white shadow-lg shadow-purple-900/30 hover:from-purple-600 hover:to-fuchsia-500">Search</Button>
          </div>
          <div className="mt-4 flex flex-col justify-between gap-3 text-sm text-zinc-300 sm:flex-row sm:items-center">
            <label className="flex items-center gap-3">Max price <input type="range" min="250" max="1000" value={maxPrice} onChange={function (e) { setMaxPrice(e.target.value); }} /> <b className="text-purple-200">{money(maxPrice)}</b></label>
            <button className="text-right text-zinc-300">Advanced Filters</button>
          </div>
        </section>

        <section className="glass mt-2 grid gap-6 rounded-[1.5rem] border border-purple-500/15 bg-black/60 p-6 md:grid-cols-4">
          {[
            ["✦", "Curated Picks", "Hand-selected deals for better trips"],
            ["$", "Low Fare Focus", "Built around affordable pricing"],
            ["↘", "Price Drop Alerts", "Get notified when prices fall"],
            ["✓", "Secure & Trusted", "Simple planning with privacy in mind"]
          ].map(function (item) {
            return <div key={item[1]} className="flex items-center gap-4 border-purple-500/20 md:border-r md:last:border-r-0"><div className="rounded-2xl bg-purple-900/40 p-3 text-2xl text-purple-200">{item[0]}</div><div><h3 className="font-black">{item[1]}</h3><p className="text-sm text-zinc-400">{item[2]}</p></div></div>;
          })}
        </section>

        {searched && <div className="mt-8 rounded-3xl border border-purple-500/30 bg-purple-950/40 p-5 text-purple-100">Bouee found {results.length} deal{results.length === 1 ? "" : "s"} under {money(maxPrice)}.</div>}

        <section id="months" className="mt-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div><h2 className="text-3xl font-black">Cheapest Destinations by Month</h2><div className="mt-2 h-1 w-24 rounded-full bg-purple-600" /></div>
            <Button className="border border-purple-500/50 bg-black/40 px-5 py-3 text-purple-100 hover:bg-purple-950/60">View All Months</Button>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {(results.length ? results : deals.slice(0, 4)).slice(0, 4).map(function (deal) {
              return (
                <article id="deals" key={deal.id} className="glass overflow-hidden rounded-2xl border border-purple-500/20 bg-zinc-950/90 transition hover:-translate-y-1">
                  <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: "url(" + deal.image + ")" }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-lg bg-gradient-to-r from-purple-700 to-fuchsia-600 px-4 py-2 text-xs font-black">{deal.month}</span>
                    <button onClick={function () { toggleSave(deal.id); }} className="absolute right-4 top-4 text-3xl text-white drop-shadow-lg">{saved.indexOf(deal.id) !== -1 ? "♥" : "♡"}</button>
                    <div className="absolute bottom-4 left-4 right-4">

<a
  href="https://kiwi.tpx.li/BgXbXSJ8"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 inline-flex rounded-xl bg-purple-600 px-4 py-3 font-bold text-white hover:bg-purple-500"
>
  View Flights
</a>

                      <h3 className="text-xl font-black">{deal.city}, {deal.country}</h3>
                      <p className="mt-2 text-sm text-zinc-300">from <span className="text-2xl font-black text-purple-300">{money(deal.price)}</span> <span className="ml-2 rounded-full bg-green-700/70 px-2 py-1 text-xs text-green-100">{deal.save}</span> <span className="text-xs">vs avg.</span></p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="planner" className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="glass rounded-[2rem] border border-purple-500/20 bg-zinc-950/90 p-8">
            <div className="mb-4 inline-flex rounded-2xl bg-purple-600/20 p-3 text-2xl">✦</div>
            <h2 className="text-3xl font-black">Trip Planning</h2>
            <p className="mt-3 text-zinc-300">Pick a destination and Bouee helps you outline a simple budget plan with flights, stays, food, transportation, and activities.</p>
            <div className="mt-6 rounded-3xl border border-purple-400/10 bg-black p-5 text-zinc-200">Plan a 4-day beach trip under $600 next month.</div>
          </div>
         <div className="glass rounded-[2rem] border border-purple-500/20 bg-gradient-to-br from-purple-950 via-fuchsia-950 to-black p-8">
  <h2 className="text-3xl font-black">
    Get Exclusive Travel Deals Before Everyone Else
  </h2>

  <p className="mt-3 text-zinc-300">
    Join the Bouee list for curated destinations, price drops, and limited travel offers.
  </p>

  <div className="mt-6 h-[420px] overflow-hidden rounded-2xl border border-purple-400/20 bg-black/40">
    <iframe
      data-tally-src="https://tally.so/r/Ekvp8o?formEventsForwarding=1"
      width="100%"
      height="100%"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
      title="Get Exclusive Travel Deals Before Everyone Else"
    ></iframe>
  </div>

  <script async src="https://tally.so/widgets/embed.js"></script>
</div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black px-6 py-8 text-center text-sm text-zinc-500">© 2026 Bouee. Book more. Experience more.</footer>
    </div>
  );
}
