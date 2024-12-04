"use client";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/app/dashboard/components/Common/Breadcrumb";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Spinner,
  HStack,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import BotonVolver from "../../components/Common/BotonVolver";
import { routes } from "@/config/routes";
import { Allergy, Contact, Patient } from "@prisma/client";
import {
  editarPaciente,
  listarPaciente,
} from "@/controller/dashboard/pacientes/pacientesController";
import { mostrarAlertaConfirmacion } from "@/utils/show_question_alert";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import SeccionFoto from "./seccion_foto";
import SeccionAlergias from "./seccion_alergias";
import SeccionContactos from "./seccion_contactos";
import { mostrarAlertaError } from "@/utils/show_error_alert";
export default function Pacientes({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const [isLoading, setisloading] = useState(false);
  const [person, setperson] = useState<
    Patient & { allergies: Allergy[] } & { contacts: Contact[] }
  >({} as Patient & { allergies: Allergy[] } & { contacts: Contact[] });
  const [errors, setErrors] = useState<any>({});

  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const paciente = await listarPaciente(params.id);
        setperson(paciente);
        setContacts(paciente.contacts);
        setAllergies(paciente.allergies);
      } catch (e: any) {
        mostrarAlertaError(e);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, [params.id]);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setisloading(true);
      setErrors({});
      const formData = new FormData(event.currentTarget);
      const isConfirmed = await mostrarAlertaConfirmacion(
        "Confirmación",
        "Esta seguro de editar la información de este paciente",
      );
      if (isConfirmed) {
        const response = await editarPaciente(params.id, formData);
        if (response.message) {
          mostrarAlertaExito("Éxito al editar al paciente");
          router.push(routes.pacientes);
        } else {
          if (response.errors) {
            setErrors(response.errors);
          }
        }
      }
    } catch (e: any) {
      mostrarAlertaError(e);
    } finally {
      setisloading(false);
    }
  };
  return (
    <DefaultLayout>
      <BotonVolver direccion={routes.pacientes} />
      <Breadcrumb pageName="Editar paciente" />
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Box
          mx={{ base: 8, sm: 16, md: 40, lg: 60 }}
          my={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          p={{ base: 3, md: 5 }}
          bg="white"
        >
          <Heading as="h3" textAlign="center" my={10} color="orange">
            Editar Paciente
          </Heading>
          <form onSubmit={handleFormSubmit}>
            <input type="hidden" defaultValue={person.id} />
            <Stack spacing={4}>
              <SeccionFoto paciente={person} />
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Primer Nombre</FormLabel>
                  <Input name="firstName" defaultValue={person.firstName} />
                  {errors.firstName && (
                    <Text color="red.500">
                      {errors.firstName._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>

                <FormControl id="secondName">
                  <FormLabel>Segundo Nombre</FormLabel>
                  <Input
                    name="secondName"
                    defaultValue={person.secondName || ""}
                  />
                  {errors.secondName && (
                    <Text color="red.500">
                      {errors.secondName._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>

                <FormControl id="familyName" isRequired>
                  <FormLabel>Apellido</FormLabel>
                  <Input name="familyName" defaultValue={person.familyName} />
                  {errors.familyName && (
                    <Text color="red.500">
                      {errors.familyName._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>

                <FormControl id="gender" isRequired>
                  <FormLabel>Género</FormLabel>
                  <Select
                    name="gender"
                    defaultValue={person.gender}
                    placeholder="Seleccione una opción"
                  >
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </Select>
                </FormControl>

                <FormControl id="phone" isRequired>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    type="number"
                    name="phone"
                    defaultValue={person.phone}
                  />
                  {errors.phone && (
                    <Text color="red.500">
                      {errors.phone._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>

                <FormControl id="mobile" isRequired>
                  <FormLabel>Celular</FormLabel>
                  <Input
                    type="number"
                    name="mobile"
                    defaultValue={person.mobile}
                  />
                  {errors.mobile && (
                    <Text color="red.500">
                      {errors.mobile._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>

                <FormControl id="email" isRequired>
                  <FormLabel>Correo</FormLabel>
                  <Input type="text" name="email" defaultValue={person.email} />
                  {errors.email && (
                    <Text color="red.500">
                      {errors.email._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>

                <FormControl id="birthDate" isRequired>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <Input
                    type="date"
                    name="birthDate"
                    defaultValue={
                      person.birthDate &&
                      new Date(person.birthDate).toISOString().split("T")[0]
                    }
                  />
                  {errors.birthDate && (
                    <Text color="red.500">
                      {errors.birthDate._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>

                <FormControl id="direccion" isRequired>
                  <FormLabel>Dirección</FormLabel>
                  <Input name="addressLine" defaultValue={person.addressLine} />
                  {errors.addressLine && (
                    <Text color="red.500">
                      {errors.addressLine._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>

                <FormControl id="ciudad" isRequired>
                  <FormLabel>Ciudad</FormLabel>
                  <Input name="addressCity" defaultValue={person.addressCity} />
                  {errors.addressCity && (
                    <Text color="red.500">
                      {errors.addressCity._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>

                <FormControl id="estadoCivil" isRequired>
                  <FormLabel>Estado Civil</FormLabel>
                  <Select
                    name="maritalStatus"
                    defaultValue={person.maritalStatus}
                    placeholder="Seleccione una opción"
                  >
                    <option value="soltero">Soltero</option>
                    <option value="casado">Casado</option>
                  </Select>
                </FormControl>

                <FormControl id="identification" isRequired>
                  <FormLabel>Carnet De Identidad</FormLabel>
                  <Input
                    type="number"
                    name="identification"
                    defaultValue={person.identification}
                  />
                  {errors.identification && (
                    <Text color="red.500">
                      {errors.identification._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <SeccionAlergias
                  allergies={allergies}
                  setAllergies={setAllergies}
                />
                <SeccionContactos
                  contacts={contacts}
                  setContacts={setContacts}
                />
              </SimpleGrid>
              <Flex justifyContent="center" gap={4} mt={4}>
                <Button
                  colorScheme="orange"
                  type="submit"
                  isDisabled={isLoading}
                  width="auto"
                  maxWidth="150px"
                  isLoading={isLoading}
                >
                  Editar
                </Button>
              </Flex>
            </Stack>
          </form>
        </Box>
      )}
    </DefaultLayout>
  );
}
