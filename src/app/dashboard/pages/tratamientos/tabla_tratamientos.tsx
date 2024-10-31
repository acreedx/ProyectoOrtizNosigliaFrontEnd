"use client";
import {
  noDataFoundComponent,
  paginationOptions,
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
  useDisclosure,
} from "@chakra-ui/react";
import { formatDate } from "@fullcalendar/core/index.js";
import { CarePlan } from "@prisma/client";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import RestoreIcon from "../../components/Icons/RestoreIcon";
import Swal from "sweetalert2";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { title } from "process";
import { carePlanStatus } from "@/enums/carePlanStatus";
import { MdBookOnline } from "react-icons/md";

export default function TablaTratamientos({
  carePlans,
}: {
  carePlans: CarePlan[];
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSecondModalOpen,
    onOpen: onOpenSecondModal,
    onClose: onCloseSecondModal,
  } = useDisclosure();
  const [selectedTreatment, setselectedTreatment] = useState<CarePlan>();
  const columns: TableColumn<CarePlan>[] = [
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
      selector: (row) => formatDate(row.startDate),
      sortable: true,
    },
    {
      name: "Paciente Asignado",
      selector: (row) => "Paciente Nuevo",
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
          <IconButton
            aria-label="Editar"
            icon={<EditIcon color={"blue"} />}
            onClick={() => {
              setselectedTreatment(row);
              onOpen();
            }}
          />
          <>
            {row.status === carePlanStatus.ENCURSO ? (
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
                    text: "Quiere Habilitar este Tratamiento ?",
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
  return (
    <>
      <DataTable
        columns={columns}
        data={carePlans}
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalHeader>
            <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
              Editar Tratamiento
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
                    <Select
                      name="paciente"
                      bg="transparent"
                      borderColor="gray.400"
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                    >
                      <option value={1} selected>
                        {"Tratamiento para corregir la alineación dental"}
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Paciente
                    </FormLabel>
                    <Select
                      name="paciente"
                      bg="transparent"
                      borderColor="gray.400"
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                    >
                      <option
                        defaultValue={selectedTreatment?.subjectId}
                        selected
                      >
                        {"Juan Mendoza Fernandez - 13679997"}
                      </option>
                    </Select>
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
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Fecha Inicio
                    </FormLabel>
                    <Input
                      name="fecha_inicio"
                      type="date"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={
                        selectedTreatment?.startDate.toISOString().split("T")[0]
                      }
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                      readOnly
                    />
                  </FormControl>
                  <FormControl mb={6} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Fecha Fin Estimada
                    </FormLabel>
                    <Input
                      name="fecha_fin"
                      type="date"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={
                        selectedTreatment?.endDate?.toISOString().split("T")[0]
                      }
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                      readOnly
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
                    Editar el Tratamiento
                  </Button>
                </form>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isSecondModalOpen} onClose={onCloseSecondModal} isCentered>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalHeader>
            <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
              Ver información del Tratamiento
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full">
              <Box>
                <form onSubmit={() => {}}>
                  <FormControl mb={4}>
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
                      readOnly
                    />
                  </FormControl>
                  <FormControl mb={4}>
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
                      readOnly
                    />
                  </FormControl>
                  <FormControl mb={4}>
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
                      readOnly
                    />
                  </FormControl>
                  <FormControl mb={4}>
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
                      readOnly
                    />
                  </FormControl>
                  <FormControl mb={4}>
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
                      readOnly
                    />
                  </FormControl>
                  <FormControl mb={4}>
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
                      readOnly
                    />
                  </FormControl>
                </form>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
