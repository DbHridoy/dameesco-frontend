import { Check } from 'lucide-react'
import { Link } from 'wouter'
import Button from '../ui/Button'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out our platform',
    features: [
      'Browse full catalog',
      'Watermarked downloads',
      'AI-powered search',
      'Basic filters',
    ],
    cta: 'Start Free',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$45',
    period: '/seat/month',
    description: 'For professional creators and teams',
    features: [
      'Everything in Free',
      'Unlimited clean downloads',
      'Full stem access',
      'Priority support',
      'Commercial license',
    ],
    cta: 'Start Free Trial',
    href: '/signup',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large teams and agencies',
    features: [
      'Everything in Pro',
      '10 seats included',
      'Brand portal & sonic DNA',
      'Dedicated account manager',
      'Custom licensing',
    ],
    cta: 'Contact Sales',
    href: '/enterprise',
    highlighted: false,
  },
]

export default function PricingSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0A0A0A] via-[#0D1820] to-[#0A0A0A] overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-electric-cyan/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-electric-cyan/10 border border-electric-cyan/30 rounded-full text-electric-cyan text-xs font-medium mb-6">
            Pricing Plans
          </div>
          <h2 className="font-display font-bold text-[36px] md:text-[48px] mb-4 text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our AI-powered search.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl transition-all backdrop-blur-sm ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-electric-cyan/10 to-electric-blue/10 border-2 border-electric-cyan shadow-2xl shadow-electric-cyan/20 scale-105 md:scale-110'
                  : 'bg-surface-elevated/60 border border-white/10 hover:border-electric-blue/50'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-electric-cyan to-electric-blue text-white text-xs font-semibold rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-text-tertiary text-sm ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-text-secondary text-sm">{plan.description}</p>
              </div>
              
              <Link href={plan.href}>
                <Button
                  variant={plan.highlighted ? 'primary' : 'outline'}
                  fullWidth
                  className="mb-8"
                >
                  {plan.cta}
                </Button>
              </Link>
              
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? 'bg-electric-cyan/20' : 'bg-electric-blue/20'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.highlighted ? 'text-electric-cyan' : 'text-electric-blue'}`} />
                    </div>
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
