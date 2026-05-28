import { useState } from 'react'
import { Link } from 'wouter'
import {
  Search,
  Waves,
  Layers,
  Check,
  Plus,
  Minus,
  Video,
  Sliders,
} from 'lucide-react'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'
import { mockTracks } from '@/lib/mockTracks'
import stemAccessImage from '@assets/Nano_Banana_2_-_virtual_control_on_an_audio_mixing_board_or_di_1779971692046.png'

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
  '3,000 Cleared Tracks',
  'Stems',
  'Video sync preview',
]

const plans = [
  {
    name: 'Starter',
    price: '$0',
    cadence: '/ forever',
    blurb: 'Start Searching and try video sync.',
    features: ['Unlimited search', 'Video sync previews', 'Personal shortlists'],
    cta: 'Start Searching',
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
    cta: 'Start Searching',
    href: '/library',
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
    cta: 'Start Searching',
    href: '/library',
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
    q: 'How does the video sync preview work?',
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
    <main className="min-h-screen text-[var(--color-text-primary)]">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="h-display text-[44px] sm:text-[56px] md:text-[64px] text-[var(--color-text-primary)]">
            Music that sounds<br />
            like your brand.
          </h1>

          <p className="mt-6 text-[16px] md:text-[17px] text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Describe the mood, scene, or feeling you're trying to capture and instantly find tracks that bring it to life
          </p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <Link href="/library">
              <Button size="md">Start Searching</Button>
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

      {/* How it works */}
      <section className="py-20 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              How it works
            </span>
            <h2 className="h-display text-[32px] md:text-[40px] mt-3">
              From a feeling to the right track
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

      {/* Detailed features */}
      <section className="py-20 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Features
            </span>
            <h2 className="h-display text-[32px] md:text-[40px] mt-3">
              Built for agency workflows.
            </h2>
            <p className="mt-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
              Tools designed for creative directors, producers, and brand teams who need precision, speed, and clean licensing.
            </p>
          </div>

          <div className="space-y-20">
            {[
              {
                icon: Search,
                eyebrow: 'AI Discovery',
                title: 'AI Search',
                description:
                  'Describe a scene, a feeling, a direction. Speak to our AI model like you would speak to a music supervisor.',
                bullets: [
                  'Natural-language queries',
                  'Context-aware recommendations',
                  'Search by mood, genre, or use case',
                ],
                image:
                  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=900&fit=crop',
              },
              {
                icon: Video,
                eyebrow: 'Video Sync',
                title: 'Video Sync Preview',
                description:
                  'Upload an edit and hear options synced against your footage — before you license. Present shortlists to clients and get approvals faster.',
                bullets: [
                  'Drag-and-drop upload',
                  'Real-time audio sync',
                  'Local-only processing',
                  'Export preview videos',
                ],
                image:
                  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=900&fit=crop',
              },
              {
                icon: Sliders,
                eyebrow: 'Stems',
                title: 'Stem Access',
                description:
                  'Download the full mix or access mixed stems when you need more flexibility.',
                bullets: [],
                image: stemAccessImage,
              },
            ].map((f, idx) => {
              const reverse = idx % 2 === 1
              return (
                <div
                  key={f.title}
                  className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                >
                  <div className={reverse ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface)] flex items-center justify-center">
                        <f.icon className="w-4 h-4 text-[var(--color-accent)]" />
                      </div>
                      <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                        {f.eyebrow} · {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="h-display text-[26px] md:text-[32px] mb-4">
                      {f.title}
                    </h3>
                    {f.description && (
                      <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        {f.description}
                      </p>
                    )}
                    {f.bullets.length > 0 && (
                      <ul className="space-y-2.5">
                        {f.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 text-[13.5px] text-[var(--color-text-secondary)]"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className={reverse ? 'lg:order-1' : ''}>
                    <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-1.5">
                      <div className="aspect-[4/3] rounded-md overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-background)]">
                        <img
                          src={f.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
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
