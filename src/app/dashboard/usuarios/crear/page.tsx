"use client";
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
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/app/dashboard/components/Common/Breadcrumb";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import BotonVolver from "@/app/dashboard/components/Common/BotonVolver";
import { routes } from "@/config/routes";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { crearUsuario } from "@/controller/dashboard/usuarios/usuariosController";
import { Rol } from "@prisma/client";
import { listarRoles } from "@/controller/dashboard/roles/rolesController";

interface FileWithPreview extends File {
  preview?: string;
}

export default function Page() {
  const router = useRouter();
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState<Rol[]>();
  const fetchData = async () => {
    setRoles(await listarRoles());
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (e: any) {
      mostrarAlertaError(e);
    } finally {
      setLoading(false);
    }
  }, []);

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
      const response = await crearUsuario(formData);
      if (response.success) {
        Swal.fire({
          title: "Éxito",
          text: "Bienvenido al centro Ortiz Nosiglia",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#28a745",
        }).then(() => {
          router.push(routes.usuarios);
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
      mostrarAlertaError(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Crear Usuario" />
      <BotonVolver direccion={routes.usuarios} />
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
          Registrar Usuario
        </Heading>
        <form onSubmit={handleFormSubmit}>
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
                  {image ? (
                    <Image
                      src={image!.preview!}
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
                    onChange={handleImageChange}
                    accept="image/*"
                    className="pt-1"
                  />
                </Flex>
              </FormControl>
            </Flex>
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
              <Select name="gender">
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
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
                <Text color="red.500">{errors.mobile._errors.join(", ")}</Text>
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
              <Select name="maritalStatus">
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
            <FormControl id="rol" isRequired>
              <FormLabel>Rol</FormLabel>
              {loading ? (
                <Spinner />
              ) : (
                <Select name="rol">
                  {roles &&
                    roles.map((rol: Rol) => (
                      <option key={rol.id} value={rol.id}>
                        {rol.roleName}
                      </option>
                    ))}
                </Select>
              )}
            </FormControl>
            <Button colorScheme="orange" type="submit" isDisabled={isLoading}>
              {isLoading ? <Spinner size="sm" /> : "Registrar"}
            </Button>
          </Stack>
        </form>
      </Box>
    </DefaultLayout>
  );
}
