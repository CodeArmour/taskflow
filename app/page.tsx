import { LandingLayout } from "@/components/layouts/landing-layout"
import  HeroSection  from "@/components/sections/landing/hero-section"
import  ServicesSection  from "@/components/sections/landing/services-section"
import  AboutSection  from "@/components/sections/landing/about-section"
import  TestimonialsSection  from "@/components/sections/landing/testimonials-section"
import  ContactSection  from "@/components/sections/landing/contact-section"

export default function Home() {
  return (
    <LandingLayout>
      <main className="min-h-screen">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </LandingLayout>
  )
}

