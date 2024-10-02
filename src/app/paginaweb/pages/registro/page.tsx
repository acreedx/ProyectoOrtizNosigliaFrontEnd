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
  Stack,
  Text,
} from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useState } from "react"; // Asegúrate de que la ruta sea correcta
import Swal from "sweetalert2";

import { z } from "zod";
import { storage } from "../../../../../firebase.config";
import formularioPersona from "./formularioRegistro";
import schema from "./validacionRegistro";
import { PersonService } from "@/repositories/PersonService";
import { useRouter } from "next/navigation";

interface FileWithPreview extends File {
  preview?: string;
}
export default function PersonForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<formularioPersona>({
    foto: "",
    primerNombre: "",
    segundoNombre: "",
    apellido: "",
    genero: "Masculino",
    telefono: "",
    celular: "",
    correo: "",
    fechaNacimiento: "",
    direccion: "",
    ciudad: "",
    estadoCivil: "S",
    carnetDeIdentidad: "",
    username: "",
    password: "",
    confirmPassword: "",
    alergias: [],
  });
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
        ...prevData.alergias,
        { sustancia: "", reaccion: "", severidad: "mild", notas: "" },
      ],
    }));
  };
  const handleAllergyChange = (index: number, field: string, value: string) => {
    const updatedAllergies = formData.alergias.map((allergy, i) =>
      i === index ? { ...allergy, [field]: value } : allergy,
    );
    setFormData({ ...formData, alergias: updatedAllergies });
  };

  const handleRemoveAllergy = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      alergias: prevData.alergias.filter((_, i) => i !== index),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      schema.parse({
        ...formData,
        fechaNacimiento: new Date(formData.fechaNacimiento),
      });
      setErrors({});
      let arrayAlergiass = [] as any[];
      formData.alergias.forEach((allergy) => {
        arrayAlergiass.push({
          substance: allergy.sustancia,
          reaction: allergy.reaccion,
          severity: allergy.severidad as any,
          notes: allergy.notas,
        });
      });
      const person: Person = {
        name: {
          given: [formData.primerNombre, formData.segundoNombre],
          family: formData.apellido,
        },
        gender: formData.genero,
        birthDate: formData.fechaNacimiento,
        telecom: [
          { value: formData.telefono },
          { value: formData.celular },
          { value: formData.correo },
        ],
        photo: { _url: { id: await obtenerUrlImagen() } },
        address: {
          line: [formData.direccion],
          city: formData.ciudad,
        },
        maritalStatus: {
          coding: [
            {
              code: formData.estadoCivil as any,
              display: formData.estadoCivil === "M" ? "Casado" : "Soltero",
            },
          ],
        },
        carnetDeIdentidad: formData.carnetDeIdentidad,
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
        <form onSubmit={handleSubmit}>
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
                    name="fotoDePerfil"
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
                name="primerNombre"
                value={formData.primerNombre}
                onChange={handleInputChange}
              />
              {errors.primerNombre && (
                <Text color="red.500">{errors.primerNombre}</Text>
              )}
            </FormControl>
            <FormControl id="segundoNombre" isRequired>
              <FormLabel>Segundo Nombre</FormLabel>
              <Input
                name="segundoNombre"
                value={formData.segundoNombre}
                onChange={handleInputChange}
              />
              {errors.segundoNombre && (
                <Text color="red.500">{errors.segundoNombre}</Text>
              )}
            </FormControl>
            <FormControl id="apellido" isRequired>
              <FormLabel>Apellido</FormLabel>
              <Input
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
              />
              {errors.apellido && (
                <Text color="red.500">{errors.apellido}</Text>
              )}
            </FormControl>
            <FormControl id="genero" isRequired>
              <FormLabel>Género</FormLabel>
              <Select
                name="genero"
                value={formData.genero}
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
                name="telefono"
                value={formData.telefono}
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
                name="celular"
                value={formData.celular}
                onChange={handleInputChange}
              />
              {errors.celular && <Text color="red.500">{errors.celular}</Text>}
            </FormControl>
            <FormControl id="correo" isRequired>
              <FormLabel>Correo</FormLabel>
              <Input
                type="text"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
              />
              {errors.correo && <Text color="red.500">{errors.correo}</Text>}
            </FormControl>
            <FormControl id="fechaNacimiento" isRequired>
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <Input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
              />
              {errors.fechaNacimiento && (
                <Text color="red.500">{errors.fechaNacimiento}</Text>
              )}
            </FormControl>
            <FormControl id="direccion" isRequired>
              <FormLabel>Dirección</FormLabel>
              <Input
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
              />
              {errors.direccion && (
                <Text color="red.500">{errors.direccion}</Text>
              )}
            </FormControl>
            <FormControl id="ciudad" isRequired>
              <FormLabel>Ciudad</FormLabel>
              <Input
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
              />
              {errors.ciudad && <Text color="red.500">{errors.ciudad}</Text>}
            </FormControl>
            <FormControl id="estadoCivil" isRequired>
              <FormLabel>Estado Civil</FormLabel>
              <Select
                name="estadoCivil"
                value={formData.estadoCivil}
                onChange={handleSelectChange}
              >
                <option value="S">Soltero</option>
                <option value="M">Casado</option>
              </Select>
            </FormControl>
            <FormControl id="carnetDeIdentidad" isRequired>
              <FormLabel>Carnet De Identidad</FormLabel>
              <Input
                type="number"
                name="carnetDeIdentidad"
                value={formData.carnetDeIdentidad}
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
            {formData.alergias.map((allergy, index) => (
              <Box key={index} borderWidth="1px" borderRadius="md" p={4} mb={2}>
                <FormControl isRequired>
                  <FormLabel>Nombre de la sustancia</FormLabel>
                  <Input
                    type="text"
                    value={allergy.sustancia}
                    onChange={(e) =>
                      handleAllergyChange(index, "sustancia", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Tipo de reacción</FormLabel>
                  <Select
                    value={allergy.reaccion}
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
                    value={allergy.notas}
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
            {/* Botón de envío */}
            <Button
              colorScheme="orange"
              type="submit"
              isLoading={false} // Controla esto según tu lógica
            >
              Registrar
            </Button>
          </Stack>
        </form>
      </Box>
    </Layout>
  );
}
