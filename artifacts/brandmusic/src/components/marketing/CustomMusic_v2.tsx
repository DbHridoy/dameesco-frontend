
import { useEffect, useRef } from 'react'
import { Music, Mic2, Volume2, Lightbulb } from 'lucide-react'
import { Link } from 'wouter'
import Button from '@/components/ui/Button'

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

export default function CustomMusicV2() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Audio visualization bars
    const bars = 32
    const barHeights = Array(bars).fill(0).map(() => Math.random())
    const barTargets = Array(bars).fill(0).map(() => Math.random())
    const barSpeeds = Array(bars).fill(0).map(() => 0.02 + Math.random() * 0.03)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = canvas.width / bars
      const maxHeight = canvas.height * 0.8

      barHeights.forEach((height, i) => {
        // Smoothly interpolate to target
        barHeights[i] += (barTargets[i] - height) * barSpeeds[i]

        // Set new random target occasionally
        if (Math.random() < 0.01) {
          barTargets[i] = Math.random()
        }

        const x = i * barWidth + barWidth * 0.2
        const w = barWidth * 0.6
        const h = maxHeight * barHeights[i]
        const y = canvas.height - h

        // Gradient for each bar (pink to purple to cyan)
        const gradient = ctx.createLinearGradient(x, y, x, canvas.height)
        gradient.addColorStop(0, 'rgba(236, 72, 153, 0.8)') // pink
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.8)') // purple
        gradient.addColorStop(1, 'rgba(34, 211, 238, 0.8)') // cyan

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, w, h)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-transparent via-[#0A0515]/50 to-transparent">
      {/* Pink/Purple background effects */}
      <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]" />
      <div className="absolute right-0 bottom-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[120px]" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-sm font-medium mb-8 backdrop-blur-xl">
              <Music className="w-4 h-4 text-pink-400" />
              <span className="text-pink-300">Premium Services</span>
            </div>
            
            <h2 className="font-display font-bold text-[40px] md:text-[56px] mb-6 text-white leading-[1.1]">
              Need Something Truly Unique?
            </h2>
            
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              From custom compositions to complete sonic branding systems, our team of composers and strategists can create original music that's unmistakably yours.
            </p>

            {/* Service cards in 2x2 grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {services.map((service) => (
                <div key={service.title} className="group relative">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity" />
                  <div className="relative p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/20 transition-all h-full flex flex-col">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <service.icon className="w-5 h-5 text-pink-400" />
                    </div>
                    <h3 className="font-bold text-base text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/services">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:shadow-xl hover:shadow-pink-500/30">
                View All Services
              </Button>
            </Link>
          </div>

          {/* Right side - Animated visualization */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-fuchsia-500/20 to-cyan-400/20 rounded-3xl blur-xl opacity-50" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-xs text-white/70">Custom Audio Visualization</span>
              </div>
              <div className="relative h-64 mt-8">
                <canvas ref={canvasRef} className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
