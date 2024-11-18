import Breadcrumb from "@/app/dashboard/components/Common/Breadcrumb";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import BotonVolver from "@/app/dashboard/components/Common/BotonVolver";
import EditUserForm from "../editUserForm";
import { prisma } from "@/config/prisma";
export default async function page({ params }: { params: { id: string } }) {
  const user = await prisma.person.findFirst({
    where: {
      id: params.id,
    },
    include: {
      rol: true,
    },
  });
  const roles = await prisma.rol.findMany();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Editar Usuario" />
      <BotonVolver direccion="/dashboard/pages/usuarios" />
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
        {user && <EditUserForm user={user} roles={roles} />}
      </Box>
    </DefaultLayout>
  );
}
{
  /*
    <form action={updateUserDashboard} method="POST">
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
              <FormControl id="secondName" isRequired>
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
                  <option defaultValue="Masculino">Masculino</option>
                  <option defaultValue="Femenino">Femenino</option>
                  <option defaultValue="Otro">Otro</option>
                </Select>
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  type="number"
                  name="phone"
                  defaultValue={user.phone || ""}
                />
              </FormControl>
              <FormControl id="mobile" isRequired>
                <FormLabel>Celular</FormLabel>
                <Input
                  type="number"
                  name="mobile"
                  defaultValue={user.mobile || ""}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Correo</FormLabel>
                <Input type="text" name="email" defaultValue={user.email} />
              </FormControl>
              <FormControl id="birthDate" isRequired>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <Input
                  type="date"
                  name="birthDate"
                  defaultValue={user.birthDate.toISOString().split("T")[0]}
                />
              </FormControl>
              <FormControl id="direccion" isRequired>
                <FormLabel>Dirección</FormLabel>
                <Input name="addressLine" defaultValue={user.addressLine} />
              </FormControl>
              <FormControl id="ciudad" isRequired>
                <FormLabel>Ciudad</FormLabel>
                <Input name="addressCity" defaultValue={user.addressCity} />
              </FormControl>
              <FormControl id="estadoCivil" isRequired>
                <FormLabel>Estado Civil</FormLabel>
                <Select name="maritalStatus" defaultValue={user.maritalStatus}>
                  <option defaultValue="soltero">Soltero</option>
                  <option defaultValue="casado">Casado</option>
                </Select>
              </FormControl>
              <FormControl id="identification" isRequired>
                <FormLabel>Carnet De Identidad</FormLabel>
                <Input
                  type="number"
                  name="identification"
                  defaultValue={user.identification}
                />
              </FormControl>
              <FormControl id="rol" isRequired>
                <FormLabel>Rol</FormLabel>
                <Select placeholder="Selecciona un rol" name="rol">
                  {roles.map((rol, index) => (
                    <option
                      key={index}
                      value={rol.id}
                      selected={rol.id === user.rolID}
                    >
                      {rol.roleName}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Button colorScheme="orange" type="submit">
                Editar
              </Button>
            </Stack>
          </form> */
}
{
  /* {user.photoUrl ? (
                      <Image
                        src={user.photoUrl}
                        alt="Previsualizacion imagen"
                        width={250}
                        height={250}
                        className="mb-4 max-h-[250px]"
                      />
                    ) : (
                      <Image
                        src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                        alt="Imagen por defecto"
                        width={250}
                        height={250}
                        className="mb-4 max-h-[250px]"
                      />
                    )}
                    <Input
                      type="file"
                      name="photoUrl"
                      //onChange={handleImageChange}
                      accept="image/*"
                      className="pt-1"
                    />*/
}
