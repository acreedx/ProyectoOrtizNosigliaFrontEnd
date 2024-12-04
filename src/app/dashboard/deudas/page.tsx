"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "../components/Common/Breadcrumb";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { Account, Patient } from "@prisma/client";
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
import { AccountStatus } from "@/enums/accountStatus";
import { MdPayment } from "react-icons/md";
import { mostrarAlertaConfirmacion } from "@/utils/show_question_alert";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import { personFullNameFormater } from "@/utils/format_person_full_name";

export default function Page() {
  const [loading, setloading] = useState(true);
  const [deudas, setdeudas] = useState<(Patient & { account: Account })[]>([]);
  const columns: TableColumn<Patient & { account: Account }>[] = [
    {
      name: "Paciente",
      cell: (row) => personFullNameFormater(row),
      ignoreRowClick: true,
      sortable: true,
    },
    {
      name: "Balance de cuenta",
      cell: (row) => row.account.balance + " bs",
      ignoreRowClick: true,
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => (
        <Badge
          colorScheme={
            row.account.billingStatus === AccountStatus.CON_DEUDA
              ? "red"
              : "green"
          }
          padding={2}
          rounded={20}
        >
          {row.account.billingStatus === AccountStatus.CON_DEUDA
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
          {row.account.billingStatus === AccountStatus.CON_DEUDA && (
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
                    const response = await pagarDeuda(row.accountId);
                    mostrarAlertaExito(response.message);
                    fetchData();
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
