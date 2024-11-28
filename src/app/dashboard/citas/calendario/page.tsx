"use client";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Common/Breadcrumb";
import CrearCitas from "./crear_citas";

export default function ListadoCitas() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calendario de Citas" />
      <div className="rounded-sm border border-stroke bg-white p-8 text-black shadow-default dark:border-strokedark dark:bg-boxdark">
        <CrearCitas />
      </div>
    </DefaultLayout>
  );
}
