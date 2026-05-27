
import { ArrowRight, Sparkles, Zap, Users, Music } from 'lucide-react'
import { Link } from 'wouter'
import Button from '@/components/ui/Button'

const stats = [
  {
    icon: Music,
    value: '50,000+',
    label: 'Premium Tracks',
  },
  {
    icon: Users,
    value: '250+',
    label: 'Agencies',
  },
  {
    icon: Zap,
    value: '100%',
    label: 'Customizable',
  },
  {
    icon: Sparkles,
    value: 'Free',
    label: 'Video Sync',
  },
]

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle blue/purple gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric-purple/5 via-transparent to-transparent" />
      <div className="absolute left-1/4 top-1/3 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/3 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[120px]" />
      
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-electric-blue via-electric-purple to-electric-cyan rounded-3xl blur-2xl opacity-10" />
          <div className="relative p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-purple/10 border border-electric-purple/20 rounded-full text-sm font-medium mb-6 backdrop-blur-xl">
                <Sparkles className="w-4 h-4 text-electric-purple/80" />
                <span className="text-electric-purple/90">Start Today</span>
              </div>
              
              <h2 className="font-display font-bold text-[36px] md:text-[48px] mb-4 text-white leading-[1.1]">
                Ready to Transform Your
                <br />
                <span className="bg-gradient-to-r from-electric-blue to-electric-purple bg-clip-text text-transparent">
                  Brand Sound?
                </span>
              </h2>
              
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Join hundreds of agencies and brands using AI to find the perfect soundtrack in minutes.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="group relative">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-electric-blue to-electric-purple rounded-2xl opacity-0 group-hover:opacity-10 blur transition-opacity" />
                  <div className="relative text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                    <div className="w-10 h-10 bg-gradient-to-br from-electric-blue/20 to-electric-purple/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="font-display font-bold text-2xl text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/60">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-electric-blue to-electric-purple hover:shadow-xl hover:shadow-electric-blue/30">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/library">
                <Button variant="outline" size="lg" className="border-white/20 hover:border-white/40">
                  Browse Music
                </Button>
              </Link>
            </div>

            <p className="text-sm text-white/40 text-center mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
