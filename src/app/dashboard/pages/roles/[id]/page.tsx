"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import Role from "@/interfaces/Rol";
import { RolService } from "@/repositories/RolService";
import Permission from "@/interfaces/Permission";
import { PermissionService } from "@/repositories/PermissionService";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import BotonVolver from "../../../components/BotonVolver";
export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const [rol, setRol] = useState<Partial<Role>>({});
  const [permissions, setpermissions] = useState<Permission[]>([]);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setRol({ ...rol, [name]: value });
  };
  const handlePermissionsChange = (selectedPermissions: string[]) => {
    setRol({
      ...rol,
      permissions: selectedPermissions.map((id) => ({ _id: id })),
    });
  };
  useEffect(() => {
    const getData = async () => {
      const fetchRol: Role = await RolService.getRolesById(params.id);
      const fetchPermisos: Permission[] =
        await PermissionService.getActivePermissions();
      setRol(fetchRol);
      setpermissions(fetchPermisos);
      setloading(false);
      console.log(fetchRol);
    };
    getData();
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await RolService.updateRol(rol as Role);
      if (data) {
        Swal.fire({
          title: "Éxito",
          text: "Rol editado correctamente",
          icon: "success",
          confirmButtonText: "Volver al listado",
          confirmButtonColor: "#28a745",
        }).then((result) => {
          router.push("/dashboard/roles");
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <DefaultLayout>
      <BotonVolver direccion="/dashboard/roles" />
      <Breadcrumb pageName="Editar Rol" />
      {loading ? (
        <Spinner />
      ) : (
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
            {/* Campo para el nombre del rol */}
            <FormControl id="roleName" mb={4}>
              <FormLabel>Nombre del rol</FormLabel>
              <Input
                type="text"
                name="roleName"
                value={rol.roleName}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            {/* Campo para la descripción del rol */}
            {/* 
              <FormControl id="description" mb={4}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  name="description"
                  value={rol.description}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
            */}
            {/* Lista de permisos con checkboxes */}
            <FormControl id="permissions" mb={4}>
              <FormLabel>Permisos</FormLabel>
              <CheckboxGroup
                value={rol!.permissions!.map((e: Permission) => e._id) || []}
                onChange={handlePermissionsChange}
              >
                <Stack spacing={2}>
                  {permissions.map((permission, index) => (
                    <Checkbox key={index} value={permission._id}>
                      {permission.code + " - " + permission.permissionName}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </FormControl>

            {/* Botón para guardar */}
            <Button colorScheme="blue" type="submit">
              Guardar Cambios
            </Button>
          </form>
        </Box>
      )}
    </DefaultLayout>
  );
}
