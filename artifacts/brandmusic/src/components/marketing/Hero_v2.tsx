
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react'
import { Link } from 'wouter'
import Button from '../ui/Button'
import { useEffect, useRef } from 'react'

export default function HeroV2() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Animated particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />

      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-electric-blue/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-electric-purple/20 via-transparent to-transparent" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/30 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/30 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-electric-cyan/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center pt-32 pb-20">
        {/* Animated badge */}
        <div className="mb-8 inline-block animate-fade-in">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue via-electric-cyan to-electric-purple rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-black border border-white/10 rounded-full text-sm font-medium backdrop-blur-xl">
              <Sparkles className="w-4 h-4 text-electric-cyan" />
              <span className="bg-gradient-to-r from-electric-cyan to-electric-blue bg-clip-text text-transparent">
                AI-Powered Music Discovery
              </span>
              <Zap className="w-4 h-4 text-electric-blue" />
            </div>
          </div>
        </div>
        
        {/* Main headline with stagger animation */}
        <h1 className="font-display font-bold text-[48px] md:text-[64px] lg:text-[88px] mb-8 leading-[0.95] text-white">
          <span className="block animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Discover Music That
          </span>
          <span className="block mt-4 bg-gradient-to-r from-electric-blue via-electric-cyan to-electric-purple bg-clip-text text-transparent animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Sounds Like Your Brand
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.3s' }}>
          Talk to our AI like you'd talk to a music supervisor. Get the perfect track in minutes.
        </p>
        
        {/* Glassmorphic search bar preview */}
        <div className="max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue via-electric-cyan to-electric-purple rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative flex items-center gap-4 p-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10">
              <Play className="w-6 h-6 text-electric-cyan flex-shrink-0" />
              <input
                type="text"
                placeholder="Try: 'Confident but not aggressive for a tech startup...'"
                className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-base"
                disabled
              />
              <button className="px-6 py-2 bg-gradient-to-r from-electric-blue to-electric-cyan rounded-xl text-white font-medium hover:shadow-lg hover:shadow-electric-blue/50 transition-all">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <Link href="/signup">
            <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-electric-blue to-electric-cyan hover:shadow-2xl hover:shadow-electric-blue/50 transition-all duration-300">
              <span className="relative z-10 flex items-center">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          <Link href="/library">
            <Button variant="outline" size="lg" className="border-white/20 hover:border-white/40 backdrop-blur-xl">
              Browse Library
            </Button>
          </Link>
        </div>
        
        {/* Modern stat cards with bento layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="group relative overflow-hidden p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-electric-blue/50 transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-4xl font-bold text-white mb-1">50K+</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Songs</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-electric-purple/50 transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-4xl font-bold text-white mb-1">250+</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Agencies</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-electric-cyan/50 transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-4xl font-bold text-white mb-1">100%</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Customizable</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-4xl font-bold text-white mb-1">Free</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Video Sync</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
