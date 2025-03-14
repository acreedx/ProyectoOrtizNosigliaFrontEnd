"use client";
import React, { useEffect, useState } from "react";
import { Spinner, Box, Heading } from "@chakra-ui/react";
import { CarePlan, Patient, Person } from "@prisma/client";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import TablaTratamientos from "./tabla_tratamientos";
import BotonCreacion from "./boton_creacion";
import { carePlanStatus } from "@/enums/carePlanStatus";
import { listarTratamientos } from "@/controller/dashboard/tratamientos/listar";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Breadcrumb from "../components/Common/Breadcrumb";

export default function Page() {
  const [loading, setloading] = useState(true);
  const [carePlans, setCarePlans] = useState<
    (CarePlan & { subject: Patient })[]
  >([]);
  const fetchData = async () => {
    try {
      setCarePlans(await listarTratamientos());
      setloading(false);
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Tratamientos" />
      {loading ? (
        <Spinner />
      ) : (
        <Box className="w-full rounded-sm border border-stroke bg-white py-6 shadow-default">
          <BotonCreacion reloadData={fetchData} />
          <Heading as="h4" size="md" className="mb-6 px-7.5 text-black">
            Tabla de tratamientos
          </Heading>
          <TablaTratamientos reloadData={fetchData} carePlans={carePlans} />
        </Box>
      )}
    </DefaultLayout>
  );
}
