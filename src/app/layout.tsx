import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { StoreInitializer } from "@/components/store-initializer";
import { ErrorBoundary } from "@/components/error-boundary";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CL WMS - Heavy Lift Warehouse Management System",
  description: "Enterprise Warehouse Management System for Heavy Lift & Project Cargo Operations by Combi Lift",
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=JSON.parse(localStorage.getItem('wms-app-store'));if(s&&s.state&&s.state.locale){document.documentElement.lang=s.state.locale;document.documentElement.dir=s.state.locale==='ar'?'rtl':'ltr'}}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <StoreInitializer />
            <Providers>
              {children}
            </Providers>
            <Toaster richColors position="top-center" />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}