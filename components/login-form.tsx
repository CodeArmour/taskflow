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

      // For demo purposes, let's just check if email contains "admin"
      if (values.email.includes("admin")) {
        // Successful login - redirect to dashboard
        router.push("/dashboard")
      } else {
        // Failed login
        setError(t("login.error.invalid"))
      }
    } catch{
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
      <Card className="border-border/50">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t("login.title")}</CardTitle>
          <CardDescription className="text-center">{t("login.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("login.email")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="name@example.com" className="pl-10" {...field} />
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
                    <FormLabel>{t("login.password")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input type={showPassword ? "text" : "password"} className="pl-10 pr-10" {...field} />
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
                  className="p-3 rounded-md bg-destructive/10 text-destructive text-sm"
                >
                  {error}
                </motion.div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>{t("login.loading")}</span>
                  </div>
                ) : (
                  t("login.submit")
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            <Link href="#" className="text-primary hover:underline">
              {t("login.forgot")}
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">{t("login.no_account")} </span>
            <Link href="/register" className="text-primary hover:underline">
              {t("login.register")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

