
import { Check, Sparkles, Zap, Crown } from 'lucide-react'
import { Link } from 'wouter'
import Button from '../ui/Button'
import { useState } from 'react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out the platform',
    icon: Sparkles,
    color: 'from-electric-cyan/60 to-electric-blue/60',
    accentColor: 'electric-cyan',
    features: [
      'Browse 50,000+ tracks',
      'AI-powered search',
      'Video sync preview',
      'Watermarked downloads',
      'Community support',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$45',
    period: 'per seat/month',
    description: 'For agencies and creative teams',
    icon: Zap,
    color: 'from-electric-blue/60 to-electric-purple/60',
    accentColor: 'electric-blue',
    features: [
      'Everything in Free',
      'Unlimited downloads',
      'Full stem access',
      'Commercial licensing (pay-per-use)',
      'Remove watermarks',
      'Team collaboration',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large organizations',
    icon: Crown,
    color: 'from-electric-purple/60 to-violet-500/60',
    accentColor: 'electric-purple',
    features: [
      'Everything in Pro',
      'Custom music commissions',
      'Sonic branding packages',
      'Dedicated account manager',
      'Custom licensing terms',
      'API access',
      'SSO & advanced security',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function PricingSectionV2() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0A1015] via-[#0A0A0A] to-[#0A0A0A] overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric-blue/5 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-sm font-medium mb-6 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-electric-blue/80" />
            <span className="text-electric-blue/90">Simple, Transparent Pricing</span>
          </div>
          <h2 className="font-display font-bold text-[40px] md:text-[56px] mb-6 text-white leading-[1.1]">
            Choose Your Plan
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative group ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              onMouseEnter={() => setHoveredPlan(idx)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-4 py-1.5 bg-gradient-to-r from-electric-blue/80 to-electric-purple/80 rounded-full text-white text-xs font-bold backdrop-blur-xl border border-white/20">
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Subtle glowing border effect */}
              <div className={`absolute -inset-[1px] bg-gradient-to-b ${plan.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500 ${plan.popular ? 'opacity-20' : ''}`} />
              
              {/* Card */}
              <div className={`relative h-full p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border transition-all duration-500 ${
                plan.popular 
                  ? 'border-electric-blue/30 shadow-xl shadow-electric-blue/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}>
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${plan.color} opacity-20 rounded-2xl flex items-center justify-center mb-6 group-hover:opacity-30 transition-opacity`}>
                  <plan.icon className="w-7 h-7 text-white" />
                </div>

                {/* Plan name */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-white/50 mb-6">
                  {plan.description}
                </p>

                {/* Price - Always white and legible */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span className="text-white/40 text-sm">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                  {plan.price === 'Custom' && (
                    <span className="text-white/40 text-sm">
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                <Link href={plan.name === 'Enterprise' ? '/contact' : '/signup'}>
                  <Button 
                    size="lg" 
                    className={`w-full mb-8 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-electric-blue/80 to-electric-purple/80 hover:from-electric-blue hover:to-electric-purple border border-white/20' 
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 bg-gradient-to-br ${plan.color} opacity-60 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-white/70">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-sm text-white/40">
            All plans include 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
