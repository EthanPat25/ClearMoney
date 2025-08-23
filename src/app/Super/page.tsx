"use client"

import React, { useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

/**
 * ClearMoney – Career Break Super Gap
 * ---------------------------------------------------------
 * A single-page React component (Tailwind) that implements the
 * layout you described:
 *  - Inputs (left) → Results card (right)
 *  - Gap breakdown and comfortable benchmark
 *  - Tabs: In Everyday Terms / Why This Matters / Case Study
 *  - "Close the Gap" module with a Chart.js line chart
 *
 * Notes
 *  - Assumptions and math here are intentionally simple so you can
 *    wire in your own projection engine later. The code is organised
 *    so you can replace `projectBalances` with your server result or
 *    more rigorous calcs without touching the UI.
 *  - Tailwind classes assume you already have Tailwind set up.
 *  - Dependencies: react-chartjs-2, chart.js
 *
 *    npm i react-chartjs-2 chart.js
 */

// ---------------------------- Types ----------------------------

type BreakPeriod = { years: number; workFraction: number } // e.g., 0.0 = no work, 0.5 = 50% hours

type ProjectionInput = {
  currentAge: number
  retireAge: number
  salary: number // annual, before-tax
  sgRate: number // e.g., 11.5 (percent)
  currentSuper: number
  returnRate: number // nominal, percent
  inflation: number // percent
  breaks: BreakPeriod[]
  voluntaryPerYear: number // optional extra (pre-tax or post-tax not modelled here)
}

// ------------------------- Utilities --------------------------

function currency(n: number) {
  if (!isFinite(n)) return '$0'
  return n.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n))
}

// Simple annual projection (illustrative):
// - Each year: balance = (balance + contributions) * (1 + r)
// - r = nominalReturn - inflationAdj? We allow an inflation toggle at the UI level.
// - SG contributions = salary * sgRate * workFraction
// - workFraction defaults to 1.0 unless inside a break period window.
// - voluntary contributions are added as flat annual dollars.
function projectBalances(
  inp: ProjectionInput,
  options: { adjustForInflation: boolean; extraWeekly?: number; extraStartAge?: number }
) {
  const years = Math.max(0, Math.floor(inp.retireAge - inp.currentAge))
  const labels: number[] = []
  const baseline: number[] = []
  const withBreak: number[] = []
  const withCatchup: number[] = []

  let balBase = inp.currentSuper
  let balBreak = inp.currentSuper
  let balCatch = inp.currentSuper

  const nominalR = inp.returnRate / 100
  const inflationR = inp.inflation / 100
  const realR = (1 + nominalR) / (1 + inflationR) - 1
  const growthR = options.adjustForInflation ? realR : nominalR

  const sg = inp.sgRate / 100
  const extraPerYear = (options.extraWeekly ?? 0) * 52

  // Build a simple timeline of work fractions for the break scenario.
  const workFractions: number[] = Array(years).fill(1)
  let cursor = 0
  for (const b of inp.breaks) {
    const len = Math.min(years - cursor, Math.max(0, Math.floor(b.years)))
    for (let i = 0; i < len; i++) workFractions[cursor + i] = clamp(b.workFraction, 0, 1)
    cursor += len
    if (cursor >= years) break
  }

  for (let t = 0; t <= years; t++) {
    labels.push(inp.currentAge + t)
    if (t === 0) {
      baseline.push(balBase)
      withBreak.push(balBreak)
      withCatchup.push(balCatch)
      continue
    }

    const w = workFractions[t - 1] ?? 1

    const contrBase = inp.salary * sg + inp.voluntaryPerYear
    const contrBreak = inp.salary * sg * w + inp.voluntaryPerYear

    const catchupExtra = options.extraStartAge && inp.currentAge + (t - 1) >= options.extraStartAge ? extraPerYear : 0

    balBase = (balBase + contrBase) * (1 + growthR)
    balBreak = (balBreak + contrBreak) * (1 + growthR)
    balCatch = (balCatch + contrBreak + catchupExtra) * (1 + growthR)

    baseline.push(balBase)
    withBreak.push(balBreak)
    withCatchup.push(balCatch)
  }

  return { labels, baseline, withBreak, withCatchup }
}

function annualIncomeFromBalance(balance: number) {
  // Very rough: 4% rule to turn lump sum → annual income in today-dollars.
  return balance * 0.04
}

// -------------------------- Component -------------------------

export default function CareerBreakSuperGap() {
  // Inputs
  const [currentAge, setCurrentAge] = useState(23)
  const [retireAge, setRetireAge] = useState(65)
  const [salary, setSalary] = useState(70000)
  const [sgRate, setSgRate] = useState(11.5)
  const [currentSuper, setCurrentSuper] = useState(30000)
  const [returnRate, setReturnRate] = useState(7.5)
  const [inflation, setInflation] = useState(3.0)
  const [adjustForInflation, setAdjustForInflation] = useState(true)

  // Breaks: for simplicity, a single period editor. You can expand to a dynamic list.
  const [breakYears, setBreakYears] = useState(3)
  const [workFraction, setWorkFraction] = useState(0) // 0 = no work (full break)

  // Voluntary + Catch-up
  const [voluntary, setVoluntary] = useState(0) // per year
  const [catchupWeekly, setCatchupWeekly] = useState(35)
  const [catchupStartAge, setCatchupStartAge] = useState(40)

  // Tabs
  const [activeTab, setActiveTab] = useState<'terms' | 'why' | 'case'>('terms')

  const input: ProjectionInput = {
    currentAge,
    retireAge,
    salary,
    sgRate,
    currentSuper,
    returnRate,
    inflation,
    breaks: [{ years: breakYears, workFraction }],
    voluntaryPerYear: voluntary,
  }

  const proj = useMemo(() => projectBalances(input, {
    adjustForInflation,
    extraWeekly: catchupWeekly,
    extraStartAge: catchupStartAge,
  }), [JSON.stringify(input), adjustForInflation, catchupWeekly, catchupStartAge])

  const gapLump = Math.max(0, proj.baseline.at(-1)! - proj.withBreak.at(-1)!)
  const pctReduction = proj.baseline.at(-1)! > 0 ? (gapLump / proj.baseline.at(-1)!) * 100 : 0

  const incomeNoBreak = annualIncomeFromBalance(proj.baseline.at(-1)!)
  const incomeWithBreak = annualIncomeFromBalance(proj.withBreak.at(-1)!)
  const comfortableIncome = 70000 // ASFA rough anchor (today-dollars) – swap in live data later
  const incomeShortfall = Math.max(0, comfortableIncome - incomeWithBreak)

  const chartData = {
    labels: proj.labels,
    datasets: [
      {
        label: 'No Break',
        data: proj.baseline,
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'With Break',
        data: proj.withBreak,
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'With Catch-up',
        data: proj.withCatchup,
        borderWidth: 2,
        fill: false,
      },
    ],
  }

  const chartOpts = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { position: 'bottom' as const },
      tooltip: { enabled: true },
    },
    scales: { y: { ticks: { callback: (v: any) => `$${Number(v).toLocaleString('en-AU')}` } } },
  }

  // Progress towards comfortable income (0..100)
  const comfortableProgress = clamp((incomeWithBreak / comfortableIncome) * 100, 0, 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold text-xl">ClearMoney</div>
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <a className="hover:text-gray-900" href="#">My Finances</a>
            <a className="hover:text-gray-900" href="#">Financial Tools</a>
            <a className="hover:text-gray-900" href="#">Learn</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <section className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Super Gap Calculator</h2>
              <span className="text-xs text-gray-500">Career break / reduced hours</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <LabeledInput label="Your Age" value={currentAge} onChange={setCurrentAge} min={18} />
              <LabeledInput label="Retirement Age" value={retireAge} onChange={setRetireAge} min={60} />
              <LabeledCurrency label="Salary" value={salary} onChange={setSalary} />
              <LabeledPercent label="Super SG %" value={sgRate} onChange={setSgRate} />
              <LabeledCurrency label="Current Super" value={currentSuper} onChange={setCurrentSuper} />
              <LabeledPercent label="Super Return %" value={returnRate} onChange={setReturnRate} />
              <LabeledPercent label="Inflation %" value={inflation} onChange={setInflation} />
            </div>

            {/* Breaks */}
            <Accordion title="Periods of Reduced or No Work">
              <div className="grid grid-cols-2 gap-3">
                <LabeledInput label="Years" value={breakYears} onChange={setBreakYears} min={0} />
                <LabeledPercent label="Work Fraction % (e.g. 50 = half-time)" value={workFraction * 100} onChange={(v)=>setWorkFraction(v/100)} />
              </div>
            </Accordion>

            {/* Voluntary */}
            <Accordion title="Voluntary Contributions">
              <div className="grid grid-cols-2 gap-3">
                <LabeledCurrency label="Per Year" value={voluntary} onChange={setVoluntary} />
              </div>
            </Accordion>

            {/* Catch-up */}
            <Accordion title="Catch-up Plan (for demo/chart)">
              <div className="grid grid-cols-2 gap-3">
                <LabeledInput label="Start Age" value={catchupStartAge} onChange={setCatchupStartAge} min={currentAge} />
                <LabeledCurrency label="Extra Weekly" value={catchupWeekly} onChange={setCatchupWeekly} />
              </div>
            </Accordion>

            <div className="mt-4 flex items-center justify-between">
              <button
                className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Calculate
              </button>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => setAdjustForInflation(true)}
                  className={`px-3 py-1 rounded-lg border ${adjustForInflation ? 'bg-gray-900 text-white' : 'bg-white'}`}
                >
                  Adjust for Inflation
                </button>
                <button
                  onClick={() => setAdjustForInflation(false)}
                  className={`px-3 py-1 rounded-lg border ${!adjustForInflation ? 'bg-gray-900 text-white' : 'bg-white'}`}
                >
                  Ignore Inflation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="lg:col-span-2 space-y-6">
          {/* Results card */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">By age {retireAge}, that’s a gap of</h3>
              <span className="text-xs text-gray-500">Estimates only</span>
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold mt-2">{currency(gapLump)}</div>

            {/* Comfortable progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Progress toward comfortable income</span>
                <span>{Math.round(comfortableProgress)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                <div className="h-2 bg-emerald-500 rounded-full" style={{ width: `${comfortableProgress}%` }} />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Projected income with break {currency(incomeWithBreak)} / year vs comfortable {currency(comfortableIncome)} / year. Shortfall {currency(incomeShortfall)}.
              </div>
            </div>
          </div>

          {/* Detail + Benchmark */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h4 className="font-semibold mb-3">Gap Breakdown</h4>
              <div className="space-y-2 text-sm">
                <Row label="Projected Super (No Break)" value={currency(proj.baseline.at(-1)!)} />
                <Row label="Projected Super (With Break)" value={currency(proj.withBreak.at(-1)!)} />
                <Row label="Percentage Reduction" value={`${pctReduction.toFixed(1)}% lower`} />
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Projected Super Gap</span>
                  <span className="text-rose-600">{currency(gapLump)}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <h4 className="font-semibold mb-3">Comfortable Retirement</h4>
              <p className="text-sm text-gray-600">Using a placeholder target of {currency(comfortableIncome)} per year. Replace with ASFA feed later.</p>
              <ul className="mt-3 text-sm list-disc pl-5 text-gray-700 space-y-1">
                <li>Income with no break: {currency(incomeNoBreak)} / year</li>
                <li>Income with break: {currency(incomeWithBreak)} / year</li>
                <li>Shortfall to comfortable: {currency(incomeShortfall)} / year</li>
              </ul>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow">
            <div className="flex flex-wrap gap-2 border-b p-3">
              <TabBtn active={activeTab === 'terms'} onClick={() => setActiveTab('terms')}>In Everyday Terms</TabBtn>
              <TabBtn active={activeTab === 'why'} onClick={() => setActiveTab('why')}>Why This Matters</TabBtn>
              <TabBtn active={activeTab === 'case'} onClick={() => setActiveTab('case')}>Case Study</TabBtn>
            </div>
            <div className="p-6">
              {activeTab === 'terms' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card title="Coffees" subtitle="3,750" />
                  <Card title="International Trips" subtitle="2" />
                  <Card title="Dinners Out" subtitle="214" />
                </div>
              )}
              {activeTab === 'why' && (
                <div className="grid gap-4 text-sm text-gray-700">
                  <Bullet num={1} title="Super is tied to your income" desc="When you’re not earning, you’re not contributing to super. Even short gaps add up over decades." />
                  <Bullet num={2} title="Time compounds" desc="Missed contributions lose growth every year after. The earlier the gap, the larger the impact." />
                  <Bullet num={3} title="Some groups are hit harder" desc="Women, carers, First Nations Australians, and people with disabilities experience larger average gaps." />
                  <Bullet num={4} title="Awareness helps" desc="Knowing the cost lets you plan catch‑up contributions or adjust timelines." />
                </div>
              )}
              {activeTab === 'case' && (
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h5 className="font-semibold mb-2">Parent A vs Parent B</h5>
                    <p className="text-sm text-gray-700">Parent B works part‑time for 10 years after a child. By retirement, the gap is ~$80,000 compared to Parent A.</p>
                  </div>
                  <div className="h-56">
                    <Line height={220} data={{
                      labels: proj.labels,
                      datasets: [
                        { label: 'Parent A (No Break)', data: proj.baseline, borderWidth: 2, fill: false },
                        { label: 'Parent B (With Break)', data: proj.withBreak, borderWidth: 2, fill: false },
                      ]
                    }} options={chartOpts} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Close the Gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h4 className="font-semibold mb-4">Close the Gap</h4>
              <div className="grid grid-cols-2 gap-3">
                <LabeledInput label="Start Age" value={catchupStartAge} onChange={setCatchupStartAge} min={currentAge} />
                <LabeledCurrency label="Extra Weekly" value={catchupWeekly} onChange={setCatchupWeekly} />
              </div>
              <p className="text-sm text-gray-600 mt-3">This adds a weekly contribution from the chosen start age. Replace with your concessional/non‑concessional logic later.</p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <h4 className="font-semibold mb-4">Impact</h4>
              <div className="h-64">
                <Line data={chartData} options={chartOpts} />
              </div>
              <p className="text-sm text-gray-700 mt-2">At {currency(catchupWeekly)}/week from age {catchupStartAge}, you reach {currency(proj.withCatchup.at(-1)!)} by {retireAge} (vs {currency(proj.withBreak.at(-1)!)} with no catch‑up).</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-8 text-xs text-gray-500">
        Results are estimates only and for educational purposes. Consider seeking professional advice.
      </footer>
    </div>
  )
}

// ---------------------- Small UI helpers ----------------------

function LabeledInput({ label, value, onChange, min }: { label: string; value: number; onChange: (v: number) => void; min?: number }) {
  return (
    <label className="text-sm">
      <div className="text-gray-600 mb-1">{label}</div>
      <input
        type="number"
        value={value}
        min={min}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
      />
    </label>
  )
}

function LabeledCurrency({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="text-sm">
      <div className="text-gray-600 mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <span className="text-gray-500">$</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
      </div>
    </label>
  )
}

function LabeledPercent({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="text-sm">
      <div className="text-gray-600 mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
        <span className="text-gray-500">%</span>
      </div>
    </label>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-3 border rounded-xl">
      <button className="w-full text-left px-3 py-2 font-medium flex items-center justify-between" onClick={() => setOpen((o) => !o)}>
        <span>{title}</span>
        <span className="text-gray-500">{open ? '–' : '+'}</span>
      </button>
      {open && <div className="px-3 pb-3">{children}</div>}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm border ${active ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-50'}`}
    >
      {children}
    </button>
  )
}

function Card({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="text-3xl font-bold">{subtitle}</div>
      <div className="text-sm text-gray-600 mt-1">{title}</div>
    </div>
  )
}

function Bullet({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 text-white font-semibold">{num}</div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-gray-600 text-sm">{desc}</div>
      </div>
    </div>
  )
}
