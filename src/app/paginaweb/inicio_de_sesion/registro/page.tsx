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
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { createEmptyFormularioPersona } from "./formularioRegistro";
import { useRouter } from "next/navigation";
import { createPerson } from "@/controller/person";
import { mostrarAlertaError } from "@/utils/show_error_alert";

interface FileWithPreview extends File {
  preview?: string;
}

export default function PersonForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(createEmptyFormularioPersona());
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as any;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0] as FileWithPreview;
      selectedImage.preview = URL.createObjectURL(selectedImage);
      setImage(selectedImage);
    }
  };
  const [allergies, setAllergies] = useState<
    {
      substance: string;
      reaction: string;
      severity: string;
      notes: string;
    }[]
  >([]);

  const handleAllergyChange = (index: number, field: string, value: string) => {
    const updatedAllergies = allergies.map((allergy, i) =>
      i === index ? { ...allergy, [field]: value } : allergy,
    );
    setAllergies(updatedAllergies);
  };

  const addAllergy = () => {
    setAllergies((prevData) => [
      ...prevData,
      { substance: "", reaction: "", severity: "mild", notes: "" },
    ]);
  };

  const handleRemoveAllergy = (index: number) => {
    setAllergies((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    const formData = new FormData(event.currentTarget);
    try {
      const response = await createPerson(formData);
      if (!response.success) {
        if (response.error) {
          mostrarAlertaError(response.error);
        } else {
          setErrors(response.errors);
        }
      } else {
        Swal.fire({
          title: "Éxito",
          text: "Bienvenido al centro Ortiz Nosiglia",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#28a745",
        }).then(() => {
          router.push("/paginaweb/pages/login");
        });
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
          Crea tu cuenta
        </Heading>
        <form onSubmit={handleFormSubmit}>
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
                        src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
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
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
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
                  value={formData.secondName}
                  onChange={handleInputChange}
                />
                {errors.secondName && (
                  <Text color="red.500">
                    {errors.secondName._errors.join(", ")}
                  </Text>
                )}
              </FormControl>

              <FormControl id="familyName" isRequired>
                <FormLabel>Apellido</FormLabel>
                <Input
                  name="familyName"
                  value={formData.familyName}
                  onChange={handleInputChange}
                />
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
                  value={formData.gender}
                  onChange={handleSelectChange}
                  placeholder="Seleccione una opción"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </Select>
              </FormControl>

              <FormControl id="phone" isRequired>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && (
                  <Text color="red.500">{errors.phone._errors.join(", ")}</Text>
                )}
              </FormControl>

              <FormControl id="mobile" isRequired>
                <FormLabel>Celular</FormLabel>
                <Input
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
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
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <Text color="red.500">{errors.email._errors.join(", ")}</Text>
                )}
              </FormControl>

              <FormControl id="birthDate" isRequired>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <Input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
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
                  value={formData.addressLine}
                  onChange={handleInputChange}
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
                  value={formData.addressCity}
                  onChange={handleInputChange}
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
                  value={formData.maritalStatus}
                  onChange={handleSelectChange}
                  placeholder="Seleccione una opción"
                >
                  <option value="Single">Soltero</option>
                  <option value="Married">Casado</option>
                </Select>
              </FormControl>

              <FormControl id="identification" isRequired>
                <FormLabel>Carnet De Identidad</FormLabel>
                <Input
                  type="number"
                  name="identification"
                  value={formData.identification}
                  onChange={handleInputChange}
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
              {allergies.length === 0 && (
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
              {allergies.map((allergy, index) => (
                <div key={index}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Nombre de la sustancia</FormLabel>
                      <Input
                        type="text"
                        name={`allergies[${index}][substance]`}
                        value={allergy.substance}
                        onChange={(e) =>
                          handleAllergyChange(
                            index,
                            "substance",
                            e.target.value,
                          )
                        }
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Tipo de reacción</FormLabel>
                      <Select
                        name={`allergies[${index}][reaction]`}
                        value={allergy.reaction}
                        onChange={(e) =>
                          handleAllergyChange(index, "reaction", e.target.value)
                        }
                      >
                        <option value="mild">Baja</option>
                        <option value="moderate">Moderada</option>
                        <option value="severe">Severa</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Comentario sobre la alergia</FormLabel>
                      <Input
                        type="text"
                        name={`allergies[${index}][notes]`}
                        value={allergy.notes}
                        onChange={(e) =>
                          handleAllergyChange(index, "notes", e.target.value)
                        }
                      />
                    </FormControl>
                  </SimpleGrid>

                  <Box textAlign="right" mt={2}>
                    <Button
                      colorScheme="red"
                      onClick={() => handleRemoveAllergy(index)}
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
              >
                {isLoading ? <Spinner size="sm" /> : "Registrar"}
              </Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </Layout>
  );
}
