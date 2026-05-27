import { Sparkles, ArrowRight, Music, Mic2, Volume2, Lightbulb } from 'lucide-react'
import { Link } from 'wouter'
import Button from '../ui/Button'

const services = [
  {
    icon: Music,
    title: 'Custom Music Commissions',
    description: 'Original compositions tailored to your brand',
  },
  {
    icon: Mic2,
    title: 'Sonic Branding Packages',
    description: 'Complete sonic identity systems',
  },
  {
    icon: Volume2,
    title: 'Audio Logo Creation',
    description: 'Memorable sonic signatures',
  },
  {
    icon: Lightbulb,
    title: 'Brand Sound Strategy',
    description: 'Strategic sonic identity consultation',
  },
]

export default function CustomMusic() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0A0A0A] via-[#0A1F1F] to-[#0A0A0A] overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[700px] h-[700px] bg-teal-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-[700px] h-[700px] bg-cyan-500/15 rounded-full blur-3xl" />
      
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="teal-wave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
          <path d="M0,100 Q250,50 500,100 T1000,100" stroke="url(#teal-wave)" strokeWidth="2"="none" opacity="0.3">
            <animate attributeName="d" dur="10s" repeatCount="indefinite" 
              values="M0,100 Q250,50 500,100 T1000,100;
                      M0,100 Q250,150 500,100 T1000,100;
                      M0,100 Q250,50 500,100 T1000,100" />
          </path>
        </svg>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-xs font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              Premium Services
            </div>
            
            <h2 className="font-display font-bold text-[36px] md:text-[52px] mb-6 text-white leading-[1.1]">
              Need Something Truly Unique?
            </h2>
            
            <p className="text-base md:text-lg text-text-secondary mb-10 leading-relaxed">
              From custom compositions to complete sonic branding systems, our team of composers and strategists can create original music that's unmistakably yours.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {services.map((service) => (
                <div key={service.title} className="group p-5 bg-surface-elevated/60 rounded-xl border border-teal-500/20 hover:border-teal-500/40 transition-all backdrop-blur-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-teal-500/30">
                    <service.icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <h3 className="font-semibold text-sm text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/enterprise">
              <Button size="lg" className="group bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-lg shadow-teal-500/20">
                Explore Custom Services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/30 p-12 backdrop-blur-sm overflow-hidden">
              <div className="flex items-end justify-center gap-2 h-80">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-teal-500 to-cyan-400 rounded-full"
                    style={{
                      height: `${30 + Math.sin(i * 0.5) * 40}%`,
                      animation: `pulse ${2 + (i % 3) * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-6 py-3 bg-surface-elevated/90 rounded-full border border-teal-500/30 backdrop-blur-md">
                  <p className="text-sm text-teal-400 font-medium">Custom Audio Visualization</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-teal-500/30 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-cyan-500/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
