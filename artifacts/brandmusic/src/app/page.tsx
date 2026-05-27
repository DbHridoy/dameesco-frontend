import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import HeroV2 from '@/components/marketing/Hero_v2'
import FeaturesV2 from '@/components/marketing/Features_v2'
import TestimonialsV2 from '@/components/marketing/Testimonials_v2'
import PricingSectionV2 from '@/components/marketing/PricingSection_v2'
import CustomMusicV2 from '@/components/marketing/CustomMusic_v2'
import CTASectionV2 from '@/components/marketing/CTASection_v2'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      <HeroV2 />
      <FeaturesV2 />
      <TestimonialsV2 />
      <PricingSectionV2 />
      <CustomMusicV2 />
      <CTASectionV2 />
      <Footer />
    </main>
  )
}
