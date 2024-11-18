"use client";
import Breadcrumb from "@/app/dashboard/components/Common/Breadcrumb";
import RestoreIcon from "@/app/dashboard/components/Icons/RestoreIcon";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import {
  paginationOptions,
  noDataFoundComponent,
} from "@/utils/pagination_options";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { Treatments } from "@prisma/client";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Swal from "sweetalert2";
import CreacionTipoTratamiento from "./creacionTipoTratamiento";
import { listarTiposTratamiento } from "@/controller/dashboard/tipos_de_tratamiento/listarTiposTratamiento";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { editarTipoTratamiento } from "@/controller/dashboard/tipos_de_tratamiento/editarTiposTratamiento";
import {
  deshabilitarTipoTratamiento,
  habilitarTipoTratamiento,
} from "@/controller/dashboard/tipos_de_tratamiento/cambiarEstadoTratamiento";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setloading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTreatment, setselectedTreatment] = useState<Treatments>();
  const [tratamientos, settratamientos] = useState<Treatments[]>([]);
  const fetchData = async () => {
    settratamientos(await listarTiposTratamiento());
    setloading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns: TableColumn<Treatments>[] = [
    {
      name: "Nro",
      cell: (_, index) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Tipo de Tratamiento",
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
      name: "Citas Estimadas",
      selector: (row) => row.estimatedAppointments,
      sortable: true,
    },
    {
      name: "Días entre tratamientos",
      selector: (row) => row.daysBetweenAppointments,
      sortable: true,
    },
    {
      name: "Costo estimado",
      selector: (row) => row.costEstimation,
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => (
        <Badge
          colorScheme={row.active ? "green" : "red"}
          padding={2}
          rounded={20}
        >
          {row.active ? "Activo" : "Inactivo"}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex gap-4">
          <IconButton
            aria-label="Editar"
            icon={<EditIcon color={"blue"} />}
            onClick={() => {
              setselectedTreatment(row);
              onOpen();
            }}
          />
          {row.active ? (
            <IconButton
              aria-label="Eliminar"
              icon={<DeleteIcon color="#dc3545" />}
              onClick={() => {
                Swal.fire({
                  title: "Confirmación",
                  text: "Quiere deshabilitar este Tipo de tratamiento ?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonText: "Sí",
                  cancelButtonText: "No, cancelar",
                  confirmButtonColor: "#28a745",
                  cancelButtonColor: "#dc3545",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try {
                      const response = await deshabilitarTipoTratamiento(
                        row.id,
                      );
                      mostrarAlertaExito(response.message);
                      fetchData();
                    } catch (error: any) {
                      mostrarAlertaError(error);
                    }
                  }
                });
              }}
            />
          ) : (
            <IconButton
              aria-label="Habilitar"
              icon={<RestoreIcon />}
              onClick={() => {
                Swal.fire({
                  title: "Confirmación",
                  text: "Quiere habilitar este Tipo de tratamiento ?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonText: "Sí",
                  cancelButtonText: "No, cancelar",
                  confirmButtonColor: "#28a745",
                  cancelButtonColor: "#dc3545",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try {
                      const response = await habilitarTipoTratamiento(row.id);
                      mostrarAlertaExito(response.message);
                      fetchData();
                    } catch (error: any) {
                      mostrarAlertaError(error);
                    }
                  }
                });
              }}
            />
          )}
        </div>
      ),
      ignoreRowClick: true,
    },
  ];
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const tratamiento: Treatments = {
      treatmentType: formData.get("treatmentType") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      estimatedAppointments: Number(formData.get("estimatedAppointments")),
      daysBetweenAppointments: Number(formData.get("daysBetweenAppointments")),
      costEstimation: Number(formData.get("costEstimation")),
    } as Treatments;
    try {
      const response = await editarTipoTratamiento(
        formData.get("id") as string,
        tratamiento,
      );
      onClose();
      mostrarAlertaExito(response.message);
      fetchData();
    } catch (error: any) {
      onClose();
      mostrarAlertaError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tipos de Tratamiento" />
      {loading ? (
        <Spinner />
      ) : (
        <Box className="w-full rounded-sm border border-stroke bg-white py-6 shadow-default">
          <CreacionTipoTratamiento reloadData={fetchData} />
          <Heading as="h4" size="md" className="mb-6 px-7.5 text-black">
            Tabla de Tipos de tratamiento
          </Heading>
          <>
            <DataTable
              columns={columns}
              data={tratamientos}
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
          </>
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalHeader>
            <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
              Editar tipo de Tratamiento
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full">
              <Box>
                <form onSubmit={handleSubmit}>
                  <input
                    name="id"
                    type="hidden"
                    defaultValue={selectedTreatment?.id}
                  />
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Tipo de Tratamiento
                    </FormLabel>
                    <Input
                      name="treatmentType"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={selectedTreatment?.treatmentType}
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                    />
                  </FormControl>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Título
                    </FormLabel>
                    <Input
                      name="title"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={selectedTreatment?.title}
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                    />
                  </FormControl>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Descripción
                    </FormLabel>
                    <Input
                      name="description"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={selectedTreatment?.description}
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                    />
                  </FormControl>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Citas estimadas
                    </FormLabel>
                    <Input
                      name="estimatedAppointments"
                      type="number"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={selectedTreatment?.estimatedAppointments}
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                    />
                  </FormControl>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Días entre tratamientos
                    </FormLabel>
                    <Input
                      name="daysBetweenAppointments"
                      type="number"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={selectedTreatment?.daysBetweenAppointments}
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                    />
                  </FormControl>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Costo Estimado
                    </FormLabel>
                    <Input
                      name="costEstimation"
                      type="number"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={selectedTreatment?.costEstimation}
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    w="full"
                    bg="orange.400"
                    color="white"
                    _hover={{ bg: "orange.500" }}
                    p={4}
                    borderRadius="lg"
                    isLoading={isLoading}
                  >
                    Editar el tipo de Tratamiento
                  </Button>
                </form>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </DefaultLayout>
  );
}
