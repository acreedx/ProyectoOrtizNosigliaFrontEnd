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
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { updateUserDashboard } from "@/app/serveractions/updateUserDashboard";
import { Person, Rol } from "@prisma/client";
import { birthDateFormater } from "@/utils/birth_date_formater";

export default function EditUserForm({
  user,
  roles,
}: {
  user: Person;
  roles: Rol[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    const formData = new FormData(event.currentTarget);
    const response = await updateUserDashboard(formData);
    console.log(response);
    if (!response.success) {
      setErrors(response.errors);
    } else {
      Swal.fire({
        title: "Éxito",
        text: "Se ha actualizado la información del Usuario.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#28a745",
      }).then((result) => {
        router.push("/dashboard/pages/usuarios");
      });
    }
    setIsLoading(false);
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
        </FormControl>
        <FormControl id="secondName">
          <FormLabel>Segundo Nombre</FormLabel>
          <Input name="secondName" defaultValue={user.secondName || ""} />
        </FormControl>
        <FormControl id="familyName" isRequired>
          <FormLabel>Apellido</FormLabel>
          <Input name="familyName" defaultValue={user.familyName} />
        </FormControl>
        <FormControl id="gender" isRequired>
          <FormLabel>Género</FormLabel>
          <Select name="gender" defaultValue={user.gender}>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </Select>
        </FormControl>
        <FormControl id="phone">
          <FormLabel>Teléfono</FormLabel>
          <Input type="number" name="phone" defaultValue={user.phone || ""} />
        </FormControl>
        <FormControl id="mobile">
          <FormLabel>Celular</FormLabel>
          <Input type="number" name="mobile" defaultValue={user.mobile || ""} />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Correo</FormLabel>
          <Input type="email" name="email" defaultValue={user.email} />
        </FormControl>
        <FormControl id="birthDate" isRequired>
          <FormLabel>Fecha de Nacimiento</FormLabel>
          <Input
            type="date"
            name="birthDate"
            defaultValue={birthDateFormater(user.birthDate)}
          />
        </FormControl>
        <FormControl id="addressLine" isRequired>
          <FormLabel>Dirección</FormLabel>
          <Input name="addressLine" defaultValue={user.addressLine} />
        </FormControl>
        <FormControl id="addressCity" isRequired>
          <FormLabel>Ciudad</FormLabel>
          <Input name="addressCity" defaultValue={user.addressCity} />
        </FormControl>
        <FormControl id="maritalStatus" isRequired>
          <FormLabel>Estado Civil</FormLabel>
          <Select name="maritalStatus" defaultValue={user.maritalStatus}>
            <option value="Single">Soltero</option>
            <option value="Married">Casado</option>
          </Select>
        </FormControl>
        <FormControl id="identification" isRequired>
          <FormLabel>Carnet de Identidad</FormLabel>
          <Input
            type="number"
            name="identification"
            defaultValue={user.identification}
          />
        </FormControl>
        <FormControl id="rol" isRequired>
          <FormLabel>Rol</FormLabel>
          <Select name="rol" defaultValue={user.rolID}>
            {roles.map((rol: Rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.roleName}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button colorScheme="orange" type="submit" isLoading={isLoading}>
          {isLoading ? "Editando..." : "Editar"}
        </Button>
      </Stack>
    </form>
  );
}
