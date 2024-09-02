"use client";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import React from "react";
import Breadcrumb from "@/app/dashboard/components/Breadcrumbs/Breadcrumb";
import TablePatients from "@/app/dashboard/components/Tables/TablePatients";

export default function PacientesListado() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de pacientes" />
      <TablePatients />
    </DefaultLayout>
  );
}
