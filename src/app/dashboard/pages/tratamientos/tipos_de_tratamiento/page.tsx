"use client";
import Breadcrumb from "@/app/dashboard/components/Breadcrumbs/Breadcrumb";
import RestoreIcon from "@/app/dashboard/components/Icons/RestoreIcon";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import {
  paginationOptions,
  noDataFoundComponent,
} from "@/utils/pagination_options";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
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
  useDisclosure,
} from "@chakra-ui/react";
import { CarePlan, Treatments } from "@prisma/client";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Swal from "sweetalert2";
import BotonCreacion from "../boton_creacion";
import CreacionTipoTratamiento from "./creacionTipoTratamiento";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedTreatment, setselectedTreatment] = useState<Treatments>();
  const [tratamientos, settratamientos] = useState<Treatments[]>([]);
  useEffect(() => {
    settratamientos([
      {
        treatmentType: "Ortodoncia",
        title: "Tratamiento de ortodoncia básico",
        description: "Tratamiento para corregir la alineación dental.",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-12-31"),
        estimatedAppointments: 10,
        active: false,
        daysBetweenAppointments: 30,
        totalAppointments: 10,
        costEstimation: 1200.0,
      } as Treatments,
      {
        treatmentType: "Blanqueamiento",
        title: "Blanqueamiento dental avanzado",
        description: "Tratamiento para mejorar la apariencia de los dientes.",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-02-15"),
        estimatedAppointments: 2,
        daysBetweenAppointments: 7,
        totalAppointments: 2,
        active: true,
        costEstimation: 300.0,
      } as Treatments,
      {
        treatmentType: "Implantes",
        title: "Implante dental",
        description: "Colocación de un implante dental.",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-06-01"),
        estimatedAppointments: 5,
        daysBetweenAppointments: 30,
        totalAppointments: 5,
        active: false,
        costEstimation: 2000.0,
      } as Treatments,
    ]);
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
                }).then((result) => {
                  if (result.isConfirmed) {
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
                }).then((result) => {
                  if (result.isConfirmed) {
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
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tipos de Tratamiento" />
      <Box className="w-full rounded-sm border border-stroke bg-white py-6 shadow-default">
        <CreacionTipoTratamiento />
        <Heading as="h4" size="md" className="mb-6 px-7.5 text-black">
          Tabla de Tipos de tratamiento
        </Heading>
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
      </Box>
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
                <form onSubmit={() => {}}>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Tipo de Tratamiento
                    </FormLabel>
                    <Input
                      name="name"
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
                      name="name"
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
                      name="name"
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
                      name="name"
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
                      name="name"
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
                      name="costo_estimado"
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
