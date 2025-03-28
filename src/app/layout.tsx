import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "../hooks/useAuth";
import { Analytics } from "@vercel/analytics/react";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bíblia para Todos - Análise Bíblica com IA",
  description: "Explore a Bíblia com análise teológica impulsionada por IA",
  icons: {
    icon: "/jesus.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={(inter.className, "bg-background")}>
        <Analytics />
        <AuthProvider>
          <main className="container mx-auto">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
