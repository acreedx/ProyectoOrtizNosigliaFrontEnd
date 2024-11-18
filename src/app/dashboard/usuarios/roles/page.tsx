"use client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Tag,
  Button,
  HStack,
  Stack,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import BotonHabilitar from "./botonHabilitar";
import { prisma } from "@/config/prisma";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Common/Breadcrumb";
import DataTable, { TableColumn } from "react-data-table-component";
import { columns } from "tailwindcss/defaultTheme";
import { listarRoles } from "@/controller/dashboard/roles/rolesController";
import { useState, useEffect } from "react";
import { Rol } from "@prisma/client";
import { routes } from "@/config/routes";

export default function Roles() {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const rolesData = await listarRoles();
      setRoles(rolesData);
    } catch (error: any) {
      console.error("Error al cargar roles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const columns: TableColumn<Rol>[] = [
    {
      name: "Nro",
      cell: (_, index) => index + 1,
      sortable: false,
      width: "100px",
    },
    {
      name: "Nombre del rol",
      selector: (row) => row.roleName,
      sortable: true,
    },
    {
      name: "Permisos asignados",
      selector: (row) => row.permissionIDs.length.toString(),
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => (
        <Tag colorScheme={row.active ? "green" : "red"}>
          {row.active ? "Activo" : "Deshabilitado"}
        </Tag>
      ),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <HStack spacing={4}>
          <BotonHabilitar
            rolId={row.id}
            active={row.active}
            reloadData={fetchData}
          />
          <Button colorScheme="blue" as="a" href={`${routes.roles}/${row.id}`}>
            Editar
          </Button>
        </HStack>
      ),
    },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Roles y Permisos" />
      <Box className="w-full rounded-sm border border-stroke bg-white py-6 shadow-default">
        <Heading as="h4" size="md" className="mb-6 px-7.5 text-black">
          Tabla de Roles
        </Heading>
        {loading ? (
          <Spinner />
        ) : (
          <DataTable
            columns={columns}
            data={roles}
            pagination
            highlightOnHover
            responsive
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 15, 20]}
            noDataComponent="No se encontraron roles."
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
        )}
      </Box>
    </DefaultLayout>
  );
}
