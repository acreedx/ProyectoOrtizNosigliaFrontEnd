import "./paginaweb/assets/css/animate.css";
import "./paginaweb/assets/css/LineIcons.css";
import "./paginaweb/assets/css/tiny-slider.css";
import "./paginaweb/assets/css/main.css";
import "./globals.css";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/app/dashboard/css/satoshi.css";
import "@/app/dashboard/css/style.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "./Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Centro Ortiz Nosiglia",
  description: "Este es el sitio web del Centro Odontológico Ortiz Nosiglia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
