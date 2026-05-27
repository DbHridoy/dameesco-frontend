
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Brandmusic's AI search saved us 10+ hours per campaign. We find perfect tracks in minutes, not days.",
    author: "Sarah Chen",
    role: "Music Supervisor",
    company: "Horizon Creative Agency",
    rating: 5,
  },
  {
    quote: "The video sync feature is a game-changer. We can present 5 options to clients synced to their footage before even licensing.",
    author: "Marcus Rodriguez",
    role: "Creative Director",
    company: "Pulse Productions",
    rating: 5,
  },
  {
    quote: "Finally, a platform built for professionals. Stem customization means we never have to settle for 'close enough'.",
    author: "Emily Thompson",
    role: "Brand Manager",
    company: "TechForward Inc.",
    rating: 5,
  },
]

const logos = [
  'Horizon Creative',
  'Pulse Productions',
  'TechForward',
  'Momentum Agency',
  'Vertex Media',
  'Catalyst Brands',
]

const stats = [
  { value: '2,500+', label: 'Premium Tracks' },
  { value: '500+', label: 'Agencies & Brands' },
  { value: '100%', label: 'Customizable' },
  { value: 'Free', label: 'Video Sync' },
]

export default function SocialProof() {
  return (
    <section className="py-20 lg:py-32 bg-surface/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-electric-blue mb-2">
                {stat.value}
              </div>
              <div className="text-text-tertiary">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Trusted by Leading Professionals
            </h2>
            <p className="text-xl text-text-secondary">
              See what music supervisors and creative directors are saying
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-surface-elevated rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5-electric-blue text-electric-blue" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-electric-blue/30 mb-4" />

                <p className="text-text-secondary mb-6 italic">
                  "{testimonial.quote}"
                </p>

                <div className="border-t border-white/5 pt-4">
                  <div className="font-semibold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-text-tertiary">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-electric-blue">
                    {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-text-tertiary mb-8">Trusted by leading agencies and brands</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="p-4 bg-surface-elevated rounded-lg border border-white/5 hover:border-electric-blue/30 transition-colors"
              >
                <div className="font-display font-bold text-sm text-text-tertiary group-hover:text-white transition-colors">
                  {logo}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
