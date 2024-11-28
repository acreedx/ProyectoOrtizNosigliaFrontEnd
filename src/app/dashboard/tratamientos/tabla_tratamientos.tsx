"use client";
import {
  noDataFoundComponent,
  paginationOptions,
} from "@/utils/pagination_options";
import { EditIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { Badge, IconButton, useDisclosure } from "@chakra-ui/react";
import { CarePlan, ImagingStudy, Patient, Person } from "@prisma/client";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Swal from "sweetalert2";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { carePlanStatus } from "@/enums/carePlanStatus";
import { MdBookOnline, MdUploadFile } from "react-icons/md";
import {
  completarTratamiento,
  deshabilitarTratamiento,
  habilitarTratamiento,
} from "@/controller/dashboard/tratamientos/cambiarEstadoTratamiento";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import { listarPacientes } from "@/controller/dashboard/pacientes/pacientesController";
import { listarRadiografias } from "@/controller/dashboard/tratamientos/listarRadiografias";
import RestoreIcon from "../components/Icons/RestoreIcon";
import { birthDateFormater } from "@/utils/birth_date_formater";
import ModalEditar from "./modal_editar";
import ModalInformacion from "./modal_informacion";
import ModalRadiografias from "./modal_radiografias";

export default function TablaTratamientos({
  carePlans,
  reloadData,
}: {
  carePlans: (CarePlan & { subject: Patient })[];
  reloadData: Function;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSecondModalOpen,
    onOpen: onOpenSecondModal,
    onClose: onCloseSecondModal,
  } = useDisclosure();
  const {
    isOpen: isThirdModalOpen,
    onOpen: onOpenThirdModal,
    onClose: onCloseThirdModal,
  } = useDisclosure();
  const [selectedTreatment, setselectedTreatment] = useState<CarePlan>();
  const [pacientes, setpacientes] = useState<Patient[]>([]);

  const fetchData = async () => {
    setpacientes(await listarPacientes());
  };

  const columns: TableColumn<CarePlan & { subject: Patient }>[] = [
    {
      name: "Nro",
      cell: (_, index) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Tipo",
      cell: (row) => row.treatmentType,
      sortable: true,
    },
    {
      name: "Título",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Fecha Inicio",
      selector: (row) => birthDateFormater(row.startDate),
      sortable: true,
    },
    {
      name: "Paciente Asignado",
      selector: (row) => personFullNameFormater(row.subject),
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => (
        <Badge
          colorScheme={
            row.status === carePlanStatus.COMPLETADO
              ? "gray"
              : row.status === carePlanStatus.CANCELADO
                ? "red"
                : row.status === carePlanStatus.ENCURSO
                  ? "green"
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
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex gap-4">
          <>
            {row.status === carePlanStatus.ENCURSO ? (
              <>
                <IconButton
                  aria-label="Añadir radiografías"
                  icon={<MdUploadFile color="purple" />}
                  onClick={async () => {
                    setselectedTreatment(row);
                    onOpenThirdModal();
                  }}
                />
                <IconButton
                  aria-label="Editar"
                  icon={<EditIcon color={"blue"} />}
                  onClick={() => {
                    setselectedTreatment(row);
                    onOpen();
                  }}
                />
                <IconButton
                  aria-label="Completar"
                  icon={<CheckIcon color="green" />}
                  onClick={() => {
                    Swal.fire({
                      title: "Confirmación",
                      text: "Quiere Completar este Tratamiento ?",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonText: "Sí",
                      cancelButtonText: "No, cancelar",
                      confirmButtonColor: "#28a745",
                      cancelButtonColor: "#dc3545",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        try {
                          const response = await completarTratamiento(row.id);
                          mostrarAlertaExito(response.message);
                          reloadData();
                        } catch (error: any) {
                          mostrarAlertaError(error);
                        }
                      }
                    });
                  }}
                />
                <IconButton
                  aria-label="Eliminar"
                  icon={<DeleteIcon color="#dc3545" />}
                  onClick={() => {
                    Swal.fire({
                      title: "Confirmación",
                      text: "Quiere Deshabilitar este Tratamiento ?",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonText: "Sí",
                      cancelButtonText: "No, cancelar",
                      confirmButtonColor: "#28a745",
                      cancelButtonColor: "#dc3545",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        try {
                          const response = await deshabilitarTratamiento(
                            row.id,
                          );
                          mostrarAlertaExito(response.message);
                          reloadData();
                        } catch (error: any) {
                          mostrarAlertaError(error);
                        }
                      }
                    });
                  }}
                />
              </>
            ) : (
              <IconButton
                aria-label="Habilitar"
                icon={<RestoreIcon />}
                onClick={() => {
                  Swal.fire({
                    title: "Confirmación",
                    text: "Quiere Habilitar este Tratamiento ?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Sí",
                    cancelButtonText: "No, cancelar",
                    confirmButtonColor: "#28a745",
                    cancelButtonColor: "#dc3545",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      try {
                        const response = await habilitarTratamiento(row.id);
                        mostrarAlertaExito(response.message);
                        reloadData();
                      } catch (error: any) {
                        mostrarAlertaError(error);
                      }
                    }
                  });
                }}
              />
            )}
            {row.status === carePlanStatus.COMPLETADO && (
              <IconButton
                aria-label="Ver información"
                icon={<MdBookOnline color="#919191" />}
                onClick={() => {
                  setselectedTreatment(row);
                  onOpenSecondModal();
                }}
              />
            )}
          </>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];
  useEffect(() => {
    try {
      fetchData();
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  }, []);
  return (
    <>
      <DataTable
        columns={columns}
        data={carePlans}
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
      <ModalEditar
        isOpen={isOpen}
        onClose={onClose}
        reloadData={fetchData}
        reloadUpperData={reloadData}
        selectedTreatment={selectedTreatment}
        pacientes={pacientes}
      />
      <ModalInformacion
        isSecondModalOpen={isSecondModalOpen}
        onCloseSecondModal={onCloseSecondModal}
        selectedTreatment={selectedTreatment}
      />
      <ModalRadiografias
        isThirdModalOpen={isThirdModalOpen}
        onCloseThirdModal={onCloseThirdModal}
        selectedTreatment={selectedTreatment}
      />
    </>
  );
}
