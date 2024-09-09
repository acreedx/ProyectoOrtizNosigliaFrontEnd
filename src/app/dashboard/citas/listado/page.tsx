import React from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import TableThree from "../../components/Tables/TableThree";
import TablePatients from "../../components/Tables/TablePatients";

export default function ListadoCitas() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Citas" />
      <TablePatients />
    </DefaultLayout>
  );
}
