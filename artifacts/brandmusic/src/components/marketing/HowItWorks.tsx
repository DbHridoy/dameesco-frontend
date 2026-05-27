import { Search, Wand2, Download, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Brief Your Sound',
    description: 'Describe your brand personality and campaign goals. Our AI understands positioning, target audience, and competitive landscape.',
  },
  {
    icon: Wand2,
    number: '02',
    title: 'Present to Stakeholders',
    description: 'Upload client footage and preview curated track selections synced to video—before licensing. Get buy-in faster.',
  },
  {
    icon: Download,
    number: '03',
    title: 'Customize for Brand Fit',
    description: 'Access separated stems to refine the mix. Adjust energy levels, emphasize brand-appropriate elements, ensure sonic consistency.',
  },
  {
    icon: CheckCircle2,
    number: '04',
    title: 'Deploy Across Touchpoints',
    description: 'One master license covers your campaign across channels—paid media, social, experiential, internal. Clear licensing, predictable costs.',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0A0A0A] via-[#1F0A1A] to-[#0A0A0A] overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fuchsia-500/20 rounded-full blur-3xl" />
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-fuchsia-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-fuchsia-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-400 text-xs font-medium mb-6">
            Professional Workflow
          </div>
          <h2 className="font-display font-bold text-[36px] md:text-[52px] mb-6 text-white leading-[1.1]">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
            From brand brief to campaign deployment—built for agencies and in-house teams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500/0 via-pink-500/30 to-pink-500/0" />
          
          {steps.map((step, idx) => (
            <div key={step.number} className="relative group">
              <div className="relative p-6 bg-surface-elevated/60 rounded-2xl border border-pink-500/20 hover:border-pink-500/50 transition-all backdrop-blur-sm h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/50 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm">{step.number}</span>
                </div>
                
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 rounded-xl flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform border border-pink-500/30">
                  <step.icon className="w-7 h-7 text-pink-400" />
                </div>
                
                <h3 className="font-semibold text-lg text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 w-8 h-8 text-pink-500/30">
                  <svg className="w-full h-full"="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
