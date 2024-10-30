import React from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

export default function Page() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Tratamientos" />
    </DefaultLayout>
  );
}
