"use client";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  TableCaption,
  Link,
  Badge,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { Person, PrismaClient } from "@prisma/client";
import BotonHabilitar from "./components/botonHabilitar";
import BotonEditar from "./components/botonEditar";
import { birthDateFormater } from "@/utils/birth_date_formater";
import { userStatus } from "@/enums/userStatus";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Breadcrumb from "../components/Common/Breadcrumb";
import { prisma } from "@/config/prisma";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { routes } from "@/config/routes";
import { listarUsuarios } from "@/controller/dashboard/dashboard/listarUsuarios";
import {
  habilitarUsuario,
  deshabilitarUsuario,
} from "@/controller/dashboard/usuarios/usuariosController";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Swal from "sweetalert2";
import RestoreIcon from "../components/Icons/RestoreIcon";
import {
  paginationOptions,
  noDataFoundComponent,
} from "@/utils/pagination_options";
import { mostrarAlertaConfirmacion } from "@/utils/show_question_alert";
import { useRouter } from "next/navigation";
export default function Usuarios() {
  const [users, setUsers] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  async function fetchData() {
    try {
      const usuarios = await listarUsuarios();
      setUsers(usuarios);
    } catch (error: any) {
      mostrarAlertaError(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleEnable = async (userId: string) => {
    try {
      const response = await habilitarUsuario(userId);
      mostrarAlertaExito(response.message);
      fetchData();
    } catch (error: any) {
      mostrarAlertaError(error);
    }
  };

  const handleDisable = async (userId: string) => {
    try {
      const response = await deshabilitarUsuario(userId);
      mostrarAlertaExito(response.message);
      fetchData();
    } catch (error: any) {
      mostrarAlertaError(error);
    }
  };

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
      name: "Nombre Completo",
      selector: (row: any) => personFullNameFormater(row),
      sortable: true,
    },
    {
      name: "Género",
      selector: (row: any) => row.gender,
      sortable: true,
    },
    {
      name: "Fecha de Nacimiento",
      selector: (row: any) => birthDateFormater(row.birthDate),
      sortable: true,
    },
    {
      name: "Estado Civil",
      selector: (row: any) => row.maritalStatus,
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row: any) => (
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
          {row.status === userStatus.ELIMINADO ? "Deshabilitado" : row.status}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row: any) => (
        <div className="flex gap-4">
          <IconButton
            aria-label="Editar"
            icon={<EditIcon color="blue" />}
            onClick={() => {
              router.push(`${routes.usuarios}/editar/${row.id}`);
            }}
          />
          {row.status === userStatus.ACTIVO && (
            <IconButton
              aria-label="Deshabilitar"
              icon={<DeleteIcon color="red" />}
              onClick={async () => {
                const isConfirmed = await mostrarAlertaConfirmacion(
                  "Confirmación",
                  "¿Está seguro de deshabilitar este usuario?",
                );
                if (isConfirmed) {
                  await handleDisable(row.id);
                }
              }}
            />
          )}
          {row.status === userStatus.NUEVO && (
            <IconButton
              aria-label="Deshabilitar"
              icon={<DeleteIcon color="red" />}
              onClick={async () => {
                const isConfirmed = await mostrarAlertaConfirmacion(
                  "Confirmación",
                  "¿Está seguro de deshabilitar este usuario?",
                );
                if (isConfirmed) {
                  await handleDisable(row.id);
                }
              }}
            />
          )}
          {(row.status === userStatus.ELIMINADO ||
            row.status === userStatus.BLOQUEADO) && (
            <IconButton
              aria-label="Habilitar"
              icon={<RestoreIcon />}
              onClick={async () => {
                const isConfirmed = await mostrarAlertaConfirmacion(
                  "Confirmación",
                  "¿Está seguro de habilitar este usuario?",
                );
                if (isConfirmed) {
                  await handleEnable(row.id);
                }
              }}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Usuarios" />
      <Button
        as="a"
        href={routes.usuarios + "/crear"}
        colorScheme="teal"
        mb={4}
      >
        Crear Usuario
      </Button>
      <DataTable
        columns={columns}
        data={users}
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
    </DefaultLayout>
  );
}
