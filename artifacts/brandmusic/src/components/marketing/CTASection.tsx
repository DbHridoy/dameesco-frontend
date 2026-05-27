import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'wouter'
import Button from '../ui/Button'

export default function CTASection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0A0A0A] via-[#0A1F1A] to-[#0A0A0A] overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl" />
      
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3" />
              Start Today
            </div>
            <h2 className="font-display font-bold text-[36px] md:text-[52px] mb-6 text-white leading-[1.1]">
              Ready to Find Your Sound?
            </h2>
            <p className="text-base md:text-lg text-text-secondary mb-8 leading-relaxed max-w-xl">
              Join thousands of creators using Brandmusic to soundtrack their content. Start your free trial today—no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="group">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/library">
                <Button variant="outline" size="lg">
                  Browse Library
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Visual Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-surface-elevated/80 rounded-2xl border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/40 transition-all">
              <div className="text-4xl font-bold text-white mb-2">2,500+</div>
              <div className="text-sm text-text-secondary">Premium tracks ready to download</div>
            </div>
            <div className="p-6 bg-surface-elevated/80 rounded-2xl border border-green-500/20 backdrop-blur-sm hover:border-green-500/40 transition-all">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-sm text-text-secondary">Agencies trust Brandmusic</div>
            </div>
            <div className="p-6 bg-surface-elevated/80 rounded-2xl border border-emerald-400/20 backdrop-blur-sm hover:border-emerald-400/40 transition-all">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-sm text-text-secondary">Royalty-free & cleared</div>
            </div>
            <div className="p-6 bg-surface-elevated/80 rounded-2xl border border-green-400/20 backdrop-blur-sm hover:border-green-400/40 transition-all">
              <div className="text-4xl font-bold text-white mb-2">Free</div>
              <div className="text-sm text-text-secondary">AI-powered video sync tool</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
