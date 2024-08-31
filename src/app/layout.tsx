"use client";
import "jsvectormap/dist/jsvectormap.css";
import { Inter } from "next/font/google";
import "flatpickr/dist/flatpickr.min.css";
import "@/app/dashboard/css/satoshi.css";
import "@/app/dashboard/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/app/dashboard/components/common/Loader";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // const pathname = usePathname();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
