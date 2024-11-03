"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Spinner, Box, Heading } from "@chakra-ui/react";
import { CarePlan } from "@prisma/client";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import TablaTratamientos from "./tabla_tratamientos";
import BotonCreacion from "./boton_creacion";
import { carePlanStatus } from "@/enums/carePlanStatus";

export default function Page() {
  const [loading, setloading] = useState(true);
  const [carePlans, setcarePlans] = useState<CarePlan[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setcarePlans([
          {
            treatmentType: "Endodoncia",
            title: "Plan de tratamiento ortodóntico",
            description: "Plan para corregir la alineación dental.",
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-12-31"),
            estimatedAppointments: 12,
            daysBetweenAppointments: 30,
            totalAppointments: 12,
            costEstimation: 1500.0,
            status: carePlanStatus.ENCURSO,
          } as CarePlan,
          {
            treatmentType: "Ortodoncia",
            title: "Plan de tratamiento ortodóntico",
            description: "Plan para corregir la alineación dental.",
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-12-31"),
            estimatedAppointments: 12,
            daysBetweenAppointments: 30,
            totalAppointments: 12,
            costEstimation: 1500.0,
            status: carePlanStatus.CANCELADO,
          } as CarePlan,
          {
            treatmentType: "Rinoplastia",
            title: "Plan de tratamiento ortodóntico",
            description: "Plan para corregir la alineación dental.",
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-12-31"),
            estimatedAppointments: 12,
            daysBetweenAppointments: 30,
            totalAppointments: 12,
            costEstimation: 1500.0,
            status: carePlanStatus.COMPLETADO,
          } as CarePlan,
        ]);
        setloading(false);
      } catch (e: any) {
        mostrarAlertaError(e);
      }
    };
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Tratamientos" />
      {loading ? (
        <Spinner />
      ) : (
        <Box className="w-full rounded-sm border border-stroke bg-white py-6 shadow-default">
          <BotonCreacion />
          <Heading as="h4" size="md" className="mb-6 px-7.5 text-black">
            Tabla de tratamientos
          </Heading>
          <TablaTratamientos carePlans={carePlans} />
        </Box>
      )}
    </DefaultLayout>
  );
}
