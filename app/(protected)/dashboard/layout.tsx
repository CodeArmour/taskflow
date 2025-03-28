import type React from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { SessionProvider } from "next-auth/react";
export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SessionProvider>
  );
}
