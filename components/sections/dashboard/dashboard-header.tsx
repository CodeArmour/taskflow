"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export function DashboardHeader() {
  const { t } = useLanguage();
  const { data: session, status } = useSession();

  // Get a welcome message with proper handling of loading state
  const getWelcomeMessage = () => {
    if (status === "loading") {
      return null; // Return null while loading
    }

    return `${t("dashboard.welcome")}, ${session?.user.name || ""}! ${t(
      "dashboard.overview"
    )}`;
  };

  const welcomeMessage = getWelcomeMessage();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <motion.h1
          className="text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("nav.dashboard")}
        </motion.h1>

        {welcomeMessage && (
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            key={welcomeMessage} // Key helps re-trigger animation when content changes
          >
            {welcomeMessage}
          </motion.p>
        )}
      </div>

      <motion.div
        className="mt-4 md:mt-0 flex space-x-2"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          <span>March 2025</span>
        </Button>
      </motion.div>
    </div>
  );
}
