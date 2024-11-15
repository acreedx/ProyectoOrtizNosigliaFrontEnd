"use client";
import Layout from "@/app/paginaweb/components/Layout";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { getSession, useSession } from "next-auth/react";
import { Allergy, Person } from "@prisma/client";
import {
  editarPerfil,
  listarPerfil,
} from "@/controller/paginaweb/inicio_de_sesion/editarPerfilController";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import { GetServerSideProps } from "next";
interface FileWithPreview extends File {
  preview?: string;
}
export default function PersonForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [usuario, setUsuario] = useState<Person & { allergies: Allergy[] }>(
    {} as Person & { allergies: Allergy[] },
  );
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [loading, setloading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0] as FileWithPreview;
      selectedImage.preview = URL.createObjectURL(selectedImage);
      setImage(selectedImage);
    }
  };
  const [allergies, setAllergies] = useState<Allergy[]>(usuario.allergies);

  const addAllergy = () => {
    setAllergies((prevData) => [
      ...prevData,
      { substance: "", reaction: "baja", notes: "" } as Allergy,
    ]);
  };

  const removeAllergy = (index: number) => {
    setAllergies((prevData) => prevData.filter((_, i) => i !== index));
  };
  const fetchData = async () => {
    setloading(true);
    const userData = await listarPerfil(session!.user.id);
    setUsuario(userData);
    setAllergies(userData.allergies);
    setloading(false);
  };
  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    fetchData();
  }, [session?.user?.id]);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    const formData = new FormData(event.currentTarget);
    try {
      const response = await editarPerfil(usuario.id, formData);
      if (response.message) {
        mostrarAlertaExito(response.message);
        fetchData();
        console.log(usuario);
      }
      setIsLoading(false);
    } catch (e: any) {
      mostrarAlertaError(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      {loading ? (
        <Box
          mx={{ base: 8, sm: 16, md: 40, lg: 60 }}
          height={"400px"}
          my={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          p={{ base: 3, md: 5 }}
          bg="white"
        >
          <div className="flex justify-center align-middle">
            <Spinner />
          </div>
        </Box>
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
            Editar tu perfil
          </Heading>
          <form onSubmit={handleFormSubmit}>
            <input type="hidden" defaultValue={usuario.id} />
            <Stack spacing={4}>
              <Flex
                direction={"row"}
                gap={5}
                mb={5}
                className="w-full justify-center"
              >
                <FormControl w="400px">
                  <Flex direction="column" align="center">
                    <FormLabel>Foto de Perfil</FormLabel>
                    <Box
                      borderRadius="full"
                      overflow="hidden"
                      borderWidth="2px"
                      borderColor="gray.300"
                      width="250px"
                      height="250px"
                      mb={4}
                      boxShadow="md"
                    >
                      {image ? (
                        <Image
                          src={image!.preview!}
                          alt="Previsualización imagen"
                          width="250px"
                          height="250px"
                          objectFit="cover"
                        />
                      ) : (
                        <Image
                          src={usuario.photoUrl}
                          alt="Imagen por defecto"
                          width="250px"
                          height="250px"
                          objectFit="cover"
                        />
                      )}
                    </Box>
                    <Input
                      type="file"
                      name="photoUrl"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="pt-1"
                    />
                  </Flex>
                </FormControl>
              </Flex>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Primer Nombre</FormLabel>
                  <Input name="firstName" defaultValue={usuario.firstName} />
                  {errors.firstName && (
                    <Text color="red.500">
                      {errors.firstName._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>

                <FormControl id="secondName" isRequired>
                  <FormLabel>Segundo Nombre</FormLabel>
                  <Input
                    name="secondName"
                    defaultValue={usuario.secondName || ""}
                  />
                  {errors.secondName && (
                    <Text color="red.500">
                      {errors.secondName._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>

                <FormControl id="familyName" isRequired>
                  <FormLabel>Apellido</FormLabel>
                  <Input name="familyName" defaultValue={usuario.familyName} />
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
                    defaultValue={usuario.gender}
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
                    defaultValue={usuario.phone}
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
                    defaultValue={usuario.mobile}
                  />
                  {errors.mobile && (
                    <Text color="red.500">
                      {errors.mobile._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>

                <FormControl id="email" isRequired>
                  <FormLabel>Correo</FormLabel>
                  <Input
                    type="text"
                    name="email"
                    defaultValue={usuario.email}
                  />
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
                      usuario.birthDate &&
                      new Date(usuario.birthDate).toISOString().split("T")[0]
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
                  <Input
                    name="addressLine"
                    defaultValue={usuario.addressLine}
                  />
                  {errors.addressLine && (
                    <Text color="red.500">
                      {errors.addressLine._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>

                <FormControl id="ciudad" isRequired>
                  <FormLabel>Ciudad</FormLabel>
                  <Input
                    name="addressCity"
                    defaultValue={usuario.addressCity}
                  />
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
                    defaultValue={usuario.maritalStatus}
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
                    defaultValue={usuario.identification}
                  />
                  {errors.identification && (
                    <Text color="red.500">
                      {errors.identification._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>
              </SimpleGrid>

              <Heading as="h4" size="md" mt={6}>
                Alergias
              </Heading>

              <Box borderWidth="1px" borderRadius="md" p={4} mb={2}>
                {allergies && allergies.length === 0 && (
                  <Box
                    p={4}
                    borderRadius="md"
                    color="orange.400"
                    textAlign="center"
                    fontWeight="medium"
                  >
                    ¿Quieres registrar una alergia?
                  </Box>
                )}
                {allergies &&
                  allergies.map((allergy, index) => (
                    <div key={index}>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl isRequired>
                          <FormLabel>Nombre de la sustancia</FormLabel>
                          <Input
                            type="text"
                            name={`allergies[${index}][substance]`}
                            defaultValue={allergy.substance}
                          />
                        </FormControl>

                        <FormControl isRequired>
                          <FormLabel>Tipo de reacción</FormLabel>
                          <Select
                            name={`allergies[${index}][reaction]`}
                            defaultValue={allergy.reaction}
                          >
                            <option value="baja">Baja</option>
                            <option value="moderada">Moderada</option>
                            <option value="severa">Severa</option>
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel>Comentario sobre la alergia</FormLabel>
                          <Input
                            type="text"
                            name={`allergies[${index}][notes]`}
                            defaultValue={allergy.notes || ""}
                          />
                        </FormControl>
                      </SimpleGrid>

                      <Box textAlign="right" mt={2}>
                        <Button
                          colorScheme="red"
                          onClick={() => removeAllergy(index)}
                        >
                          Quitar Alergia
                        </Button>
                      </Box>
                    </div>
                  ))}
              </Box>
              <Flex justifyContent="flex-end" gap={4} mt={4}>
                <Button
                  onClick={addAllergy}
                  colorScheme="blue"
                  variant="outline"
                  width="auto"
                  maxWidth="150px"
                >
                  Añadir Alergia
                </Button>
              </Flex>
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
    </Layout>
  );
}
