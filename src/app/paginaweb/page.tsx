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
