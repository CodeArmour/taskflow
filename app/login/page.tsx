import LoginForm from "@/components/login-form"
import LanguageSwitcher from "@/components/language-switcher"
import ThemeToggle from "@/components/theme-toggle"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            TF
          </div>
          <span className="font-bold text-xl">TaskFlow</span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <LoginForm />
      </main>
    </div>
  )
}