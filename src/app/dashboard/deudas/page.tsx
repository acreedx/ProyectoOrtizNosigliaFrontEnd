"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "../components/Common/Breadcrumb";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { Account } from "@prisma/client";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import {
  listarDeudas,
  pagarDeuda,
} from "@/controller/dashboard/deudas/deudasController";
import { Badge, Box, Heading, IconButton, Spinner } from "@chakra-ui/react";
import {
  paginationOptions,
  noDataFoundComponent,
} from "@/utils/pagination_options";
import DataTable, { TableColumn } from "react-data-table-component";
import { EditIcon } from "@chakra-ui/icons";
import { AccountStatus } from "@/enums/accountStatus";
import { MdPayment } from "react-icons/md";
import { mostrarAlertaConfirmacion } from "@/utils/show_question_alert";
import { mostrarAlertaExito } from "@/utils/show_success_alert";

export default function Page() {
  const [loading, setloading] = useState(true);
  const [deudas, setdeudas] = useState<Account[]>([]);
  const columns: TableColumn<Account>[] = [
    {
      name: "Balance de cuenta",
      cell: (row) => row.balance,
      ignoreRowClick: true,
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => (
        <Badge
          colorScheme={
            row.billingStatus === AccountStatus.CON_DEUDA ? "red" : "green"
          }
          padding={2}
          rounded={20}
        >
          {row.billingStatus === AccountStatus.CON_DEUDA
            ? "En deuda"
            : "Sin deuda"}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex gap-4">
          {row.billingStatus === AccountStatus.CON_DEUDA && (
            <IconButton
              aria-label="Pagar deuda"
              title="Pagar deuda"
              icon={<MdPayment color={"blue"} />}
              onClick={async () => {
                const isConfirmed = await mostrarAlertaConfirmacion(
                  "Confirmación",
                  "Esta seguro de pagar esta deuda",
                );
                if (isConfirmed) {
                  try {
                    const response = await pagarDeuda(row.id);
                    mostrarAlertaExito(response.message);
                  } catch (e: any) {
                    mostrarAlertaError(e);
                  }
                }
              }}
            />
          )}
        </div>
      ),
      ignoreRowClick: true,
    },
  ];
  const fetchData = async () => {
    try {
      setdeudas(await listarDeudas());
    } catch (e: any) {
      mostrarAlertaError(e);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Panel de deudas" />
      {loading ? (
        <Spinner />
      ) : (
        <Box className="w-full rounded-sm border border-stroke bg-white py-6 shadow-default">
          <Heading as="h4" size="md" className="mb-6 px-7.5 text-black">
            Listado de Deudas
          </Heading>
          <DataTable
            columns={columns}
            data={deudas}
            pagination
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
