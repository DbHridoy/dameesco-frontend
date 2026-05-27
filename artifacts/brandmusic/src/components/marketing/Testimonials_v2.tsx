
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Brandmusic's AI search understands exactly what we're looking for. We've cut our music selection time from days to minutes.",
    author: "Sarah Chen",
    role: "Creative Director",
    company: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    quote: "The video sync tool is a game-changer. We can present multiple music options to clients with their footage already synced. Approvals happen so much faster now.",
    author: "Marcus Rodriguez",
    role: "Senior Producer",
    company: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    quote: "Having full stem access for every track gives our post team incredible flexibility. We can fine-tune the mix to perfectly match our brand voice.",
    author: "Emily Thompson",
    role: "Brand Manager",
    company: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  },
  {
    quote: "The licensing is straightforward and the catalog is massive. We found the perfect track for our global campaign in under an hour.",
    author: "David Park",
    role: "VP of Marketing",
    company: "YouTube",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
  },
  {
    quote: "Brandmusic has become our go-to for all our content needs. The quality is consistently high and the team collaboration features keep everyone aligned.",
    author: "Jessica Martinez",
    role: "Content Director",
    company: "American Airlines",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/9b/American_Airlines_logo_2013.svg",
  },
  {
    quote: "The AI understands context in a way other platforms don't. When we ask for 'confident but not aggressive,' it gets it right every time.",
    author: "Michael Foster",
    role: "Chief Marketing Officer",
    company: "Citibank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Citi.svg",
  },
]

const brands = [
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "YouTube", logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" },
  { name: "American Airlines", logo: "https://upload.wikimedia.org/wikipedia/en/9/9b/American_Airlines_logo_2013.svg" },
  { name: "Citibank", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Citi.svg" },
]

export default function TestimonialsV2() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0A0A0A] via-[#0A0515] to-[#0A0A0A] overflow-hidden">
      {/* Subtle pink/purple gradient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-pink-500/10 via-fuchsia-500/10 to-purple-500/10 blur-[120px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-[40px] md:text-[56px] mb-6 text-white leading-[1.1]">
            Trusted by Leading Brands and Agencies
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            See what our clients are saying
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative group">
            {/* Subtle glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-fuchsia-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Card */}
            <div className="relative p-10 md:p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/10">
              {/* Quote icon */}
              <Quote className="w-12 h-12 text-pink-400/30 mb-6" />
              
              {/* Quote text */}
              <p className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                "{currentTestimonial.quote}"
              </p>

              {/* Author info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                  <img
                    src={currentTestimonial.logo}
                    alt={currentTestimonial.company}
                    width={40}
                    height={40}
                    className="object-contain grayscale opacity-70"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white text-lg">
                    {currentTestimonial.author}
                  </div>
                  <div className="text-white/60">
                    {currentTestimonial.role}, {currentTestimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center transition-all border border-white/10 hover:border-white/20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Progress dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-8 bg-gradient-to-r from-pink-500 to-purple-500'
                      : 'w-2 bg-white/20 hover:bg-white/30'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center transition-all border border-white/10 hover:border-white/20"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center max-w-5xl mx-auto">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center opacity-40 hover:opacity-70 transition-opacity grayscale hover:grayscale-0"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                width={100}
                height={40}
                className="object-contain max-h-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
