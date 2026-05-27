
import { motion } from 'framer-motion'
import { AudioWaveform, Music, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import { Link } from 'wouter'

export default function ServicesSection() {
  return (
    <section className="py-20 lg:py-32 border-y border-white/5 bg-gradient-to-b from-background to-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated/50 backdrop-blur-sm rounded-full border border-electric-purple/30 mb-6">
            <AudioWaveform className="w-4 h-4 text-electric-purple" />
            <span className="text-sm font-medium text-electric-purple">Premium Services</span>
          </div>
          
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
            Need Something Truly Unique?
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            From custom compositions to complete sonic branding systems, our team of composers and strategists can create original music that's unmistakably yours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Music,
              title: 'Custom Music Commissions',
              description: 'Original compositions tailored to your brand'
            },
            {
              icon: AudioWaveform,
              title: 'Sonic Branding Packages',
              description: 'Complete sonic identity systems'
            },
            {
              icon: Music,
              title: 'Audio Logo Creation',
              description: 'Memorable sonic signatures'
            },
            {
              icon: AudioWaveform,
              title: 'Brand Sound Strategy',
              description: 'Strategic sonic identity consultation'
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 bg-surface-elevated rounded-xl border border-white/10 hover:border-electric-blue/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-electric-blue/20 to-electric-purple/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-electric-blue transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button size="lg" className="group">
              Explore Custom Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
