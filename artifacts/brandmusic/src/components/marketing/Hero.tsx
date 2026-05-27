
import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'wouter'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A0A0A] via-[#0D1117] to-[#0A0A0A]">
      {/* Enhanced animated waves */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-auto"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#0066FF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          
          <path
           ="url(#wave-gradient-1)"
            d="M0,320 C240,240 360,400 600,320 C840,240 960,400 1200,320 C1320,280 1380,340 1440,320 L1440,800 L0,800 Z"
          >
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="
                M0,320 C240,240 360,400 600,320 C840,240 960,400 1200,320 C1320,280 1380,340 1440,320 L1440,800 L0,800 Z;
                M0,360 C240,280 360,440 600,360 C840,280 960,440 1200,360 C1320,320 1380,380 1440,360 L1440,800 L0,800 Z;
                M0,320 C240,240 360,400 600,320 C840,240 960,400 1200,320 C1320,280 1380,340 1440,320 L1440,800 L0,800 Z
              "
            />
          </path>
          
          <path
           ="url(#wave-gradient-2)"
            d="M0,420 C300,340 450,500 750,420 C1050,340 1200,500 1440,420 L1440,800 L0,800 Z"
          >
            <animate
              attributeName="d"
              dur="16s"
              repeatCount="indefinite"
              values="
                M0,420 C300,340 450,500 750,420 C1050,340 1200,500 1440,420 L1440,800 L0,800 Z;
                M0,460 C300,380 450,540 750,460 C1050,380 1200,540 1440,460 L1440,800 L0,800 Z;
                M0,420 C300,340 450,500 750,420 C1050,340 1200,500 1440,420 L1440,800 L0,800 Z
              "
            />
          </path>
          
          <path
           ="url(#wave-gradient-3)"
            d="M0,520 C360,440 540,600 900,520 C1260,440 1380,600 1440,520 L1440,800 L0,800 Z"
          >
            <animate
              attributeName="d"
              dur="20s"
              repeatCount="indefinite"
              values="
                M0,520 C360,440 540,600 900,520 C1260,440 1380,600 1440,520 L1440,800 L0,800 Z;
                M0,560 C360,480 540,640 900,560 C1260,480 1380,640 1440,560 L1440,800 L0,800 Z;
                M0,520 C360,440 540,600 900,520 C1260,440 1380,600 1440,520 L1440,800 L0,800 Z
              "
            />
          </path>
        </svg>
      </div>
      
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric-blue/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-electric-purple/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center pt-20">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-electric-blue/20 border border-electric-blue/40 rounded-full text-electric-cyan text-sm font-medium backdrop-blur-sm">
            <Play className="w-4 h-4" />
            AI-Powered Music Discovery
          </span>
        </div>
        
        <h1 className="font-display font-bold text-[40px] md:text-[56px] lg:text-[72px] mb-8 leading-[1.1] text-white drop-shadow-2xl">
          Discover Music That
          <br />
          <span className="bg-gradient-to-r from-electric-blue via-electric-cyan to-electric-purple bg-clip-text text-transparent">
            Sounds Like Your Brand
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
          Talk to our AI like you'd talk to a music supervisor. Get the perfect track in minutes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/signup">
            <Button size="lg" className="group">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/library">
            <Button variant="outline" size="lg">Browse Library</Button>
          </Link>
        </div>
        
        {/* Modern sleek stat cards - INCREASED CONTRAST */}
        <div className="inline-flex flex-wrap justify-center gap-4 p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
          <div className="group px-8 py-5 bg-gradient-to-br from-electric-blue/20 to-transparent rounded-xl border-2 border-electric-blue/40 hover:border-electric-blue/60 transition-all min-w-[160px]">
            <div className="text-4xl font-bold text-white mb-1 drop-shadow-lg">
              50,000+
            </div>
            <div className="text-xs text-white/80 uppercase tracking-wide font-medium">Songs</div>
          </div>
          
          <div className="group px-8 py-5 bg-gradient-to-br from-electric-purple/20 to-transparent rounded-xl border-2 border-electric-purple/40 hover:border-electric-purple/60 transition-all min-w-[160px]">
            <div className="text-4xl font-bold text-white mb-1 drop-shadow-lg">
              250+
            </div>
            <div className="text-xs text-white/80 uppercase tracking-wide font-medium">Agencies</div>
          </div>
          
          <div className="group px-8 py-5 bg-gradient-to-br from-electric-cyan/20 to-transparent rounded-xl border-2 border-electric-cyan/40 hover:border-electric-cyan/60 transition-all min-w-[160px]">
            <div className="text-4xl font-bold text-white mb-1 drop-shadow-lg">
              100%
            </div>
            <div className="text-xs text-white/80 uppercase tracking-wide font-medium">Customizable</div>
          </div>
          
          <div className="group px-8 py-5 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl border-2 border-emerald-500/40 hover:border-emerald-500/60 transition-all min-w-[160px]">
            <div className="text-4xl font-bold text-white mb-1 drop-shadow-lg">
              Free
            </div>
            <div className="text-xs text-white/80 uppercase tracking-wide font-medium">Video Sync</div>
          </div>
        </div>
      </div>
    </section>
  )
}
