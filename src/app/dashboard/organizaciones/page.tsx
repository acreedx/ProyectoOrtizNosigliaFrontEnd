"use client";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import React, { FormEventHandler, useEffect, useState } from "react";
import Breadcrumb from "@/app/dashboard/components/Common/Breadcrumb";
import DataTable, { TableColumn } from "react-data-table-component";
import { Organization } from "@prisma/client";
import { mostrarAlertaError } from "@/utils/show_error_alert";
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
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import {
  noDataFoundComponent,
  paginationOptions,
} from "@/utils/pagination_options";
import { EditIcon } from "@chakra-ui/icons";
import DeleteIcon from "@/app/dashboard/components/Icons/DeleteIcon";
import RestoreIcon from "@/app/dashboard/components/Icons/RestoreIcon";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import {
  editarOrganizacion,
  eliminarOrganizacion,
  listarOrganizaciones,
  rehabilitarOrganizacion,
} from "@/controller/dashboard/organizaciones/organizacionesController";
import Swal from "sweetalert2";
import { mostrarAlertaConfirmacion } from "@/utils/show_question_alert";
import CrearOrganizacion from "./crearOrganizacion";
export default function Page() {
  const [loading, setloading] = useState(true);
  const [organizations, setorganizations] = useState<Organization[]>([]);
  const [organization, setorganization] = useState<Organization>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchData = async () => {
    try {
      setorganizations(await listarOrganizaciones());
      setloading(false);
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns: TableColumn<Organization>[] = [
    {
      name: "Nombre",
      cell: (row) => row.name,
      ignoreRowClick: true,
      sortable: true,
    },
    {
      name: "Direccion",
      selector: (row) => row.address,
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
            onClick={() => handleClickEdit(row)}
          />
          {row.active ? (
            <IconButton
              aria-label="Eliminar"
              icon={<DeleteIcon />}
              onClick={() => handleDelete(row)}
            />
          ) : (
            <IconButton
              aria-label="Habilitar"
              icon={<RestoreIcon />}
              onClick={() => handleRestore(row)}
            />
          )}
        </div>
      ),
      ignoreRowClick: true,
    },
  ];
  const handleClickEdit = (organization: Organization) => {
    try {
      setorganization(organization);
      onOpen();
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const values = Object.fromEntries(formData.entries());
      const organization: Organization = {
        name: values.name as string,
        address: values.direccion as string,
      } as Organization;
      onClose();
      const res = await editarOrganizacion(values.id as string, organization);
      if (res.message) {
        fetchData();
        mostrarAlertaExito(res.message);
      }
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  const handleDelete = async (organization: Organization) => {
    try {
      const resultado = await mostrarAlertaConfirmacion(
        "Advertencia",
        "Estas seguro de inhabilitar esta organización?",
      );
      if (resultado) {
        const res = await eliminarOrganizacion(organization.id);
        if (res.message) {
          mostrarAlertaExito(res.message);
          await fetchData();
        }
      }
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  const handleRestore = async (organization: Organization) => {
    try {
      const resultado = await mostrarAlertaConfirmacion(
        "Advertencia",
        "Estas seguro de rehabilitar esta organización?",
      );
      if (resultado) {
        const res = await rehabilitarOrganizacion(organization.id);
        if (res.message) {
          mostrarAlertaExito(res.message);
          await fetchData();
        }
      }
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gestión de Organizacionces" />
      {loading ? (
        <Spinner />
      ) : (
        <Box className="w-full rounded-sm border border-stroke bg-white py-6 shadow-default">
          <Heading as="h4" size="md" className="mb-6 px-7.5 text-black">
            Listado de Organizaciones
          </Heading>
          <div className="flex">
            <CrearOrganizacion refreshData={fetchData} />
          </div>
          <DataTable
            columns={columns}
            data={organizations}
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalHeader>
            <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
              Editar la organización
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full">
              <Box>
                <form onSubmit={handleSubmitEdit}>
                  <input
                    type="hidden"
                    defaultValue={organization?.id}
                    name="id"
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
                      defaultValue={organization?.name}
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
                  <FormControl mb={6} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Dirección
                    </FormLabel>
                    <Input
                      name="direccion"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={organization?.address}
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
                    Editar Organización
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
