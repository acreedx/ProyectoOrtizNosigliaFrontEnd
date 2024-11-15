import "./paginaweb/assets/css/animate.css";
import "./paginaweb/assets/css/LineIcons.css";
import "./paginaweb/assets/css/tiny-slider.css";
import "./paginaweb/assets/css/main.css";
import "./globals.css";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/app/dashboard/assets/css/satoshi.css";
import "@/app/dashboard/assets/css/style.css";
import { Inter } from "next/font/google";
import { Providers } from "./Providers";
import { metadata } from "../config/metadata";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Script
          strategy="beforeInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
