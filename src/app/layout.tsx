import type { Metadata } from "next";
import { SessionProvider } from "@/components/auth/session-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "DOshomik IELTS — Platform to Create",
  description:
    "Advance your IELTS skills with DOshomik. Build skills with owned resources, practise each IELTS module, complete original mock tests, and see transparent unofficial band estimates.",
  openGraph: {
    title: "DOshomik IELTS — Platform to Create",
    description:
      "Advance your IELTS skills with DOshomik. Build skills with owned resources, practise each IELTS module, complete original mock tests, and see transparent unofficial band estimates.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="blue" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
