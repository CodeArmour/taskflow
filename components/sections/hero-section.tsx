"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10">
          <motion.div
            className="space-y-4 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{t("hero.title")}</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t("hero.subtitle")}</p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" className="px-8">
              {t("hero.cta")}
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              {t("hero.secondary")}
            </Button>
          </motion.div>

          <motion.div
            className="relative w-full max-w-5xl mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card">
              <img
                src="/images/hero.jpg"
                alt="TaskFlow Dashboard Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary/30 blur-xl" />
            <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-primary/20 blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

