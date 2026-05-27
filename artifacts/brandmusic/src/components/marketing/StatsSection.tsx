import { Music, Users, Sliders, Video } from 'lucide-react'

const stats = [
  {
    icon: Music,
    number: '50,000+',
    label: 'Songs',
    color: 'from-electric-blue to-electric-cyan',
    borderColor: 'border-electric-blue/30',
  },
  {
    icon: Users,
    number: '250+',
    label: 'Agencies & Brands',
    color: 'from-electric-purple to-fuchsia-500',
    borderColor: 'border-electric-purple/30',
  },
  {
    icon: Sliders,
    number: '100%',
    label: 'Customizable',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/30',
  },
  {
    icon: Video,
    number: 'Free',
    label: 'Video Sync',
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/30',
  },
]

export default function StatsSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0A0A0A] to-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 via-electric-purple/5 to-electric-cyan/5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`group relative p-6 bg-surface-elevated/80 rounded-2xl border ${stat.borderColor} backdrop-blur-sm hover:scale-105 transition-all duration-300`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
              
              <div className="relative mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} opacity-20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
                </div>
              </div>
              
              <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </div>
              
              <div className="text-sm text-text-secondary">
                {stat.label}
              </div>
              
              <div className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-br ${stat.color} rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
