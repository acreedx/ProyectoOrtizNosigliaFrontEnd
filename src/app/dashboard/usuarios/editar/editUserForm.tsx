"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { Person, Rol } from "@prisma/client";
import { birthDateFormater } from "@/utils/birth_date_formater";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { editarUsuario } from "@/controller/dashboard/usuarios/usuariosController";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import { routes } from "@/config/routes";
import Swal from "sweetalert2";

export default function EditUserForm({
  user,
  roles,
  reloadData,
}: {
  user: Person;
  roles: Rol[];
  reloadData: Function;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      setErrors({});
      const formData = new FormData(event.currentTarget);
      const response = await editarUsuario(user.id, formData);
      if (response.success) {
        reloadData();
        Swal.fire({
          title: "Éxito",
          text: response.message,
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#28a745",
        }).then(() => {
          router.push(routes.usuarios);
        });
      } else {
        if (response.errors) {
          setErrors(response.errors);
        } else {
          mostrarAlertaError("Error al editar el usuario");
        }
      }
    } catch (e: any) {
      mostrarAlertaError(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <Input type="hidden" name="userId" defaultValue={user.id} />
      <Stack spacing={4}>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={5}
          mb={5}
          className="w-full justify-center"
        >
          <FormControl w={"400px"}>
            <Flex direction="column" align="center">
              <FormLabel>Imagen</FormLabel>
              <Image
                src={user.photoUrl}
                alt="Previsualizacion imagen"
                width={250}
                height={250}
                className="mb-4 max-h-[250px]"
              />
            </Flex>
          </FormControl>
        </Flex>
        <FormControl id="firstName" isRequired>
          <FormLabel>Primer Nombre</FormLabel>
          <Input name="firstName" defaultValue={user.firstName} />
          {errors.firstName && (
            <Text color="red.500">{errors.firstName._errors.join(", ")}</Text>
          )}
        </FormControl>
        <FormControl id="secondName" isRequired>
          <FormLabel>Segundo Nombre</FormLabel>
          <Input name="secondName" defaultValue={user.secondName || ""} />
          {errors.secondName && (
            <Text color="red.500">{errors.secondName._errors.join(", ")}</Text>
          )}
        </FormControl>
        <FormControl id="familyName" isRequired>
          <FormLabel>Apellido</FormLabel>
          <Input name="familyName" defaultValue={user.familyName} />
          {errors.familyName && (
            <Text color="red.500">{errors.familyName._errors.join(", ")}</Text>
          )}
        </FormControl>
        <FormControl id="gender" isRequired>
          <FormLabel>Género</FormLabel>
          <Select name="gender" defaultValue={user.gender}>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </Select>
          {errors.gender && (
            <Text color="red.500">{errors.gender._errors.join(", ")}</Text>
          )}
        </FormControl>
        <FormControl id="phone">
          <FormLabel>Teléfono</FormLabel>
          <Input type="number" name="phone" defaultValue={user.phone || ""} />
          {errors.phone && (
            <Text color="red.500">{errors.phone._errors.join(", ")}</Text>
          )}
        </FormControl>
        <FormControl id="mobile">
          <FormLabel>Celular</FormLabel>
          <Input type="number" name="mobile" defaultValue={user.mobile || ""} />
          {errors.mobile && (
            <Text color="red.500">{errors.mobile._errors.join(", ")}</Text>
          )}
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Correo</FormLabel>
          <Input type="email" name="email" defaultValue={user.email} />
          {errors.email && (
            <Text color="red.500">{errors.email._errors.join(", ")}</Text>
          )}
        </FormControl>
        <FormControl id="birthDate" isRequired>
          <FormLabel>Fecha de Nacimiento</FormLabel>
          <Input
            type="date"
            name="birthDate"
            defaultValue={birthDateFormater(user.birthDate)}
          />
          {errors.birthDate && (
            <Text color="red.500">{errors.birthDate._errors.join(", ")}</Text>
          )}
        </FormControl>
        <FormControl id="addressLine" isRequired>
          <FormLabel>Dirección</FormLabel>
          <Input name="addressLine" defaultValue={user.addressLine} />
          {errors.addressLine && (
            <Text color="red.500">{errors.addressLine._errors.join(", ")}</Text>
          )}
        </FormControl>
        <FormControl id="addressCity" isRequired>
          <FormLabel>Ciudad</FormLabel>
          <Input name="addressCity" defaultValue={user.addressCity} />
          {errors.addressCity && (
            <Text color="red.500">{errors.addressCity._errors.join(", ")}</Text>
          )}
        </FormControl>
        <FormControl id="maritalStatus" isRequired>
          <FormLabel>Estado Civil</FormLabel>
          <Select name="maritalStatus" defaultValue={user.maritalStatus}>
            <option value="soltero">Soltero</option>
            <option value="casado">Casado</option>
          </Select>
          {errors.maritalStatus && (
            <Text color="red.500">
              {errors.maritalStatus._errors.join(", ")}
            </Text>
          )}
        </FormControl>
        <FormControl id="identification" isRequired>
          <FormLabel>Carnet de Identidad</FormLabel>
          <Input
            type="number"
            name="identification"
            defaultValue={user.identification}
          />
          {errors.identification && (
            <Text color="red.500">
              {errors.identification._errors.join(", ")}
            </Text>
          )}
        </FormControl>
        <FormControl id="rol" isRequired>
          <FormLabel>Rol</FormLabel>
          <Select name="rol" defaultValue={user.rolId}>
            {roles.map((rol: Rol) => (
              <option
                key={rol.id}
                value={rol.id}
                selected={user.rolId === rol.id}
              >
                {rol.roleName}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button colorScheme="orange" type="submit" isLoading={isLoading}>
          Editar
        </Button>
      </Stack>
    </form>
  );
}
