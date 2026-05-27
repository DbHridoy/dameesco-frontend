
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import { Sparkles, Music, Mic2, Volume2, Lightbulb, Radio, Palette, Headphones, ArrowRight, Code } from 'lucide-react'
import { Link } from 'wouter'
import Button from '@/components/ui/Button'

const services = [
  {
    icon: Music,
    title: 'Custom Music Commissions',
    tagline: 'Original compositions tailored to your brand',
    description: 'Work with our team of professional composers to create original music that\'s unmistakably yours. Perfect for brands that need something truly unique beyond our catalog.',
    color: 'from-electric-blue to-electric-cyan',
  },
  {
    icon: Mic2,
    title: 'Sonic Branding Packages',
    tagline: 'Complete sonic identity systems',
    description: 'Develop a comprehensive sonic identity that works across all touchpoints—from audio logos to brand anthems. Create consistency in how your brand sounds.',
    color: 'from-electric-purple to-fuchsia-500',
  },
  {
    icon: Volume2,
    title: 'Audio Logo Creation',
    tagline: 'Memorable sonic signatures',
    description: 'A short, distinctive sound that becomes synonymous with your brand. Think Intel\'s bong or McDonald\'s "I\'m Lovin\' It." Make your brand instantly recognizable.',
    color: 'from-electric-cyan to-electric-blue',
  },
  {
    icon: Lightbulb,
    title: 'Brand Sound Strategy',
    tagline: 'Strategic sonic identity consultation',
    description: 'Not sure where to start? Our sonic strategists help you understand how sound can elevate your brand and create a roadmap for implementation.',
    color: 'from-pink-500 to-fuchsia-600',
  },
]

const additionalServices = [
  {
    icon: Radio,
    title: 'Podcast & Video Series Themes',
    description: 'Custom intro/outro music for your content series',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Palette,
    title: 'Campaign-Specific Music',
    description: 'Original tracks created for specific marketing campaigns',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Headphones,
    title: 'Music Supervision',
    description: 'Expert guidance on music selection and licensing',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Code,
    title: 'Live Commerce API Integration',
    description: 'Power your e-commerce experiences with our music library via API',
    color: 'from-indigo-500 to-blue-500',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-electric-blue/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-electric-purple/10 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-electric-cyan/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-purple/10 border border-electric-purple/20 rounded-full text-sm font-medium mb-6 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-electric-purple/80" />
            <span className="text-electric-purple/90">Premium Services</span>
          </div>
          
          <h1 className="font-display font-bold text-[48px] md:text-[72px] mb-6 text-white leading-[1.1]">
            Custom Music & Sonic Branding
          </h1>
          
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">
            From custom compositions to complete sonic branding systems, our team of composers and strategists can create original music that's unmistakably yours.
          </p>

          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-electric-blue to-electric-purple hover:shadow-xl hover:shadow-electric-blue/30">
              Schedule Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-b from-transparent via-[#0A0515]/30 to-transparent overflow-hidden">
        <div className="absolute left-0 top-1/3 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[100px]" />
        <div className="absolute right-0 bottom-1/3 w-[500px] h-[500px] bg-electric-cyan/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.title} className="group relative">
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${service.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity`} />
                <div className="relative p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all h-full flex flex-col">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} opacity-20 rounded-2xl flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="font-display font-bold text-3xl mb-3 text-white">
                    {service.title}
                  </h2>
                  
                  <p className={`text-base bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-6 font-medium`}>
                    {service.tagline}
                  </p>
                  
                  <p className="text-base text-white/70 mb-8 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  <Link href="/contact">
                    <Button className={`w-full group bg-gradient-to-r ${service.color} hover:shadow-lg transition-all`}>
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A15] to-[#0A0A0A] overflow-hidden">
        <div className="absolute right-1/4 top-1/4 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[120px]" />
        <div className="absolute left-1/4 bottom-1/4 w-[600px] h-[600px] bg-electric-cyan/5 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-[40px] md:text-[56px] mb-6 text-white leading-[1.1]">
              Additional Services
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Specialized services for unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service) => (
              <div key={service.title} className="group relative">
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity`} />
                <div className="relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all h-full">
                  <div className={`w-12 h-12 bg-gradient-to-br ${service.color} opacity-20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-white mb-3">{service.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-6">{service.description}</p>
                  <Link href="/contact" className="text-electric-blue hover:text-electric-cyan text-sm font-medium inline-flex items-center gap-2">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
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
                Ready to Create Something Unique?
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Schedule a free consultation to discuss your project and get a custom quote.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-electric-blue to-electric-purple hover:shadow-xl hover:shadow-electric-blue/30">
                  Schedule Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <p className="text-sm text-white/40 mt-6">
                Free 30-minute consultation • No obligation
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
