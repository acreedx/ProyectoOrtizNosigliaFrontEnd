"use client";
import {
  noDataFoundComponent,
  paginationOptions,
} from "@/utils/pagination_options";
import {
  EditIcon,
  DeleteIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { CarePlan, ImagingStudy, Person } from "@prisma/client";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Swal from "sweetalert2";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { carePlanStatus } from "@/enums/carePlanStatus";
import { MdBookOnline, MdLibraryBooks } from "react-icons/md";
import {
  completarTratamiento,
  deshabilitarTratamiento,
  habilitarTratamiento,
} from "@/controller/dashboard/tratamientos/cambiarEstadoTratamiento";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import { listarPacientes } from "@/controller/dashboard/pacientes/pacientesController";
import { editarTratamiento } from "@/controller/dashboard/tratamientos/editarTratamiento";
import { listarRadiografias } from "@/controller/dashboard/tratamientos/listarRadiografias";
import { subirFotoDePerfil } from "@/utils/upload_image";
import { agregarRadiografias } from "@/controller/dashboard/tratamientos/agregarRadiografias";
import RestoreIcon from "../components/Icons/RestoreIcon";

export default function TablaTratamientos({
  carePlans,
  reloadData,
}: {
  carePlans: (CarePlan & { subject: Person })[];
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
  const [pacientes, setpacientes] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setpacientes(await listarPacientes());
  };
  const handleSubmitEditar = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const tratamiento: CarePlan = {
      treatmentType: formData.get("treatmentType") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      startDate: new Date(formData.get("fecha_inicio") as string),
      estimatedAppointments: Number(formData.get("estimatedAppointments")),
      daysBetweenAppointments: Number(formData.get("daysBetweenAppointments")),
      costEstimation: Number(formData.get("costEstimation")),
      subjectId: formData.get("paciente") as string,
    } as CarePlan;
    try {
      const response = await editarTratamiento(
        formData.get("id") as string,
        tratamiento,
      );
      onClose();
      mostrarAlertaExito(response.message);
      reloadData();
    } catch (error: any) {
      onClose();
      mostrarAlertaError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const columns: TableColumn<CarePlan & { subject: Person }>[] = [
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
                  icon={<MdLibraryBooks color="purple" />}
                  onClick={async () => {
                    setselectedTreatment(row);
                    setFields(await listarRadiografias(row.id));
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
                  console.log(row);
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
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ImagingStudy,
  ) => {
    const filesList = e.target.files;
    if (filesList) {
      const newFiles = Array.from(filesList);

      setFiles((prevFiles) => {
        const updatedFiles = { ...prevFiles };
        updatedFiles[field.id] = newFiles;
        return updatedFiles;
      });

      setFields((prevFields: any) => {
        return prevFields.map((item: any) => {
          if (item.id === field.id) {
            return { ...item, media: newFiles };
          }
          return item;
        });
      });
    }
  };

  const handleAddField = () => {
    const newField: ImagingStudy = {
      id: `xray${fields.length + 1}`,
      media: [] as string[],
      active: true,
    } as ImagingStudy;

    setFields((prevFields) => [...prevFields, newField]);
  };
  const handleSubmitRadiografias = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    fields.forEach((field) => {
      const fileInput = document.querySelector(
        `input[name="file_${field.id}"]`,
      ) as HTMLInputElement;
      if (fileInput && fileInput.files) {
        Array.from(fileInput.files).forEach((file) => {
          formData.append("files", file);
        });
      }
    });
    fields.forEach((field) => {
      const imagingStudy = {
        active: true,
        personId: selectedTreatment?.subjectId,
        carePlanId: selectedTreatment?.id,
      };
      formData.append("imagingStudies", JSON.stringify(imagingStudy));
    });
    try {
      console.log(formData);
      const response = await fetch("/api/tratamientos/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        onCloseThirdModal();
        mostrarAlertaExito(result.message);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error al enviar radiografías:", error);
    }
  };

  const [fields, setFields] = useState<ImagingStudy[]>([]);
  const [registeredFields, setregisteredFields] = useState<ImagingStudy[]>([]);
  const [files, setFiles] = useState<{ [key: string]: File[] }>({});
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
                <form onSubmit={handleSubmitEditar}>
                  <input
                    type="hidden"
                    name="id"
                    defaultValue={selectedTreatment?.id}
                  />
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Tipo de tratamiento
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
                      Paciente
                    </FormLabel>
                    <Select
                      name="paciente"
                      bg="transparent"
                      placeholder="Seleccione un Paciente"
                      borderColor="gray.400"
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                      defaultValue={selectedTreatment?.subjectId}
                    >
                      {pacientes.map((paciente, index) => {
                        return (
                          <option key={index} value={paciente.id}>
                            {personFullNameFormater(paciente) +
                              " - " +
                              paciente.identification}
                          </option>
                        );
                      })}
                    </Select>
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
                        new Date(
                          new Date().setDate(
                            new Date().getDate() +
                              (selectedTreatment?.estimatedAppointments || 0) *
                                (selectedTreatment?.daysBetweenAppointments ||
                                  0),
                          ),
                        )
                          .toISOString()
                          .split("T")[0]
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
                      readOnly
                    />
                  </FormControl>
                  <FormControl mb={4}>
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
                      Citas totales
                    </FormLabel>
                    <Input
                      name="name"
                      type="number"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={selectedTreatment?.totalAppointments || 0}
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
                      Fecha Inicio
                    </FormLabel>
                    <Input
                      name="name"
                      type="date"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={
                        selectedTreatment?.startDate
                          ?.toISOString()
                          .split("T")[0]
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
                  <FormControl mb={4}>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Fecha de Fin
                    </FormLabel>
                    <Input
                      name="name"
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
                  <FormControl mb={4}>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Costo Total
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
      <Modal isOpen={isThirdModalOpen} onClose={onCloseThirdModal} isCentered>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalHeader>
            <Heading fontSize="2xl" color="black">
              Subir Radiografías
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full">
              <form
                onSubmit={handleSubmitRadiografias}
                encType="multipart/form-data"
              >
                {fields.length === 0 ? (
                  <>No se encontraron estudios radiográficos</>
                ) : (
                  fields.map((field, idx) => (
                    <FormControl mb={4} key={field.id}>
                      {field.media.length > 0 && (
                        <Box mb={2}>
                          <Menu>
                            <MenuButton
                              as={Button}
                              rightIcon={<ChevronDownIcon />}
                              variant="outline"
                              colorScheme="teal"
                              size="sm"
                              width="auto"
                            >
                              Ver Archivos
                            </MenuButton>
                            <MenuList>
                              {field.media.map((value, fileIndex) => (
                                <MenuItem key={fileIndex}>
                                  <Button
                                    variant="link"
                                    colorScheme="teal"
                                    as="a"
                                    href={value.toString()}
                                    fontSize="sm"
                                    display="inline-flex"
                                    alignItems="center"
                                    gap={2}
                                    _hover={{
                                      textDecoration: "underline",
                                      color: "orange.500",
                                    }}
                                  >
                                    Archivo {fileIndex + 1}
                                  </Button>
                                </MenuItem>
                              ))}
                            </MenuList>
                          </Menu>
                        </Box>
                      )}
                      <FormLabel color="black">{`Estudio Radiográfico ${idx + 1}`}</FormLabel>
                      <Input
                        type="file"
                        name={`file_${field.id}`}
                        accept="image/*,application/pdf"
                        multiple
                        bg="transparent"
                        borderColor="gray.400"
                        _hover={{ borderColor: "orange.500" }}
                        _focus={{ borderColor: "orange.500" }}
                        required
                      />
                      {files[field.id]?.length > 0 && (
                        <Box mt={2}>
                          <strong>Archivos seleccionados:</strong>
                          <ul>
                            {files[field.id].map((file, fileIndex) => (
                              <li key={fileIndex}>{file.name}</li>
                            ))}
                          </ul>
                        </Box>
                      )}
                    </FormControl>
                  ))
                )}
                <Button mt={4} colorScheme="teal" onClick={handleAddField}>
                  Agregar Radiografía
                </Button>
                <Button mt={4} colorScheme="orange" type="submit" w="full">
                  Guardar Radiografías
                </Button>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
