import { Metadata } from "next";
import PaginaWeb from "./paginaweb/page";

export const metadata: Metadata = {
  title: "Centro Ortiz Nosiglia",
  description: "Este es el sitio web del Centro Odontológico Ortiz Nosiglia",
};

export default function Home() {
  return (
    <>
      <PaginaWeb />
    </>
  );
}
