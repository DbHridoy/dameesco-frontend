import { useState } from 'react'
import { Link } from 'wouter'
import { Check, Loader2, X } from 'lucide-react'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'
import AuthModal from '@/components/ui/AuthModal'
import { useAppSelector } from '@/hooks/redux'
import { useCreateAccessRequestMutation } from '@/services/api'

type Billing = 'monthly' | 'annual'

const plans = [
  {
    name: 'Starter',
    monthly: 0,
    blurb: 'Start Searching and try video sync.',
    features: ['Unlimited search', 'Video sync previews', 'Personal shortlists'],
    cta: 'Start Searching',
    href: '/library',
    featured: false,
  },
  {
    name: 'Studio',
    monthly: 49,
    blurb: 'For agencies licensing music often.',
    features: [
      'Everything in Starter',
      'Stems on every track',
      'Shared team shortlists',
      'Remove watermarks',
    ],
    cta: 'Send Request',
    href: '/library',
    featured: true,
  },
] as const

const ANNUAL_DISCOUNT = 0.2

function priceFor(plan: (typeof plans)[number], billing: Billing) {
  if (plan.monthly === 0) return { price: '$0', cadence: '/ forever' }
  if (billing === 'annual') {
    const perSeatMonthly = Math.round(plan.monthly * (1 - ANNUAL_DISCOUNT))
    return { price: `$${perSeatMonthly}`, cadence: '/ seat / mo · billed annually' }
  }
  return { price: `$${plan.monthly}`, cadence: '/ seat / mo' }
}

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const [requestSuccessOpen, setRequestSuccessOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [requestError, setRequestError] = useState('')
  const user = useAppSelector((state) => state.auth.user)
  const [createAccessRequest, { isLoading: submittingRequest }] =
    useCreateAccessRequestMutation()

  const submitStudioRequest = async () => {
    setRequestError('')

    if (!user) {
      setAuthOpen(true)
      return
    }

    try {
      await createAccessRequest({
        requestedPlan: 'premium',
        paymentMethod: 'pricing_page_request',
        message: `Studio plan request from pricing page (${billing} billing).`,
      }).unwrap()
      setRequestSuccessOpen(true)
    } catch (apiError: any) {
      setRequestError(apiError?.data?.message ?? 'Unable to send request')
    }
  }

  return (
    <main className="min-h-screen text-[var(--color-text-primary)]">
      <Navigation />
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        title="Sign in to request Studio"
      />

      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div>
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Pricing
            </span>
            <h1 className="h-display text-[40px] md:text-[56px] mt-3 leading-[1.05]">
              Straightforward, per seat.
            </h1>
            <p className="mt-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto">
              Start free and upgrade when your team licenses regularly. No hidden fees, no surprise sync charges.
            </p>

            <div className="mt-8 inline-flex items-center gap-1 p-1 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={`h-8 px-4 rounded text-[13px] font-medium transition-colors ${
                  billing === 'monthly'
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                className={`h-8 px-4 rounded text-[13px] font-medium transition-colors inline-flex items-center gap-2 ${
                  billing === 'annual'
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                Annual
                <span
                  className={`mono text-[10px] uppercase tracking-[0.14em] rounded px-1.5 py-0.5 ${
                    billing === 'annual'
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                  }`}
                >
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-3">
            {plans.map((p) => {
              const { price, cadence } = priceFor(p, billing)
              return (
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
                </div>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="h-display text-[32px] text-[var(--color-text-primary)]">
                    {price}
                  </span>
                  {cadence && (
                    <span className="text-[12px] text-[var(--color-text-tertiary)]">
                      {cadence}
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
	                {p.featured ? (
                    <Button
                      size="md"
                      variant="primary"
                      fullWidth
                      onClick={submitStudioRequest}
                      disabled={submittingRequest}
                    >
                      {submittingRequest ? (
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                      ) : null}
                      {p.cta}
                    </Button>
                  ) : (
                    <Link href={p.href}>
                      <Button size="md" variant="outline" fullWidth>
                        {p.cta}
                      </Button>
                    </Link>
                  )}
                  {p.featured && requestError ? (
                    <p className="mt-3 text-center text-[12px] text-red-400">
                      {requestError}
                    </p>
                  ) : null}
              </div>
              )
            })}
          </div>

          <div className="mt-12 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 md:p-10 text-center">
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Flexible Licensing
            </span>
            <h2 className="h-display text-[22px] md:text-[26px] mt-3 leading-[1.15]">
              Need one track, not a subscription?
            </h2>
            <p className="mt-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto">
              You can still license individual tracks without a monthly plan. Search the catalog, find the right sound, and license music on a project-by-project basis whenever you need it.
            </p>
            <div className="mt-6 flex justify-center">
              <Link href="/library">
                <Button size="md" variant="outline">
                  Search the Catalog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

	      <Footer />

        {requestSuccessOpen ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-request-title"
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setRequestSuccessOpen(false)}
              aria-hidden="true"
            />
            <div className="relative w-full max-w-md rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-7 text-center shadow-2xl">
              <button
                type="button"
                onClick={() => setRequestSuccessOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-text-tertiary)] transition-colors hover:bg-white/[0.04] hover:text-[var(--color-text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-accent-soft)]">
                <Check className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <h2
                id="pricing-request-title"
                className="mt-5 text-[18px] font-medium text-[var(--color-text-primary)]"
              >
                Request sent successfully
              </h2>
              <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                We received your Studio plan request. Our team will review it and contact you shortly.
              </p>
              <div className="mt-6">
                <Button size="md" onClick={() => setRequestSuccessOpen(false)}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        ) : null}
	    </main>
	  )
	}
