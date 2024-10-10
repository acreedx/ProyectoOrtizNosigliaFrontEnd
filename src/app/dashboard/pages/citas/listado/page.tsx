import React from "react";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import TableCitas from "../../../components/Tables/TableCitas";

export default function ListadoCitas() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Citas" />
      <TableCitas />
    </DefaultLayout>
  );
}
