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
} from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { updateRol } from "@/controller/roleActions";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import BotonVolver from "@/app/dashboard/components/Common/BotonVolver";
import Breadcrumb from "@/app/dashboard/components/Common/Breadcrumb";
import { prisma } from "@/config/prisma";
export default async function Page({ params }: { params: { id: string } }) {
  const rol = await prisma.rol.findFirst({
    where: {
      id: params.id,
    },
    include: {
      permissions: true,
    },
  });
  const permisos = await prisma.permission.findMany({});
  return (
    <DefaultLayout>
      <BotonVolver direccion="/dashboard/pages/roles" />
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
        <form action={updateRol}>
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
            <CheckboxGroup>
              <Stack spacing={2}>
                {permisos.map((permission, index) => (
                  <Checkbox
                    key={index}
                    name="permissions"
                    defaultChecked={rol?.permissions?.some(
                      (e) => e.permissionName === permission.permissionName,
                    )}
                  >
                    {permission.code + " - " + permission.permissionName}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Guardar Cambios
          </Button>
        </form>
      </Box>
    </DefaultLayout>
  );
}
