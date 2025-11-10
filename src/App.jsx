import { useState } from 'react'

function App() {
  const [lead, setLead] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    preferred_date: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setLead((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)
    try {
      const res = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.detail || 'Failed to submit')
      setResult({ type: 'success', message: 'Thanks! We will call you shortly to confirm your service.' })
      setLead({ name: '', phone: '', email: '', city: '', preferred_date: '', message: '' })
    } catch (err) {
      setResult({ type: 'error', message: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-amber-500"></div>
            <span className="font-extrabold text-lg tracking-tight">Chimney Care</span>
          </div>
          <nav className="hidden sm:flex gap-6 text-sm text-slate-600">
            <a href="#results" className="hover:text-slate-900">Results</a>
            <a href="#services" className="hover:text-slate-900">Services</a>
            <a href="#book" className="hover:text-slate-900">Book Now</a>
          </nav>
        </div>
      </header>

      {/* Hero with oil/grime visual */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          {/* Grease splatter visual */}
          <div className="absolute inset-0 opacity-30 mix-blend-multiply" style={{
            backgroundImage: `radial-gradient(circle at 15% 25%, rgba(97, 64, 11, 0.55) 0 70px, transparent 90px),
                              radial-gradient(circle at 65% 35%, rgba(71, 46, 9, 0.5) 0 60px, transparent 85px),
                              radial-gradient(circle at 85% 70%, rgba(54, 35, 7, 0.5) 0 75px, transparent 100px),
                              radial-gradient(circle at 35% 80%, rgba(120, 80, 18, 0.45) 0 55px, transparent 90px)`
          }} />
          {/* Oil streaks */}
          <div className="absolute inset-0 opacity-25" style={{
            backgroundImage: `repeating-linear-gradient(180deg, rgba(90, 60, 12, 0.4) 0 8px, transparent 8px 16px)`
          }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Remove sticky oil. Restore fresh airflow.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Professional kitchen chimney cleaning and repair that makes filters shine and suction strong again.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              <li className="flex items-center gap-2 bg-white/70 rounded-md px-3 py-2 border">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" /> Deep degreasing
              </li>
              <li className="flex items-center gap-2 bg-white/70 rounded-md px-3 py-2 border">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" /> Motor & duct check
              </li>
              <li className="flex items-center gap-2 bg-white/70 rounded-md px-3 py-2 border">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" /> Same‑day service
              </li>
              <li className="flex items-center gap-2 bg-white/70 rounded-md px-3 py-2 border">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" /> 30‑day warranty
              </li>
            </ul>
            <a href="#book" className="inline-block mt-8 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-3 rounded-md shadow">
              Get free quote
            </a>
          </div>

          {/* Before/After block */}
          <div id="results" className="bg-white/70 rounded-xl border shadow-inner p-4">
            <BeforeAfterInline />
          </div>
        </div>
      </section>

      {/* Services quick grid */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Popular services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {title:'Chimney Deep Cleaning', desc:'Complete filter, duct, and hood degreasing.'},
            {title:'Motor Service', desc:'Noise, vibration, or low suction diagnosis and fix.'},
            {title:'Filter Replacement', desc:'Baffle/mesh/filter replacement for better airflow.'},
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-lg border p-4 shadow-sm">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking form */}
      <section id="book" className="bg-white/80 border-t">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-extrabold">Book a cleaning</h2>
            <p className="mt-3 text-slate-700">Share your details and a photo/video of the oily filter if possible. Our expert will call you back with an exact quote.</p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>• Average visit time: 45–90 minutes</li>
              <li>• Eco‑safe degreasers used</li>
              <li>• Upfront pricing, no surprises</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 shadow">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input required name="name" value={lead.name} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input required name="phone" value={lead.phone} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Phone number" />
              </div>
              <div>
                <label className="text-sm font-medium">Email (optional)</label>
                <input type="email" name="email" value={lead.email} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium">City/Area</label>
                <input name="city" value={lead.city} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Your city" />
              </div>
              <div>
                <label className="text-sm font-medium">Preferred date</label>
                <input name="preferred_date" value={lead.preferred_date} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="YYYY-MM-DD" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Message</label>
                <textarea name="message" value={lead.message} onChange={handleChange} rows={4} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Describe issues: heavy oil, smell, low suction..."></textarea>
              </div>
            </div>
            {result && (
              <div className={`mt-4 text-sm rounded-md px-3 py-2 border ${result.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                {result.message}
              </div>
            )}
            <button disabled={submitting} type="submit" className="mt-4 w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-semibold px-4 py-2 rounded-md">
              {submitting ? 'Submitting...' : 'Request callback'}
            </button>
            <p className="text-xs text-slate-500 text-center mt-2">We respond within 10 minutes during working hours.</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} Chimney Care. All rights reserved.
      </footer>
    </div>
  )
}

function BeforeAfterInline() {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
      {/* Clean side */}
      <div className="absolute inset-0" aria-hidden>
        <div className="w-full h-full bg-gradient-to-br from-zinc-50 to-slate-100" />
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 8px)`
        }} />
        <div className="absolute bottom-3 right-3 text-[10px] font-semibold bg-white/70 backdrop-blur px-2 py-1 rounded-md text-emerald-700 border">After</div>
      </div>
      {/* Greasy side */}
      <div className="absolute inset-0" style={{ width: `${pos}%` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-900" />
        <div className="absolute inset-0 mix-blend-multiply opacity-80" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(60,40,10,0.7) 0 30px, transparent 40px),
                            radial-gradient(circle at 60% 40%, rgba(40,25,8,0.7) 0 24px, transparent 34px),
                            radial-gradient(circle at 80% 70%, rgba(30,20,6,0.7) 0 28px, transparent 38px),
                            radial-gradient(circle at 30% 80%, rgba(50,35,10,0.7) 0 22px, transparent 30px)`
        }} />
        <div className="absolute inset-0 opacity-70" style={{
          backgroundImage: `repeating-linear-gradient(to bottom, rgba(22, 12, 2, 0.6) 0 6px, transparent 6px 14px)`
        }} />
        <div className="absolute bottom-3 left-3 text-[10px] font-semibold bg-black/40 text-amber-200 backdrop-blur px-2 py-1 rounded-md border border-amber-900/30">Before</div>
      </div>
      {/* Handle */}
      <div className="absolute inset-y-0" style={{ left: `calc(${pos}% - 1px)` }}>
        <div className="h-full w-0.5 bg-white shadow-[0_0_0_2px_rgba(0,0,0,0.2)]" />
        <div className="absolute top-1/2 -translate-y-1/2 -left-4">
          <div className="w-8 h-8 rounded-full bg-white shadow-lg border flex items-center justify-center text-slate-700 text-xs font-semibold select-none">
            ⇆
          </div>
        </div>
      </div>
      <input
        aria-label="Before after slider"
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-0 bottom-2 w-[90%] mx-auto appearance-none h-1 bg-white/60 rounded outline-none cursor-pointer"
      />
    </div>
  )
}

export default App
