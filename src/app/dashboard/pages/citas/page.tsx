import { Metadata } from "next";
import React from "react";
import ListadoCitas from "./calendario/page";
export const metadata: Metadata = {
  title: "Centro Ortiz Nosiglia",
  description: "Este es el sitio web del Centro Odontológico Ortiz Nosiglia",
};
export default function Citas() {
  return <ListadoCitas />;
}
