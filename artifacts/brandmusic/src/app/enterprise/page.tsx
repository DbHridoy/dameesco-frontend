
import { useState } from 'react'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import { Building2, Users, Shield, Zap, HeadphonesIcon, Scale, ArrowRight, Plus, Minus } from 'lucide-react'
import { Link } from 'wouter'
import Button from '@/components/ui/Button'

const enterpriseFeatures = [
  {
    icon: Building2,
    title: 'Enterprise-Grade Infrastructure',
    description: 'Built for scale with guaranteed uptime, dedicated resources, and enterprise-level support to keep your team moving.',
    color: 'from-electric-blue to-electric-cyan',
    points: [
      '99.9% uptime SLA guarantee',
      'Dedicated account manager',
      'Priority support with 1-hour response time',
      'Custom onboarding and training',
      'Quarterly business reviews'
    ]
  },
  {
    icon: Users,
    title: 'Team Management & Collaboration',
    description: 'Empower your entire organization with unlimited seats, granular permissions, and seamless collaboration tools.',
    color: 'from-electric-purple to-fuchsia-500',
    points: [
      'Unlimited team seats',
      'Role-based access control (Admin, Editor, Viewer)',
      'Shared playlists and workspaces',
      'Activity logs and audit trails',
      'SSO (Single Sign-On) integration'
    ]
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security and compliance certifications to meet your organization\'s strictest requirements.',
    color: 'from-electric-cyan to-electric-blue',
    points: [
      'SOC 2 Type II certified',
      'GDPR and CCPA compliant',
      'Data encryption at rest and in transit',
      'Custom data retention policies',
      'On-premise deployment options'
    ]
  },
  {
    icon: Zap,
    title: 'Advanced Features',
    description: 'Unlock powerful capabilities including API access, white-label options, and custom integrations tailored to your workflow.',
    color: 'from-pink-500 to-fuchsia-600',
    points: [
      'API access for custom integrations',
      'Bulk licensing and asset management',
      'White-label options available',
      'Custom music curation and playlists',
      'Advanced analytics and reporting'
    ]
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Support',
    description: 'Get access to our team with 24/7 support, dedicated channels, and ongoing training to maximize your investment.',
    color: 'from-electric-blue to-electric-purple',
    points: [
      '24/7 dedicated support team',
      'Slack or Teams integration',
      'Regular product training sessions',
      'Early access to new features',
      'Custom feature development (upon request)'
    ]
  },
  {
    icon: Scale,
    title: 'Flexible Licensing',
    description: 'Custom pricing and licensing agreements designed to scale with your organization and usage needs.',
    color: 'from-electric-cyan to-electric-blue',
    points: [
      'Volume-based pricing discounts',
      'Custom licensing agreements',
      'Multi-year contract options',
      'Usage-based billing available',
      'Unlimited downloads for licensed tracks'
    ]
  }
]

function AccordionItem({ feature, index }: { feature: typeof enterpriseFeatures[0], index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="group relative">
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity`} />
      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-8 flex items-start justify-between text-left"
        >
          <div className="flex items-start gap-6 flex-1">
            <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} opacity-20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
              <feature.icon className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-2xl text-white mb-3">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed">{feature.description}</p>
            </div>
          </div>
          
          <div className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 bg-white/10' : ''}`}>
            {isOpen ? (
              <Minus className="w-5 h-5 text-white" />
            ) : (
              <Plus className="w-5 h-5 text-white" />
            )}
          </div>
        </button>

        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-8 pb-8 pt-0">
            <div className="pl-20 space-y-3">
              {feature.points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-5 h-5 bg-gradient-to-br ${feature.color} opacity-60 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span className="text-white/80 leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EnterprisePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-electric-blue/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-electric-purple/10 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-electric-cyan/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-purple/10 border border-electric-purple/20 rounded-full text-sm font-medium mb-6 backdrop-blur-xl">
              <Building2 className="w-4 h-4 text-electric-purple/80" />
              <span className="text-electric-purple/90">For Large Organizations</span>
            </div>
            
            <h1 className="font-display font-bold text-[48px] md:text-[72px] mb-6 text-white leading-[1.1]">
              Enterprise Solutions
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">
              Custom plans designed for agencies, networks, and brands that need advanced features, dedicated support, and enterprise-grade security
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-electric-blue to-electric-purple hover:shadow-xl hover:shadow-electric-blue/30">
                  Schedule a Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white/20 hover:border-white/40">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-b from-transparent via-[#0A0515]/30 to-transparent overflow-hidden">
        <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[100px]" />
        <div className="absolute right-0 bottom-1/4 w-[500px] h-[500px] bg-electric-cyan/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-[40px] md:text-[56px] mb-6 text-white leading-[1.1]">
              Everything You Need at Scale
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Click to expand and explore our comprehensive enterprise features
            </p>
          </div>

          <div className="space-y-4">
            {enterpriseFeatures.map((feature, index) => (
              <AccordionItem key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-[40px] md:text-[56px] mb-6 text-white leading-[1.1]">
              Trusted by Leading Brands
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Join hundreds of agencies, networks, and enterprises using BrandMusic
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-white/60">Enterprise Clients</div>
            </div>
            <div className="relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <div className="text-5xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white/60">Uptime Guarantee</div>
            </div>
            <div className="relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <div className="text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/60">Dedicated Support</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric-purple/5 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-electric-blue via-electric-purple to-electric-cyan rounded-3xl blur-2xl opacity-20" />
            <div className="relative p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20">
              <h2 className="font-display font-bold text-[36px] md:text-[48px] mb-6 text-white leading-[1.1]">
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Schedule a personalized demo with our team to see how BrandMusic can scale with your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-electric-blue to-electric-purple hover:shadow-xl hover:shadow-electric-blue/30">
                  Schedule Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 hover:border-white/40">
                  Download Case Studies
                </Button>
              </div>
              <p className="text-sm text-white/40 mt-6">
                Custom pricing • Volume discounts • Flexible terms
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
