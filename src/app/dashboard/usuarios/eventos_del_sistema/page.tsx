"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { AuditEvent } from "@prisma/client";
import { listarLogs } from "@/controller/dashboard/usuarios/logs/listarLogs";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  noDataFoundComponent,
  paginationOptions,
} from "@/utils/pagination_options";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Common/Breadcrumb";
export default function Logs() {
  const [loading, setloading] = useState(true);
  const [auditEvents, setauditEvents] = useState<AuditEvent[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setauditEvents((await listarLogs()) as AuditEvent[]);
        setloading(false);
      } catch (e) {
        Swal.fire("Error");
      }
    };
    fetchData();
  }, []);
  const columns: TableColumn<AuditEvent>[] = [
    {
      name: "Fecha",
      cell: (row) => row.occurredDateTime.toLocaleDateString(),
      ignoreRowClick: true,
      sortable: true,
    },
    {
      name: "Hora",
      selector: (row) => row.occurredDateTime.toLocaleTimeString(),
      sortable: true,
    },
    {
      name: "Usuario",
      selector: (row) => row.personName,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.personRole,
      sortable: true,
    },
    {
      name: "Evento",
      selector: (row) => row.severity,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.outcome || "desconocido",
      sortable: true,
    },
    {
      name: "Detalle",
      selector: (row) => row.detail,
      sortable: true,
    },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Actividad" />
      {loading ? (
        <Spinner />
      ) : (
        <Box className="w-full rounded-sm border border-stroke bg-white py-6 shadow-default">
          <Heading as="h4" size="md" className="mb-6 px-7.5 text-black">
            Últimas actividades registradas
          </Heading>
          <DataTable
            columns={columns}
            data={auditEvents}
            pagination
            highlightOnHover
            responsive
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 15, 20]}
            paginationComponentOptions={paginationOptions}
            noDataComponent={noDataFoundComponent}
            customStyles={{
              headCells: {
                style: {
                  fontSize: "1rem",
                  fontWeight: "bold",
                  justifyContent: "center",
                },
              },
              cells: {
                style: {
                  justifyContent: "center",
                },
              },
            }}
          />
        </Box>
      )}
    </DefaultLayout>
  );
}
