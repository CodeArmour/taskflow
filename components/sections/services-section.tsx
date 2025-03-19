"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Users, BarChart, CheckSquare } from "lucide-react"
import { motion } from "framer-motion"

export default function ServicesSection() {
  const { t } = useLanguage()

  const services = [
    {
      icon: <ClipboardList className="h-10 w-10 text-primary" />,
      title: t("services.task.title"),
      description: t("services.task.description"),
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: t("services.assignment.title"),
      description: t("services.assignment.description"),
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: t("services.tracking.title"),
      description: t("services.tracking.description"),
    },
    {
      icon: <CheckSquare className="h-10 w-10 text-primary" />,
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
    <section id="services" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("services.title")}</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t("services.subtitle")}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full border-border/50 transition-all duration-300 hover:shadow-md hover:border-primary/50">
                <CardHeader className="pb-2">
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

