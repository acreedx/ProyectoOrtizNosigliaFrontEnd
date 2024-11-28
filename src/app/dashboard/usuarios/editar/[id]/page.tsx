"use client";
import Breadcrumb from "@/app/dashboard/components/Common/Breadcrumb";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import BotonVolver from "@/app/dashboard/components/Common/BotonVolver";
import EditUserForm from "../editUserForm";
import { prisma } from "@/config/prisma";
import { routes } from "@/config/routes";
import { Person, Rol } from "@prisma/client";
import { listarUsuario } from "@/controller/dashboard/usuarios/usuariosController";
import { listarRoles } from "@/controller/dashboard/roles/rolesController";
import { mostrarAlertaError } from "@/utils/show_error_alert";
export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<Person>();
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<Rol[]>([]);
  const fetchData = async () => {
    setUser(await listarUsuario(params.id));
    setRoles(await listarRoles());
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (e: any) {
      mostrarAlertaError(e);
    } finally {
      setLoading(false);
    }
  }, [params.id]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Editar Usuario" />
      <BotonVolver direccion={routes.usuarios} />
      {loading ? (
        <Spinner />
      ) : (
        <Box
          mx={12}
          my={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          p={5}
          bg="white"
        >
          <Heading as="h3" textAlign="center" my={10} color="orange">
            Editar Usuario
          </Heading>
          {user && (
            <EditUserForm user={user} roles={roles} reloadData={fetchData} />
          )}
        </Box>
      )}
    </DefaultLayout>
  );
}
