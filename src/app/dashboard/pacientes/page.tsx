"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TablePatients from "@/components/Tables/TablePatients";
export default function Pacientes() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de pacientes" />
      <TablePatients />
    </DefaultLayout>
  );
}
