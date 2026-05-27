import { useState } from 'react'
import { Link } from 'wouter'
import {
  ArrowRight,
  Search,
  Waves,
  Layers,
  Users,
  Check,
  Plus,
  Minus,
} from 'lucide-react'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'
import { mockTracks } from '@/lib/mockTracks'

const steps = [
  {
    n: '01',
    icon: Search,
    title: 'Describe what you need',
    body: 'Type a brief the way you would tell a music supervisor — mood, energy, references. Plain language.',
  },
  {
    n: '02',
    icon: Waves,
    title: 'Get matched tracks',
    body: 'Our model surfaces tracks that fit the brief, with stems and licensing details inline.',
  },
  {
    n: '03',
    icon: Layers,
    title: 'Sync to your edit',
    body: 'Preview tracks against your footage, share a shortlist with stakeholders, license in one click.',
  },
]

const proof = [
  'Used by 250+ agencies',
  '50,000+ cleared tracks',
  'Stems on every release',
  'Free video sync preview',
]

const stats = [
  { value: '50K+', label: 'Cleared tracks' },
  { value: '250+', label: 'Agencies & studios' },
  { value: '< 5 min', label: 'Average brief → shortlist' },
  { value: '100%', label: 'Stems on every release' },
]

const testimonials = [
  {
    quote:
      'We used to spend hours scrolling stock libraries for one cue. Now we describe the brief and the right tracks surface in seconds.',
    name: 'Maya Okafor',
    role: 'Creative Director, Northwind',
  },
  {
    quote:
      'Sync preview against our edit before licensing changed our review cycle. Clients pick faster, we close faster.',
    name: 'Diego Ramos',
    role: 'Executive Producer, Field Studio',
  },
  {
    quote:
      'Stems on every track is the unlock. Our post team can shape any cue to fit the brand, not the other way around.',
    name: 'Hannah Liu',
    role: 'Head of Brand, Lumen Labs',
  },
]

const plans = [
  {
    name: 'Starter',
    price: '$0',
    cadence: '/ forever',
    blurb: 'Browse the library and try free video sync.',
    features: ['Unlimited search', 'Free video sync previews', 'Personal shortlists'],
    cta: 'Browse the library',
    href: '/library',
    featured: false,
  },
  {
    name: 'Studio',
    price: '$49',
    cadence: '/ seat / mo',
    blurb: 'For agencies licensing music every week.',
    features: [
      'Everything in Starter',
      'Unlimited commercial licensing',
      'Stems on every track',
      'Shared team shortlists',
    ],
    cta: 'See features',
    href: '/features',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: '',
    blurb: 'For brand teams and broadcast.',
    features: [
      'Everything in Studio',
      'Custom commissions',
      'Sonic branding workshops',
      'Dedicated account team',
    ],
    cta: 'Contact sales',
    href: '/features',
    featured: false,
  },
]

const faqs = [
  {
    q: 'How does the AI search actually work?',
    a: 'Describe the brief in plain language — mood, energy, references, even rough tempo. The model maps your description to tracks tagged across hundreds of dimensions and surfaces the closest fits. You can refine in conversation, just like working with a supervisor.',
  },
  {
    q: 'Are tracks cleared for commercial use?',
    a: 'Yes. Every track in the library is professionally produced and cleared for commercial use under a single, transparent license. No hidden royalties, no surprise sync fees.',
  },
  {
    q: 'Do I really get stems on every track?',
    a: 'Yes — drums, bass, melody, and vocals as separated WAV files on every release. Mix to fit the brand and the media spec without going back to the composer.',
  },
  {
    q: 'How does the free video sync preview work?',
    a: 'Drop an edit into the preview tool, pick a few candidate tracks, and hear them synced against your footage in the browser. Nothing leaves your machine. Share the result with stakeholders before you license.',
  },
  {
    q: 'Can you produce something custom?',
    a: 'Yes. Our composers take on custom commissions — original cues, sonic branding systems, audio logos — typically delivered in 2–3 weeks.',
  },
]

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] divide-y divide-[var(--color-border-subtle)] overflow-hidden">
      {faqs.map((f, i) => {
        const active = open === i
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(active ? null : i)}
              aria-expanded={active}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)]"
            >
              <span className="text-[14px] text-[var(--color-text-primary)]">{f.q}</span>
              {active ? (
                <Minus className="w-4 h-4 text-[var(--color-text-tertiary)] flex-shrink-0" />
              ) : (
                <Plus className="w-4 h-4 text-[var(--color-text-tertiary)] flex-shrink-0" />
              )}
            </button>
            {active && (
              <div className="px-5 pb-5 text-[13.5px] text-[var(--color-text-secondary)] leading-relaxed">
                {f.a}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function Home() {

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="h-display text-[44px] sm:text-[56px] md:text-[64px] text-[var(--color-text-primary)]">
            Music that sounds<br />
            like your brand.
          </h1>

          <p className="mt-6 text-[16px] md:text-[17px] text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Describe a mood. Get tracks that fit. License in minutes — with stems, video sync, and clear terms on every release.
          </p>

          <div className="mt-10 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 p-1.5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface)] focus-within:border-[var(--color-accent)] transition-colors">
              <div className="pl-3 text-[var(--color-text-tertiary)]">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                aria-label="Describe the music you need"
                placeholder="Confident but not aggressive, for a tech startup…"
                className="flex-1 bg-transparent text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none py-2"
              />
              <Link href="/library">
                <Button size="sm">
                  Search
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/library">
              <Button size="md">Browse the library</Button>
            </Link>
            <Link href="/features">
              <Button size="md" variant="outline">See features</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-y border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {proof.map((p) => (
            <span
              key={p}
              className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6"
              >
                <div className="h-display text-[28px] md:text-[32px] text-[var(--color-text-primary)]">
                  {s.value}
                </div>
                <div className="mt-1 mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              How it works
            </span>
            <h2 className="h-display text-[32px] md:text-[40px] mt-3">
              From brief to final mix in minutes.
            </h2>
            <p className="mt-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
              A focused workflow for creative directors, producers, and brand teams. No endless scrolling, no clearance surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="group rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 hover:border-[var(--color-border-default)] transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="mono text-[11px] tracking-[0.18em] text-[var(--color-text-tertiary)]">
                    {s.n}
                  </span>
                  <s.icon className="w-4 h-4 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors" />
                </div>
                <h3 className="text-[15px] font-medium text-[var(--color-text-primary)] mb-2">
                  {s.title}
                </h3>
                <p className="text-[13.5px] text-[var(--color-text-secondary)] leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for teams */}
      <section className="py-20 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Built for teams
            </span>
            <h2 className="h-display text-[32px] md:text-[40px] mt-3">
              Designed for the way agencies actually work.
            </h2>
            <p className="mt-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
              Stems on every track. Video sync before licensing. Shared shortlists for stakeholders. Clear, single‑seat pricing — no surprise fees.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <Link href="/features">
                <Button size="md">Explore features</Button>
              </Link>
              <Link href="/library">
                <Button size="md" variant="ghost">
                  Browse music
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                <span className="text-[13px] text-[var(--color-text-secondary)]">
                  Shortlist · Q1 Campaign
                </span>
              </div>
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                Shared
              </span>
            </div>
            <div className="space-y-2">
              {[
                { t: 'Ambient Drive', a: 'Nova Strings', bpm: 92 },
                { t: 'Forward Motion', a: 'Atlas Audio', bpm: 118 },
                { t: 'Soft Confidence', a: 'Polar Field', bpm: 84 },
              ].map((r) => (
                <div
                  key={r.t}
                  className="flex items-center justify-between rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-background)] px-3 py-2.5"
                >
                  <div>
                    <div className="text-[13.5px] text-[var(--color-text-primary)]">{r.t}</div>
                    <div className="text-[12px] text-[var(--color-text-tertiary)]">{r.a}</div>
                  </div>
                  <span className="mono text-[11px] text-[var(--color-text-tertiary)]">
                    {r.bpm} BPM
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Field reports
            </span>
            <h2 className="h-display text-[32px] md:text-[40px] mt-3">
              Teams shipping with Brandmusic.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 flex flex-col"
              >
                <blockquote className="text-[14px] text-[var(--color-text-primary)] leading-relaxed">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-[var(--color-border-subtle)]">
                  <div className="text-[13px] text-[var(--color-text-primary)]">{t.name}</div>
                  <div className="text-[12px] text-[var(--color-text-tertiary)]">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-20 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Pricing
            </span>
            <h2 className="h-display text-[32px] md:text-[40px] mt-3">
              Straightforward, per seat.
            </h2>
            <p className="mt-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
              Start free. Upgrade when you start licensing. Talk to us when you scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-lg border p-6 flex flex-col ${
                  p.featured
                    ? 'border-[var(--color-accent)] bg-[var(--color-surface-elevated)]'
                    : 'border-[var(--color-border-subtle)] bg-[var(--color-surface)]'
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[14px] font-medium text-[var(--color-text-primary)]">
                    {p.name}
                  </span>
                  {p.featured && (
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="h-display text-[32px] text-[var(--color-text-primary)]">
                    {p.price}
                  </span>
                  {p.cadence && (
                    <span className="text-[12px] text-[var(--color-text-tertiary)]">
                      {p.cadence}
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)] mb-5">{p.blurb}</p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[13px] text-[var(--color-text-secondary)]"
                    >
                      <Check className="w-3.5 h-3.5 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={p.href}>
                  <Button
                    size="md"
                    variant={p.featured ? 'primary' : 'outline'}
                    fullWidth
                  >
                    {p.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-10">
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              FAQ
            </span>
            <h2 className="h-display text-[32px] md:text-[40px] mt-3">
              Common questions.
            </h2>
          </div>
          <Faq />
        </div>
      </section>

      <Footer />
    </main>
  )
}
