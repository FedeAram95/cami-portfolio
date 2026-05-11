import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cami Piana | Diseñadora Gráfica & Estratega Visual",
  description:
    "Portfolio de Camila Piana. Diseñadora gráfica con +7 años de experiencia en branding, UX/UI, paid media y email marketing. Argentina.",
  keywords: [
    "diseñadora gráfica",
    "graphic designer",
    "branding",
    "UX/UI",
    "portfolio",
    "Camila Piana",
    "Argentina",
  ],
  openGraph: {
    title: "Cami Piana | Diseñadora Gráfica & Estratega Visual",
    description:
      "+7 años creando identidades visuales que conectan marcas con personas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ThemeProvider>
            <DataProvider>
              {children}
            </DataProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
