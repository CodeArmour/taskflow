"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { mockLoginCredentials } from "@/lib/mock-data"

export default function LoginForm() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form validation schema
  const formSchema = z.object({
    email: z.string().email({
      message: t("login.error.email"),
    }),
    password: z.string().min(6, {
      message: t("login.error.password"),
    }),
  })

  // Form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check against mock credentials
      if (
        values.email === mockLoginCredentials.admin.email &&
        values.password === mockLoginCredentials.admin.password
      ) {
        // Admin login - redirect to admin dashboard
        router.push("/dashboard")
      } else if (
        values.email === mockLoginCredentials.student.email &&
        values.password === mockLoginCredentials.student.password
      ) {
        // Student login - redirect to student dashboard (not implemented yet)
        router.push("/student-dashboard")
      } else {
        // Failed login
        setError(t("login.error.invalid"))
      }
    } catch (err) {
      setError(t("login.error.general"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="enhanced-card border-border/50 shadow-strong overflow-hidden">
        {/* Decorative top gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 animate-gradient-shift bg-[length:200%_auto]" />

        <CardHeader className="space-y-1 pt-8">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
              TF
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">{t("login.title")}</CardTitle>
          <CardDescription className="text-center">{t("login.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{t("login.email")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="name@example.com" className="pl-10 py-6 text-base" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{t("login.password")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10 py-6 text-base"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Eye className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20"
                >
                  {error}
                </motion.div>
              )}

              <Button type="submit" className="w-full btn-primary py-6 text-base font-medium" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>{t("login.loading")}</span>
                  </div>
                ) : (
                  t("login.submit")
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <Link href="#" className="text-primary hover:underline font-medium">
              {t("login.forgot")}
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col pb-8">
          <div className="text-center">
            <span className="text-muted-foreground">{t("login.no_account")} </span>
            <Link href="/register" className="text-primary hover:underline font-medium">
              {t("login.register")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

