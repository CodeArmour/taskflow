"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Users, BarChart, CheckSquare } from "lucide-react"
import { motion } from "framer-motion"

export default function ServicesSection() {
  const { t } = useLanguage()

  const services = [
    {
      icon: <ClipboardList className="h-12 w-12 text-primary" />,
      title: t("services.task.title"),
      description: t("services.task.description"),
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: t("services.assignment.title"),
      description: t("services.assignment.description"),
    },
    {
      icon: <BarChart className="h-12 w-12 text-primary" />,
      title: t("services.tracking.title"),
      description: t("services.tracking.description"),
    },
    {
      icon: <CheckSquare className="h-12 w-12 text-primary" />,
      title: t("services.evaluation.title"),
      description: t("services.evaluation.description"),
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container px-4 md:px-6 relative">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-heading text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pb-4">
            {t("services.title")}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-6">{t("services.subtitle")}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card className="enhanced-card h-full border-border/50 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit">{service.icon}</div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </section>
  )
}

