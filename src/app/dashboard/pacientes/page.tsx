import React from "react";
import PacientesListado from "./listado/page";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Centro Ortiz Nosiglia",
  description: "Este es el sitio web del Centro Odontológico Ortiz Nosiglia",
};
export default function Pacientes() {
  return <PacientesListado />;
}
