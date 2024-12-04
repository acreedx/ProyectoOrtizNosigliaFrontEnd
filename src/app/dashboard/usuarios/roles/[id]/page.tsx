"use client";

import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import BotonVolver from "@/app/dashboard/components/Common/BotonVolver";
import Breadcrumb from "@/app/dashboard/components/Common/Breadcrumb";
import {
  editarRol,
  listarPermisos,
  listarRol,
} from "@/controller/dashboard/roles/rolesController";
import { Rol } from "@prisma/client";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { routes } from "@/config/routes";
import { mostrarAlertaConfirmacion } from "@/utils/show_question_alert";
import { useRouter } from "next/navigation";

export default function EditarRolPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [rol, setrol] = useState<Rol>();
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const fetchData = async () => {
    try {
      setLoading(true);
      const permisos = await listarPermisos();
      setrol(await listarRol(params.id));
      setPermissions(permisos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching role data:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      setisLoading(true);
      const isConfirmed = await mostrarAlertaConfirmacion(
        "Confirmación",
        "Confirma los datos modificados del rol?",
      );
      if (isConfirmed) {
        const response = await editarRol(rol!.id, formData);
        mostrarAlertaExito(response.message);
        router.push(routes.roles);
      }
    } catch (error: any) {
      console.error(error);
      mostrarAlertaError(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Editar Rol" />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="100%"
        >
          <Spinner size="xl" />
        </Box>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <BotonVolver direccion={routes.roles} />
      <Breadcrumb pageName="Editar Rol" />
      <Box
        maxW="600px"
        mx="auto"
        p={6}
        bg="gray.50"
        borderRadius="md"
        boxShadow="md"
      >
        <Heading size="lg" mb={6}>
          Editar Rol
        </Heading>
        <form onSubmit={handleSubmit}>
          <Input type="hidden" name="id" defaultValue={rol?.id} />
          <FormControl id="roleName" mb={4}>
            <FormLabel>Nombre del rol</FormLabel>
            <Input
              type="text"
              name="roleName"
              required
              defaultValue={rol?.roleName}
            />
          </FormControl>
          <FormControl id="description" mb={4}>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              name="description"
              required
              defaultValue={rol?.description}
            />
          </FormControl>
          <FormControl id="permissions" mb={4}>
            <FormLabel>Permisos</FormLabel>
            <CheckboxGroup defaultValue={rol?.permissionIDs}>
              <Stack spacing={2}>
                {permissions.map((permission) => (
                  <Checkbox
                    key={permission.id}
                    value={permission.id}
                    name="permissions"
                    defaultChecked={rol?.permissionIDs?.includes(permission.id)}
                  >
                    {permission.code + " - " + permission.permissionName}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </FormControl>
          <Button colorScheme="blue" type="submit" isLoading={isLoading}>
            Guardar Cambios
          </Button>
        </form>
      </Box>
    </DefaultLayout>
  );
}
