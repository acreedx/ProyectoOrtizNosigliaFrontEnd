"use client";
import Layout from "@/app/paginaweb/components/Layout";
import Person from "@/interfaces/Person";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useState } from "react"; // Asegúrate de que la ruta sea correcta
import Swal from "sweetalert2";

import { z } from "zod";
import { storage } from "../../../../../firebase.config";
import formularioPersona, {
  createEmptyFormularioPersona,
} from "./formularioRegistro";
import schema from "./validacionRegistro";
import { PersonService } from "@/repositories/PersonService";
import { useRouter } from "next/navigation";
import { createPerson } from "@/pages/serveractions/person";

interface FileWithPreview extends File {
  preview?: string;
}
export default function PersonForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(createEmptyFormularioPersona());
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

  const addAllergy = () => {
    setFormData((prevData) => ({
      ...prevData,
      alergias: [
        ...prevData.allergies,
        { sustancia: "", reaccion: "", severidad: "mild", notas: "" },
      ],
    }));
  };
  const handleAllergyChange = (index: number, field: string, value: string) => {
    const updatedAllergies = formData.allergies.map((allergy, i) =>
      i === index ? { ...allergy, [field]: value } : allergy,
    );
    setFormData({ ...formData, allergies: updatedAllergies });
  };

  const handleRemoveAllergy = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      alergias: prevData.allergies.filter((_, i) => i !== index),
    }));
  };

  const handleClick = () => setShowPassword((prev) => !prev);

  const handleClickConfirm = () => setShowConfirmPassword((prev) => !prev);
  const obtenerUrlImagen = async () => {
    try {
      if (!image) {
        return "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
      } else {
        const storageRef = await ref(storage, `images/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
      }
    } catch (error) {
      console.log(error);
      return "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    const formData = new FormData(event.currentTarget);
    const response = await createPerson(formData);
    if (!response.success) {
      setErrors(response.errors);
    } else {
      Swal.fire({
        title: "Éxito",
        text: "Bienvenido al centro Ortiz Nosiglia",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#28a745",
      });
    }
    setIsLoading(false);
  };
  /*
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      schema.parse({
        ...formData,
        fechaNacimiento: new Date(formData.birthDate),
      });
      setErrors({});
      let arrayAlergiass = [] as any[];
      formData.allergies.forEach((allergy) => {
        arrayAlergiass.push({
          substance: allergy.substance,
          reaction: allergy.reaction,
          severity: allergy.severity as any,
          notes: allergy.notes,
        });
      });
      const person: Person = {
        name: {
          given: [formData.firstName, formData.secondName],
          family: formData.familyName,
        },
        gender: formData.gender,
        birthDate: formData.birthDate,
        telecom: [
          { value: formData.phone },
          { value: formData.mobile },
          { value: formData.email },
        ],
        photo: { _url: { id: await obtenerUrlImagen() } },
        address: {
          line: [formData.addressLine],
          city: formData.addressCity,
        },
        maritalStatus: {
          coding: [
            {
              code: formData.maritalStatus as any,
              display:
                formData.maritalStatus === "Married" ? "Casado" : "Soltero",
            },
          ],
        },
        carnetDeIdentidad: formData.identification,
        systemUser: {
          username: formData.username,
          password: formData.password,
        },
        allergies: arrayAlergiass as any,
      };
      console.log(person);
      const creada = await PersonService.createPerson(person);
      console.log(creada);
      if (creada.message) {
        Swal.fire({
          title: "Error",
          text: creada.message,
          icon: "error",
          confirmButtonColor: "#28a745",
        });
      } else {
        Swal.fire({
          title: "Éxito",
          text: `Bienvenido al Centro Odontológico Ortiz Nosiglia`,
          icon: "success",
          confirmButtonColor: "#28a745",
        }).then((result) => {
          router.push("/paginaweb/pages/login");
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          formErrors[err.path[0]] = err.message;
        });
        setErrors(formErrors);
      } else {
        Swal.fire({
          title: "Error",
          text: `Error al crear el Usuario`,
          icon: "error",
          confirmButtonColor: "#28a745",
        });
      }
    }
  };
  */
  return (
    <Layout>
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
          Formulario de registro
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
            <FormControl id="primerNombre" isRequired>
              <FormLabel>Primer Nombre</FormLabel>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.primerNombre && (
                <Text color="red.500">{errors.primerNombre}</Text>
              )}
            </FormControl>
            <FormControl id="segundoNombre" isRequired>
              <FormLabel>Segundo Nombre</FormLabel>
              <Input
                name="secondName"
                value={formData.secondName}
                onChange={handleInputChange}
              />
              {errors.segundoNombre && (
                <Text color="red.500">{errors.segundoNombre}</Text>
              )}
            </FormControl>
            <FormControl id="apellido" isRequired>
              <FormLabel>Apellido</FormLabel>
              <Input
                name="familyName"
                value={formData.familyName}
                onChange={handleInputChange}
              />
              {errors.apellido && (
                <Text color="red.500">{errors.apellido}</Text>
              )}
            </FormControl>
            <FormControl id="genero" isRequired>
              <FormLabel>Género</FormLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleSelectChange}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </Select>
            </FormControl>
            <FormControl id="telefono" isRequired>
              <FormLabel>Teléfono</FormLabel>
              <Input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.telefono && (
                <Text color="red.500">{errors.telefono}</Text>
              )}
            </FormControl>
            <FormControl id="celular" isRequired>
              <FormLabel>Celular</FormLabel>
              <Input
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
              />
              {errors.celular && <Text color="red.500">{errors.celular}</Text>}
            </FormControl>
            <FormControl id="correo" isRequired>
              <FormLabel>Correo</FormLabel>
              <Input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.correo && <Text color="red.500">{errors.correo}</Text>}
            </FormControl>
            <FormControl id="fechaNacimiento" isRequired>
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <Input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
              />
              {errors.fechaNacimiento && (
                <Text color="red.500">{errors.fechaNacimiento}</Text>
              )}
            </FormControl>
            <FormControl id="direccion" isRequired>
              <FormLabel>Dirección</FormLabel>
              <Input
                name="addressLine"
                value={formData.addressLine}
                onChange={handleInputChange}
              />
              {errors.direccion && (
                <Text color="red.500">{errors.direccion}</Text>
              )}
            </FormControl>
            <FormControl id="ciudad" isRequired>
              <FormLabel>Ciudad</FormLabel>
              <Input
                name="addressCity"
                value={formData.addressCity}
                onChange={handleInputChange}
              />
              {errors.ciudad && <Text color="red.500">{errors.ciudad}</Text>}
            </FormControl>
            <FormControl id="estadoCivil" isRequired>
              <FormLabel>Estado Civil</FormLabel>
              <Select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleSelectChange}
              >
                <option value="Single">Soltero</option>
                <option value="Married">Casado</option>
              </Select>
            </FormControl>
            <FormControl id="carnetDeIdentidad" isRequired>
              <FormLabel>Carnet De Identidad</FormLabel>
              <Input
                type="number"
                name="identification"
                value={formData.identification}
                onChange={handleInputChange}
              />
              {errors.carnetDeIdentidad && (
                <Text color="red.500">{errors.carnetDeIdentidad}</Text>
              )}
            </FormControl>
            <FormControl id="username" isRequired>
              <FormLabel>Usuario</FormLabel>
              <Input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <Text color="red.500">{errors.username}</Text>
              )}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <InputRightElement>
                  <Button variant="link" onClick={handleClick}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <Text color="red.500">{errors.password}</Text>
              )}
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirmar contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <InputRightElement>
                  <Button variant="link" onClick={handleClickConfirm}>
                    {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && (
                <Text color="red.500">{errors.confirmPassword}</Text>
              )}
            </FormControl>
            {/* Alergias */}
            <Heading as="h4" size="md">
              Alergias
            </Heading>
            {formData.allergies.map((allergy, index) => (
              <Box key={index} borderWidth="1px" borderRadius="md" p={4} mb={2}>
                <FormControl isRequired>
                  <FormLabel>Nombre de la sustancia</FormLabel>
                  <Input
                    type="text"
                    value={allergy.substance}
                    onChange={(e) =>
                      handleAllergyChange(index, "sustancia", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Tipo de reacción</FormLabel>
                  <Select
                    value={allergy.reaction}
                    onChange={(e) =>
                      handleAllergyChange(index, "reaccion", e.target.value)
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
                    value={allergy.notes}
                    onChange={(e) =>
                      handleAllergyChange(index, "notas", e.target.value)
                    }
                  />
                </FormControl>
                <Box textAlign="right" mt={2}>
                  <Button
                    colorScheme="red"
                    onClick={() => handleRemoveAllergy(index)}
                  >
                    Quitar Alergia
                  </Button>
                </Box>
              </Box>
            ))}
            <Button onClick={addAllergy} colorScheme="blue" variant="outline">
              Añadir Alergia
            </Button>
            <Button colorScheme="orange" type="submit" isDisabled={isLoading}>
              {isLoading ? <Spinner size="sm" /> : "Registrar"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Layout>
  );
}
