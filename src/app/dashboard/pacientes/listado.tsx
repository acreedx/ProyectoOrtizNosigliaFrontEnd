"use client";
import { useEffect, useState } from "react";
import { listarPacientes } from "@/controller/dashboard/pacientes/pacientesController";
import { Person } from "@prisma/client";
import DataTable, { TableColumn } from "react-data-table-component";
import { Badge } from "@chakra-ui/react";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { userStatus } from "@/enums/userStatus";
import {
  noDataFoundComponent,
  paginationOptions,
} from "@/utils/pagination_options";
import { mostrarAlertaError } from "@/utils/show_error_alert";

const TablePatients = () => {
  const [patients, setpatients] = useState<Person[]>([]);
  const [loading, setloading] = useState<Boolean>(true);
  async function fetchData() {
    setpatients(await listarPacientes());
    setloading(false);
  }
  useEffect(() => {
    try {
      fetchData();
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  }, []);
  const columns: TableColumn<Person>[] = [
    {
      name: "Nro",
      cell: (_, index) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Foto de perfil",
      cell: (row) => row.photoUrl,
      sortable: true,
    },
    {
      name: "Nombre completo",
      selector: (row) => personFullNameFormater(row),
      sortable: true,
    },
    {
      name: "Género",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Carnet",
      selector: (row) => row.identification,
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => (
        <Badge
          colorScheme={
            row.status === userStatus.ACTIVO
              ? "green"
              : row.status === userStatus.ELIMINADO
                ? "red"
                : row.status === userStatus.NUEVO
                  ? "blue"
                  : "gray"
          }
          padding={2}
          rounded={20}
        >
          {row.status}
        </Badge>
      ),
      sortable: true,
    },
    //{
    //  name: "Acciones",
    //  cell: (row) => (
    //    <div className="flex gap-4">
    //      <>
    //        {row.status === carePlanStatus.ENCURSO ? (
    //          <>
    //            <IconButton
    //              aria-label="Añadir radiografías"
    //              icon={<MdLibraryBooks color="purple" />}
    //              onClick={async () => {
    //                setselectedTreatment(row);
    //                setFields(await listarRadiografias(row.id));
    //                onOpenThirdModal();
    //              }}
    //            />
    //
    //            <IconButton
    //              aria-label="Editar"
    //              icon={<EditIcon color={"blue"} />}
    //              onClick={() => {
    //                setselectedTreatment(row);
    //                onOpen();
    //              }}
    //            />
    //            <IconButton
    //              aria-label="Completar"
    //              icon={<CheckIcon color="green" />}
    //              onClick={() => {
    //                Swal.fire({
    //                  title: "Confirmación",
    //                  text: "Quiere Completar este Tratamiento ?",
    //                  icon: "question",
    //                  showCancelButton: true,
    //                  confirmButtonText: "Sí",
    //                  cancelButtonText: "No, cancelar",
    //                  confirmButtonColor: "#28a745",
    //                  cancelButtonColor: "#dc3545",
    //                }).then(async (result) => {
    //                  if (result.isConfirmed) {
    //                    try {
    //                      const response = await completarTratamiento(row.id);
    //                      mostrarAlertaExito(response.message);
    //                      reloadData();
    //                    } catch (error: any) {
    //                      mostrarAlertaError(error);
    //                    }
    //                  }
    //                });
    //              }}
    //            />
    //            <IconButton
    //              aria-label="Eliminar"
    //              icon={<DeleteIcon color="#dc3545" />}
    //              onClick={() => {
    //                Swal.fire({
    //                  title: "Confirmación",
    //                  text: "Quiere Deshabilitar este Tratamiento ?",
    //                  icon: "question",
    //                  showCancelButton: true,
    //                  confirmButtonText: "Sí",
    //                  cancelButtonText: "No, cancelar",
    //                  confirmButtonColor: "#28a745",
    //                  cancelButtonColor: "#dc3545",
    //                }).then(async (result) => {
    //                  if (result.isConfirmed) {
    //                    try {
    //                      const response = await deshabilitarTratamiento(
    //                        row.id,
    //                      );
    //                      mostrarAlertaExito(response.message);
    //                      reloadData();
    //                    } catch (error: any) {
    //                      mostrarAlertaError(error);
    //                    }
    //                  }
    //                });
    //              }}
    //            />
    //          </>
    //        ) : (
    //          <IconButton
    //            aria-label="Habilitar"
    //            icon={<RestoreIcon />}
    //            onClick={() => {
    //              Swal.fire({
    //                title: "Confirmación",
    //                text: "Quiere Habilitar este Tratamiento ?",
    //                icon: "question",
    //                showCancelButton: true,
    //                confirmButtonText: "Sí",
    //                cancelButtonText: "No, cancelar",
    //                confirmButtonColor: "#28a745",
    //                cancelButtonColor: "#dc3545",
    //              }).then(async (result) => {
    //                if (result.isConfirmed) {
    //                  try {
    //                    const response = await habilitarTratamiento(row.id);
    //                    mostrarAlertaExito(response.message);
    //                    reloadData();
    //                  } catch (error: any) {
    //                    mostrarAlertaError(error);
    //                  }
    //                }
    //              });
    //            }}
    //          />
    //        )}
    //        {row.status === carePlanStatus.COMPLETADO && (
    //          <IconButton
    //            aria-label="Ver información"
    //            icon={<MdBookOnline color="#919191" />}
    //            onClick={() => {
    //              setselectedTreatment(row);
    //              console.log(row);
    //              onOpenSecondModal();
    //            }}
    //          />
    //        )}
    //      </>
    //    </div>
    //  ),
    //  ignoreRowClick: true,
    //},
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white px-1 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark  xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <DataTable
          columns={columns}
          data={patients}
          pagination
          highlightOnHover={false}
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
      </div>
    </div>
  );
};

export default TablePatients;
