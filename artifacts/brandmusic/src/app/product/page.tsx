
import { motion } from 'framer-motion'
import { Search, Video, Sliders, Fingerprint, Building2, Zap, Music, Globe } from 'lucide-react'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const features = [
  {
    icon: Search,
    title: 'AI-Powered Search',
    description: 'Find music by describing what you need',
    details: [
      'Natural language search - "confident but not aggressive"',
      'Semantic understanding of mood and emotion',
      'Context-aware recommendations',
      'Filter by genre, BPM, key, instruments, vocals',
      'Similar track suggestions',
      'Save and organize favorites',
    ],
    color: 'blue',
  },
  {
    icon: Video,
    title: 'Video Sync',
    description: 'Test tracks against your content instantly',
    details: [
      'Upload any video file (MP4, MOV, etc.)',
      'Drag-and-drop track testing',
      'Real-time playback synchronization',
      'Compare multiple tracks side-by-side',
      'Share synced previews with team',
      'Free for all users',
    ],
    color: 'purple',
  },
  {
    icon: Sliders,
    title: 'Stem Studio',
    description: 'Customize any track to match your vision',
    details: [
      'Isolate individual stems (drums, bass, melody, vocals, FX)',
      'Adjust volume for each stem independently',
      'Mute or solo specific instruments',
      'Create custom mixes',
      'Export customized versions',
      'Preview changes before downloading',
    ],
    color: 'cyan',
  },
  {
    icon: Building2,
    title: 'Brand Portal',
    description: 'Centralized hub for your brand sound',
    details: [
      'Upload brand guidelines and reference tracks',
      'Define approved and off-brand sounds',
      'Team access with permissions',
      'Campaign organization',
      'Asset tagging and metadata',
      'Enterprise feature',
    ],
    color: 'blue',
  },
  {
    icon: Fingerprint,
    title: 'Sonic DNA',
    description: 'AI learns and enforces your brand sound',
    details: [
      'Train AI on your brand examples',
      'Auto-tag tracks as "on-brand" or "off-brand"',
      'Improve search relevance over time',
      'Export as shareable brand document',
      'Version control and history',
      'Enterprise feature',
    ],
    color: 'purple',
  },
  {
    icon: Music,
    title: 'Custom Commissions',
    description: 'Original music created for your brand',
    details: [
      'Brief our composers on your vision',
      'Receive 3 original demos',
      'Unlimited revisions',
      'Full commercial license included',
      'Stems and cutdowns provided',
      'Premium service - contact for quote',
    ],
    color: 'cyan',
  },
  {
    icon: Zap,
    title: 'API Access',
    description: 'Integrate SONAR into your workflow',
    details: [
      'REST API for programmatic access',
      'Webhook support for real-time updates',
      'Search, download, and manage assets',
      'Bulk operations',
      'Developer documentation',
      'Enterprise feature',
    ],
    color: 'blue',
  },
  {
    icon: Globe,
    title: 'Integrations',
    description: 'Works with tools you already use',
    details: [
      'Adobe Premiere & After Effects',
      'Final Cut Pro',
      'Slack notifications',
      'Google Drive sync',
      'Frame.io collaboration',
      'More integrations coming soon',
    ],
    color: 'purple',
  },
]

const workflow = [
  {
    step: '01',
    title: 'Discover',
    description: 'Use AI search to find tracks that match your vision. Describe what you need in natural language.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Validate',
    description: 'Upload your video and test tracks instantly. See how music works with your content before licensing.',
    icon: Video,
  },
  {
    step: '03',
    title: 'Customize',
    description: 'Adjust individual stems to perfect the mix. Create exactly the sound you need.',
    icon: Sliders,
  },
  {
    step: '04',
    title: 'License',
    description: 'Request a custom quote for commercial licensing. Our team provides transparent pricing based on your usage.',
    icon: Fingerprint,
  },
]

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated/50 backdrop-blur-sm rounded-full border border-electric-blue/30 mb-8">
              <Zap className="w-4 h-4 text-electric-blue" />
              <span className="text-sm font-medium text-electric-blue">Product Overview</span>
            </div>

            <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
              Everything You Need to
              <br />
              <span className="gradient-blue-purple text-gradient">Find Perfect Music</span>
            </h1>

            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12">
              AI-powered search, instant video sync, unlimited customization, and transparent licensing—all in one unified workflow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Browse Library
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Streamlined Workflow
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              From discovery to licensing in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-electric-blue/20 to-electric-purple/20 rounded-xl mb-4">
                    <item.icon className="w-8 h-8 text-electric-blue" />
                  </div>
                  <div className="text-sm text-electric-blue font-mono font-bold mb-2">
                    {item.step}
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Professional tools for music supervisors, producers, and creative teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:border-electric-blue/30 transition-colors">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br from-electric-${feature.color}/20 to-electric-purple/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-6 h-6 text-electric-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-2xl mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-tertiary">
                        <div className="w-1.5 h-1.5 rounded-full bg-electric-blue mt-2 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-surface/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-display font-bold text-electric-blue mb-2">
                2,500+
              </div>
              <div className="text-text-secondary">
                Curated Tracks
              </div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-display font-bold text-electric-purple mb-2">
                100%
              </div>
              <div className="text-text-secondary">
                Customizable with Stems
              </div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-display font-bold text-electric-cyan mb-2">
                Free
              </div>
              <div className="text-text-secondary">
                Video Sync & AI Search
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-4xl mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Browse free, subscribe for unlimited downloads, license per project.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="font-display font-bold text-2xl mb-2">Free</div>
              <div className="text-text-secondary text-sm mb-4">
                Watermarked downloads
              </div>
              <div className="text-4xl font-display font-bold mb-4">$0</div>
            </Card>

            <Card className="p-6 border-electric-blue">
              <div className="font-display font-bold text-2xl mb-2">Pro</div>
              <div className="text-text-secondary text-sm mb-4">
                Unlimited clean downloads
              </div>
              <div className="text-4xl font-display font-bold mb-4">
                $45<span className="text-lg text-text-tertiary">/seat</span>
              </div>
            </Card>

            <Card className="p-6">
              <div className="font-display font-bold text-2xl mb-2">Enterprise</div>
              <div className="text-text-secondary text-sm mb-4">
                10 seats + advanced features
              </div>
              <div className="text-4xl font-display font-bold mb-4">Custom</div>
            </Card>
          </div>
          <Button size="lg">
            View Full Pricing
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5 bg-surface/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-4xl mb-4">
            Ready to Transform Your Music Workflow?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Start browsing our catalog free, or try Pro with a 14-day trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              Browse Library
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
