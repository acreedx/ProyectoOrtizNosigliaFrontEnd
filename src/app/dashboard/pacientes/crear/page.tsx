"use client";
import {
  Box,
  Heading,
  Stack,
  Flex,
  FormControl,
  FormLabel,
  SimpleGrid,
  Select,
  Button,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import Breadcrumb from "../../components/Common/Breadcrumb";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { getCaptchaToken } from "@/utils/captcha";
import { createPerson } from "@/controller/paginaweb/inicio_de_sesion/registroController";
import Swal from "sweetalert2";
import { routes } from "@/config/routes";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import SeccionAlergias from "@/app/paginaweb/inicio_de_sesion/registro/seccion_alergias";
import SeccionContactos from "@/app/paginaweb/inicio_de_sesion/registro/seccion_contactos";
import BotonVolver from "../../components/Common/BotonVolver";
interface FileWithPreview extends File {
  preview?: string;
}
export default function Page() {
  const router = useRouter();
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0] as FileWithPreview;
      selectedImage.preview = URL.createObjectURL(selectedImage);
      setImage(selectedImage);
    }
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    const formData = new FormData(event.currentTarget);
    try {
      const token = await getCaptchaToken();
      const response = await createPerson(token, formData);
      if (response.success) {
        Swal.fire({
          title: "Éxito",
          text: "Bienvenido al centro Ortiz Nosiglia \n se ha enviado el usuario y contraseña al correo electrónico ingresado",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#28a745",
        }).then(() => {
          router.push(routes.pacientes);
        });
      } else {
        if (response.error) {
          mostrarAlertaError(response.error);
        } else {
          setErrors(response.errors);
        }
      }
      setIsLoading(false);
    } catch (e: any) {
      mostrarAlertaError(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Creación de pacientes" />
      <BotonVolver direccion={routes.pacientes} />
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
                <Input name="firstName" />
                {errors.firstName && (
                  <Text color="red.500">
                    {errors.firstName._errors.join(", ")}
                  </Text>
                )}
              </FormControl>

              <FormControl id="secondName" isRequired>
                <FormLabel>Segundo Nombre</FormLabel>
                <Input name="secondName" />
                {errors.secondName && (
                  <Text color="red.500">
                    {errors.secondName._errors.join(", ")}
                  </Text>
                )}
              </FormControl>

              <FormControl id="familyName" isRequired>
                <FormLabel>Apellido</FormLabel>
                <Input name="familyName" />
                {errors.familyName && (
                  <Text color="red.500">
                    {errors.familyName._errors.join(", ")}
                  </Text>
                )}
              </FormControl>

              <FormControl id="gender" isRequired>
                <FormLabel>Género</FormLabel>
                <Select name="gender" placeholder="Seleccione una opción">
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </Select>
              </FormControl>

              <FormControl id="phone" isRequired>
                <FormLabel>Teléfono</FormLabel>
                <Input type="number" name="phone" />
                {errors.phone && (
                  <Text color="red.500">{errors.phone._errors.join(", ")}</Text>
                )}
              </FormControl>

              <FormControl id="mobile" isRequired>
                <FormLabel>Celular</FormLabel>
                <Input type="number" name="mobile" />
                {errors.mobile && (
                  <Text color="red.500">
                    {errors.mobile._errors.join(", ")}
                  </Text>
                )}
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Correo</FormLabel>
                <Input type="text" name="email" />
                {errors.email && (
                  <Text color="red.500">{errors.email._errors.join(", ")}</Text>
                )}
              </FormControl>

              <FormControl id="birthDate" isRequired>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <Input type="date" name="birthDate" />
                {errors.birthDate && (
                  <Text color="red.500">
                    {errors.birthDate._errors.join(", ")}
                  </Text>
                )}
              </FormControl>

              <FormControl id="direccion" isRequired>
                <FormLabel>Dirección</FormLabel>
                <Input name="addressLine" />
                {errors.addressLine && (
                  <Text color="red.500">
                    {errors.addressLine._errors.join(", ")}
                  </Text>
                )}
              </FormControl>

              <FormControl id="ciudad" isRequired>
                <FormLabel>Ciudad</FormLabel>
                <Input name="addressCity" />
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
                  placeholder="Seleccione una opción"
                >
                  <option value="soltero">Soltero</option>
                  <option value="casado">Casado</option>
                </Select>
              </FormControl>

              <FormControl id="identification" isRequired>
                <FormLabel>Carnet De Identidad</FormLabel>
                <Input type="number" name="identification" />
                {errors.identification && (
                  <Text color="red.500">
                    {errors.identification._errors.join(", ")}
                  </Text>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <SeccionAlergias />
              <SeccionContactos />
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
                Registrar
              </Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </DefaultLayout>
  );
}
