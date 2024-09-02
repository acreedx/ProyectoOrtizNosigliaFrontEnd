import "./assets/css/animate.css";
import "./assets/css/LineIcons.css";
import "./assets/css/main.css";
import "./assets/css/tiny-slider.css";
import Home from "../paginaweb/pages/home/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centro Ortiz Nosiglia",
  description: "Este es el sitio web del Centro Odontológico Ortiz Nosiglia",
};

export default function PaginaWeb() {
  return (
    <>
      <Home />
    </>
  );
}
