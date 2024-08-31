"use client";
import "./assets/css/animate.css";
import "./assets/css/LineIcons.css";
import "./assets/css/main.css";
import "./assets/css/tiny-slider.css";
import Header from "@/app/paginaweb/components/Header";
import Footer from "@/app/paginaweb/components/Footer";
import Main from "@/app/paginaweb/components/Main";
import { useEffect } from "react";
export default function PaginaWeb() {
  useEffect(() => {
    const bootstrapLink = document.createElement("link");
    bootstrapLink.rel = "stylesheet";
    bootstrapLink.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";

    document.head.appendChild(bootstrapLink);
    return () => {
      document.head.removeChild(bootstrapLink);
    };
  }, []);
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <a href="#" className="scroll-top">
        <i className="lni lni-arrow-up"></i>
      </a>
    </>
  );
}
