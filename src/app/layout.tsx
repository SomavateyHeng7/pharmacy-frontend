import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/layout/sidebar";
import AppHeader from "@/components/shared/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PharmaCare Management System",
  description: "Comprehensive pharmacy management solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <AuthProvider>
              <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
                <Sidebar />
                <div className="flex-1 flex flex-col h-screen overflow-hidden">
                  <AppHeader />
                  <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                  </main>
                </div>
              </div>
            </AuthProvider>
            <Toaster />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
