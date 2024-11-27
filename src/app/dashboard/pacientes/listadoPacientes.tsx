"use client";
import { FormEventHandler, useEffect, useState } from "react";
import {
  deshabilitarPaciente,
  habilitarPaciente,
  listarPacientes,
} from "@/controller/dashboard/pacientes/pacientesController";
import { Person } from "@prisma/client";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
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
  useDisclosure,
} from "@chakra-ui/react";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { userStatus } from "@/enums/userStatus";
import {
  noDataFoundComponent,
  paginationOptions,
} from "@/utils/pagination_options";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import {
  MdBookmarks,
  MdBookOnline,
  MdHistory,
  MdLibraryBooks,
  MdMenuBook,
} from "react-icons/md";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import RestoreIcon from "../components/Icons/RestoreIcon";
import VerPaciente from "./verPaciente";
import Swal from "sweetalert2";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { generarPDFHistorialCitasPaciente } from "./reportes/reporteHistorialCitas";

const ListadoPacientes = () => {
  const [patients, setpatients] = useState<Person[]>([]);
  const [loading, setloading] = useState<Boolean>(true);
  const [selectedPatient, setselectedPatient] = useState<Person>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  async function fetchData() {
    setpatients(await listarPacientes());
    setloading(false);
  }
  const handleUpdate = async (patient: Person) => {
    setselectedPatient(patient);
  };
  const handleRestore = async (e: number) => {};
  const handleDelete = async (e: number) => {};
  const handleShowInformation = async (patient: Person) => {
    setselectedPatient(patient);
  };
  const handleHistoryCreate = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      await generarPDFHistorialCitasPaciente(formData);
      onClose();
      mostrarAlertaExito("Informe generado con éxito");
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
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
      name: "Avatar",
      cell: (row) => <Avatar src={row.photoUrl} name={row.username} />,
      ignoreRowClick: true,
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
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex gap-4">
          <>
            {row.status === userStatus.ACTIVO && (
              <>
                {/* 
                <IconButton
                  aria-label="Editar"
                  title="Editar"
                  icon={<EditIcon color={"blue"} />}
                  onClick={() => {}}
                />*/}
                <IconButton
                  aria-label="Eliminar"
                  title="Eliminar"
                  icon={<DeleteIcon color="#dc3545" />}
                  onClick={() => {
                    Swal.fire({
                      title: "Confirmación",
                      text: "Esta seguro de deshabilitar este paciente ?",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonText: "Sí",
                      cancelButtonText: "No, cancelar",
                      confirmButtonColor: "#28a745",
                      cancelButtonColor: "#dc3545",
                    }).then(async (result) => {
                      try {
                        mostrarAlertaExito(
                          (await deshabilitarPaciente(row.id)).message,
                        );
                        await fetchData();
                      } catch (e: any) {
                        mostrarAlertaError(e);
                      }
                    });
                  }}
                />
                <IconButton
                  aria-label="Odontograma"
                  title="Odontograma"
                  icon={<MdBookOnline color={"green"} />}
                  onClick={() => {
                    router.push(routes.odontograma + "/" + row.id);
                  }}
                />
              </>
            )}
            {(row.status === userStatus.ELIMINADO ||
              row.status === userStatus.BLOQUEADO) && (
              <IconButton
                aria-label="Habilitar"
                title="Habilitar"
                icon={<RestoreIcon />}
                onClick={() => {
                  Swal.fire({
                    title: "Confirmación",
                    text: "¿Está seguro de habilitar este paciente?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Sí",
                    cancelButtonText: "No, cancelar",
                    confirmButtonColor: "#28a745",
                    cancelButtonColor: "#dc3545",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      try {
                        mostrarAlertaExito(
                          (await habilitarPaciente(row.id)).message,
                        );
                        await fetchData();
                      } catch (e: any) {
                        mostrarAlertaError(e);
                      }
                    }
                  });
                }}
              />
            )}
            <VerPaciente paciente={row} />
            <IconButton
              aria-label="Historial"
              title="Historial de citas"
              icon={<MdHistory color={"blue"} />}
              onClick={() => {
                setselectedPatient(row);
                onOpen();
              }}
            />
          </>
        </div>
      ),
      ignoreRowClick: true,
    },
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalHeader>
            <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
              Generar historial de paciente?
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full">
              <Box>
                <form onSubmit={handleHistoryCreate}>
                  <input
                    name="id"
                    type="hidden"
                    defaultValue={selectedPatient?.id}
                  />
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Nombre
                    </FormLabel>
                    <Input
                      name="name"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      readOnly
                      defaultValue={
                        selectedPatient
                          ? personFullNameFormater(selectedPatient)
                          : ""
                      }
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
                      CI
                    </FormLabel>
                    <Input
                      name="name"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      readOnly
                      defaultValue={selectedPatient?.identification}
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
                  <Flex gap={4}>
                    <Button
                      type="button"
                      w="full"
                      bg="red.400"
                      color="white"
                      _hover={{ bg: "red.500" }}
                      p={4}
                      borderRadius="lg"
                      onClick={onClose}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      w="full"
                      bg="orange.400"
                      color="white"
                      _hover={{ bg: "orange.500" }}
                      p={4}
                      borderRadius="lg"
                    >
                      Aceptar
                    </Button>
                  </Flex>
                </form>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ListadoPacientes;
