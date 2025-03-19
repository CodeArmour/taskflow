"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactSection() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsSuccess(false)
    setIsError(false)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    } catch (error) {
      setIsError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("contact.title")}</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>{t("contact.title")}</CardTitle>
                <CardDescription>{t("contact.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Input placeholder={t("contact.name")} required className="bg-background" />
                    </div>
                    <div>
                      <Input type="email" placeholder={t("contact.email")} required className="bg-background" />
                    </div>
                    <div>
                      <Textarea placeholder={t("contact.message")} required className="min-h-32 bg-background" />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span>{t("contact.submit")}</span>
                      </div>
                    )}
                  </Button>

                  {isSuccess && (
                    <motion.p
                      className="text-green-500 text-center mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {t("contact.success")}
                    </motion.p>
                  )}

                  {isError && (
                    <motion.p
                      className="text-red-500 text-center mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {t("contact.error")}
                    </motion.p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="aspect-video rounded-xl overflow-hidden">
              <img src="/images/map.png" alt="Map" className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-border/50">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Mail className="h-10 w-10 text-primary mb-4" />
                  <p className="font-medium">info@taskflow.com</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Phone className="h-10 w-10 text-primary mb-4" />
                  <p className="font-medium">+1 (555) 123-4567</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <MapPin className="h-10 w-10 text-primary mb-4" />
                  <p className="font-medium">New York, NY</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

