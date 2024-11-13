import React, { FormEventHandler } from "react";
import { metadata } from "../../../config/metadata";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Breadcrumb from "../components/Common/Breadcrumb";
import CrearPaciente from "./crearPaciente";
import ListadoPacientes from "./listadoPacientes";
export { metadata };
export default function Pacientes() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de pacientes" />
      <div className="flex">
        <CrearPaciente />
      </div>
      <ListadoPacientes />
    </DefaultLayout>
  );
}
