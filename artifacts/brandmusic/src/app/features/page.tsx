
import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import { Sparkles, Search, Video, Sliders, Users, Wand2, Music, Database, Zap, Shield, BarChart, Headphones, ArrowRight, Code } from 'lucide-react'
import { Link } from 'wouter'
import Button from '@/components/ui/Button'

const heroFeatures = [
  {
    icon: Search,
    title: 'AI-Powered Search',
    description: 'Talk to our AI like you would talk to a music supervisor',
    color: 'from-electric-blue to-electric-cyan',
  },
  {
    icon: Video,
    title: 'Video Sync Tool',
    description: 'Preview tracks against your footage instantly',
    color: 'from-electric-purple to-fuchsia-500',
  },
  {
    icon: Sliders,
    title: 'Stem Control',
    description: 'Full access to separated audio stems',
    color: 'from-electric-cyan to-electric-blue',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share playlists and collaborate seamlessly',
    color: 'from-pink-500 to-fuchsia-600',
  },
]

const detailedFeatures = [
  {
    icon: Wand2,
    title: 'Conversational AI Search',
    description: 'Our AI understands nuanced descriptions like "confident but not aggressive" or "warm, nostalgic with forward momentum." No more scrolling through endless tracks—just describe what you need.',
    benefits: [
      'Natural language queries',
      'Context-aware recommendations',
      'Learn your preferences over time',
      'Search by mood, genre, energy, or use case',
    ],
    color: 'from-electric-blue to-electric-cyan',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
  },
  {
    icon: Video,
    title: 'Free Video Sync Preview',
    description: 'Upload your video and instantly preview how tracks sound synced to your footage—before you even license. Present multiple options to clients and get approvals faster.',
    benefits: [
      'Drag-and-drop video upload',
      'Real-time audio sync',
      'No upload to cloud (privacy-first)',
      'Export preview videos',
    ],
    color: 'from-electric-purple to-fuchsia-500',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
  },
  {
    icon: Sliders,
    title: 'Professional Stem Access',
    description: 'Every track includes separated stems (drums, bass, melody, vocals). Give your post team complete flexibility to create the perfect mix for your brand.',
    benefits: [
      'Isolated instrument tracks',
      'Adjust levels independently',
      'Remove or emphasize elements',
      'Perfect for brand consistency',
    ],
    color: 'from-electric-cyan to-electric-blue',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share playlists, leave comments, and collaborate with your team. Keep everyone aligned on sonic direction from concepting through final delivery.',
    benefits: [
      'Shared workspaces',
      'Comment threads on tracks',
      'Version history',
      'Role-based permissions',
    ],
    color: 'from-pink-500 to-fuchsia-600',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
  },
]

const additionalFeatures = [
  {
    icon: Database,
    title: '50,000+ Premium Tracks',
    description: 'Professionally produced music across every genre, mood, and use case. Updated weekly with fresh content.',
    color: 'from-electric-blue to-electric-purple',
  },
  {
    icon: Zap,
    title: 'Instant Downloads',
    description: 'Download tracks and stems immediately. No waiting, no processing delays. Get what you need when you need it.',
    color: 'from-electric-cyan to-electric-blue',
  },
  {
    icon: Shield,
    title: 'Clear Licensing',
    description: 'Transparent pricing and licensing terms. Know exactly what you are getting with no hidden fees or surprises.',
    color: 'from-electric-purple to-violet-500',
  },
  {
    icon: BarChart,
    title: 'Usage Analytics',
    description: 'Track which songs are used in which campaigns. Maintain a clear record for compliance and reporting.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Headphones,
    title: 'High-Quality Audio',
    description: 'All tracks available in lossless WAV format. Professional-grade audio for broadcast and production.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Music,
    title: 'Custom Commissions',
    description: 'Need something truly unique? Our team of composers can create original music tailored to your brand.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Code,
    title: 'API for Live Commerce',
    description: 'Integrate our music library directly into your e-commerce platform, live shopping streams, and product pages via API.',
    color: 'from-indigo-500 to-blue-500',
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-electric-blue/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-electric-purple/10 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-electric-cyan/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-electric-purple/10 border border-electric-purple/20 rounded-full text-sm font-medium mb-6 backdrop-blur-xl"
              variants={scaleIn}
            >
              <Sparkles className="w-4 h-4 text-electric-purple/80" />
              <span className="text-electric-purple/90">Platform Capabilities</span>
            </motion.div>
            
            <motion.h1 
              className="font-display font-bold text-[48px] md:text-[72px] mb-6 text-white leading-[1.1]"
              variants={fadeInUp}
            >
              Built for Agency Workflows
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/60 max-w-3xl mx-auto mb-12"
              variants={fadeInUp}
            >
              Professional tools designed for creative directors, producers, and brand teams who demand precision and flexibility
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {heroFeatures.map((feature, idx) => (
              <motion.div 
                key={feature.title} 
                className="group relative"
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`} />
                <div className="relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} opacity-20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-b from-transparent via-[#0A0515]/30 to-transparent overflow-hidden">
        <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[100px]" />
        <div className="absolute right-0 bottom-1/4 w-[500px] h-[500px] bg-electric-cyan/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-32">
            {detailedFeatures.map((feature, idx) => (
              <motion.div
                key={feature.title}
                className={`grid lg:grid-cols-2 gap-16 items-center ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                <motion.div 
                  className={idx % 2 === 1 ? 'lg:order-2' : ''}
                  variants={fadeInUp}
                >
                  <motion.div 
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} opacity-20 rounded-2xl flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  <h2 className="font-display font-bold text-[36px] md:text-[48px] mb-6 text-white leading-[1.1]">
                    {feature.title}
                  </h2>
                  
                  <p className="text-lg text-white/70 mb-8 leading-relaxed">
                    {feature.description}
                  </p>

                  <motion.div 
                    className="space-y-3 mb-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {feature.benefits.map((benefit) => (
                      <motion.div 
                        key={benefit} 
                        className="flex items-start gap-3"
                        variants={fadeInUp}
                      >
                        <div className={`w-5 h-5 bg-gradient-to-br ${feature.color} opacity-60 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <span className="text-white/80">{benefit}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <Link href="/signup">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" className={`group bg-gradient-to-r ${feature.color} hover:shadow-lg transition-all`}>
                        Try It Free
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>

                <motion.div 
                  className={idx % 2 === 1 ? 'lg:order-1' : ''}
                  variants={fadeInUp}
                >
                  <motion.div 
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={`absolute -inset-4 bg-gradient-to-r ${feature.color} rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500`} />
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/20">
                      <img
                        src={feature.image}
                        alt=""
                       
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A15] to-[#0A0A0A] overflow-hidden">
        <div className="absolute right-0 top-1/3 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[120px]" />
        <div className="absolute left-0 bottom-1/3 w-[600px] h-[600px] bg-electric-cyan/5 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="font-display font-bold text-[40px] md:text-[56px] mb-6 text-white leading-[1.1]">
              Everything You Need
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              A complete suite of tools for modern music licensing
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {additionalFeatures.map((feature) => (
              <motion.div 
                key={feature.title} 
                className="group relative"
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`} />
                <div className="relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} opacity-20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-white mb-3">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric-purple/5 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div 
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-electric-blue via-electric-purple to-electric-cyan rounded-3xl blur-2xl opacity-20" />
            <div className="relative p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20">
              <h2 className="font-display font-bold text-[36px] md:text-[48px] mb-6 text-white leading-[1.1]">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Join hundreds of agencies and brands using AI to find the perfect soundtrack in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-gradient-to-r from-electric-blue to-electric-purple hover:shadow-xl hover:shadow-electric-blue/30">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/library">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" size="lg" className="border-white/20 hover:border-white/40">
                      Browse Music
                    </Button>
                  </motion.div>
                </Link>
              </div>
              <p className="text-sm text-white/40 mt-6">
                No credit card required • 14-day free trial
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
