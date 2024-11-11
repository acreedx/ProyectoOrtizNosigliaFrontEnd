import React from "react";
import { metadata } from "../../../config/metadata";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Breadcrumb from "../components/Common/Breadcrumb";
import TablePatients from "./listado";
export { metadata };
export default function Pacientes() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de pacientes" />
      <TablePatients />
    </DefaultLayout>
  );
}
