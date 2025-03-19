"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("about.title")}</h2>
              <p className="text-muted-foreground md:text-xl">{t("about.subtitle")}</p>
            </div>

            <div className="space-y-4">
              <p className="text-foreground/90">{t("about.description")}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <p className="font-medium">{t("about.mission")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <p className="font-medium">{t("about.vision")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden border border-border/50 shadow-xl">
              <img
                src="/images/about.jpg"
                alt="About TaskFlow"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 -top-6 -right-6 w-64 h-64 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary/20 blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

