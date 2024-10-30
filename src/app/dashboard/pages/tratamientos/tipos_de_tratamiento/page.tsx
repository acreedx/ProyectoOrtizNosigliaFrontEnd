import Breadcrumb from "@/app/dashboard/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import React from "react";

export default function Page() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tipos de Tratamiento" />
    </DefaultLayout>
  );
}
