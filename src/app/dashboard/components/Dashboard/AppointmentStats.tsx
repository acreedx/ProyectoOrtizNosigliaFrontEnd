"use client";
import { listarCitasTotales } from "@/controller/dashboard/dashboard/listarCitas";
import {
  CalendarIcon,
  CheckCircleIcon,
  CloseIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardDataStats from "../Common/CardDataStats";

export default function AppointmentStats() {
  const [datosCitas, setdatosCitas] = useState<number[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setdatosCitas(await listarCitasTotales());
      setloading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {loading ? (
        <Spinner />
      ) : (
        <CardDataStats
          title="Citas Pendientes Totales"
          total={datosCitas[0].toString()}
        >
          <CalendarIcon color={"blue"} />
        </CardDataStats>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <CardDataStats
          title="Citas Confirmadas Totales"
          total={datosCitas[1].toString()}
        >
          <CheckCircleIcon color={"green"} />
        </CardDataStats>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <CardDataStats
          title="Citas Canceladas Totales"
          total={datosCitas[2].toString()}
        >
          <CloseIcon color={"red"} />
        </CardDataStats>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <CardDataStats
          title="Citas Completadas Totales"
          total={datosCitas[3].toString()}
        >
          <TimeIcon />
        </CardDataStats>
      )}
    </div>
  );
}
