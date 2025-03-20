import type React from "react"
import  Navbar  from "@/components/organisms/landing/navbar"
import  Footer  from "@/components/organisms/landing/footer"

export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

