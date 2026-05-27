
import { Sparkles, Music, Video, Palette, Headphones, Zap, Users } from 'lucide-react'
import { useState } from 'react'

const features = [
  {
    icon: Music,
    title: 'AI-Powered Search',
    description: 'Talk to our AI like you\'d talk to a music supervisor. Natural language search that understands context and nuance.',
    gradient: 'from-electric-blue to-electric-cyan',
  },
  {
    icon: Video,
    title: 'Free Video Sync',
    description: 'Upload your video and preview tracks synced to your footage before licensing. Present to stakeholders with confidence.',
    gradient: 'from-electric-purple to-fuchsia-500',
  },
  {
    icon: Palette,
    title: 'Full Stem Access',
    description: 'Download separated stems for every track. Give your post team complete flexibility to create the perfect mix.',
    gradient: 'from-electric-cyan to-electric-blue',
  },
  {
    icon: Headphones,
    title: '50,000+ Tracks',
    description: 'Professionally produced music across every genre, mood, and use case. Updated weekly with fresh content.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Zap,
    title: 'Instant Licensing',
    description: 'Clear, transparent licensing with instant downloads. No waiting, no negotiations, no hidden fees.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share playlists, leave comments, and collaborate with your team. Get approvals faster and stay aligned.',
    gradient: 'from-teal-500 to-cyan-500',
  },
]

export default function FeaturesV2() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0A0A0A] via-[#0A0F1A] to-[#0A0A0A] overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric-purple/5 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-purple/10 border border-electric-purple/20 rounded-full text-sm font-medium mb-6 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-electric-purple/80" />
            <span className="text-electric-purple/90">Everything You Need</span>
          </div>
          <h2 className="font-display font-bold text-[40px] md:text-[56px] mb-6 text-white leading-[1.1]">
            Built for Your Workflow
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Tools designed for agencies, brand teams, and internal brand studios—from campaign concepting to final delivery
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            // Items 0 and 3 span 2 columns on large screens for asymmetric layout
            const isWide = idx === 0 || idx === 3
            
            return (
              <div
                key={feature.title}
                className={`group relative ${isWide ? 'lg:col-span-2' : ''}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Subtle gradient border glow on hover */}
                <div 
                  className={`absolute -inset-[1px] bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500`}
                />
                
                {/* Card */}
                <div className="relative h-full p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-500">
                  {/* Icon with gradient background */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} opacity-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:opacity-30 transition-all duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
