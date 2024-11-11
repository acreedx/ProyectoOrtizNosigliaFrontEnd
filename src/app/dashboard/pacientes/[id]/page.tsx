"use client";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/app/dashboard/components/Common/Breadcrumb";
import { useRouter } from "next/navigation";
import { localDomain } from "@/types/domain";
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
  Heading,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import BotonVolver from "../../components/Common/BotonVolver";
interface patient {
  _id: String;
  apellidoPaterno: String;
  apellidoMaterno: String;
  primerNombre: String;
  segundoNombre: String;
  fechaNacimiento: String;
  lugarNacimiento: String;
  sexo: String;
  carnetIdentidad: String;
  direccionZona: String;
  telefono: String;
  celular: String;
  email: String;
  alergiaMedicamento: String;
}
export default function Pacientes({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    fechaFiliacion: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    primerNombre: "",
    segundoNombre: "",
    fechaNacimiento: "00/00/0000",
    lugarNacimiento: "",
    sexo: "",
    carnetIdentidad: "",
    direccionZona: "",
    telefono: "",
    celular: "",
    email: "",
    referidoPor: "",
    motivoConsulta: "",
    alergiaMedicamento: "",
  });
  useEffect(() => {
    const url = localDomain + "person/" + params.id;
    console.log(url);
    async function fectchPatient() {
      setloading(true);
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        const error = await response.json();
        throw new Error("Error al listar al paciente: " + error);
      }
      const data = await response.json();
      setFormData(data);
      console.log(data);
      setloading(false);
    }
    fectchPatient();
  }, [params.id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = localDomain + "person/" + params.id;
    console.log("Datos del formulario:", formData);
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error("Error al listar al paciente: " + error);
    }
    const data = await response.json();
    Swal.fire({
      title: "Éxito",
      text: "Paciente editado correctamente",
      icon: "success",
      confirmButtonText: "Volver al listado",
      confirmButtonColor: "#28a745",
    }).then((result) => {
      router.push("/dashboard/pacientes");
    });
  };
  return (
    <DefaultLayout>
      <BotonVolver direccion="/dashboard/pacientes" />
      <Breadcrumb pageName="Editar paciente" />
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Box
          mx="12"
          my="4"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
          p="10"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <HStack spacing={5}>
                <FormControl isRequired>
                  <FormLabel>Apellido Paterno:</FormLabel>
                  <Input
                    name="apellidoPaterno"
                    value={formData.apellidoPaterno}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Apellido Materno:</FormLabel>
                  <Input
                    name="apellidoMaterno"
                    value={formData.apellidoMaterno}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Primer Nombre:</FormLabel>
                  <Input
                    name="primerNombre"
                    value={formData.primerNombre}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Segundo Nombre:</FormLabel>
                  <Input
                    name="segundoNombre"
                    value={formData.segundoNombre}
                    onChange={handleChange}
                  />
                </FormControl>
              </HStack>
              <HStack spacing={5}>
                <FormControl isRequired>
                  <FormLabel>Fecha de Nacimiento:</FormLabel>
                  <Input
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Lugar de Nacimiento:</FormLabel>
                  <Input
                    name="lugarNacimiento"
                    value={formData.lugarNacimiento}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Sexo:</FormLabel>
                  <Select
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Carnet de Identidad:</FormLabel>
                  <Input
                    name="carnetIdentidad"
                    value={formData.carnetIdentidad}
                    onChange={handleChange}
                  />
                </FormControl>
              </HStack>
              <HStack spacing={5}>
                <FormControl isRequired>
                  <FormLabel>Dirección/Zona:</FormLabel>
                  <Input
                    name="direccionZona"
                    value={formData.direccionZona}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Teléfono:</FormLabel>
                  <Input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Celular:</FormLabel>
                  <Input
                    type="tel"
                    name="celular"
                    value={formData.celular}
                    onChange={handleChange}
                  />
                </FormControl>
              </HStack>
              <HStack spacing={5}>
                <FormControl>
                  <FormLabel>Email:</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Alergia a algún medicamento:</FormLabel>
                  <Textarea
                    name="alergiaMedicamento"
                    rows={4}
                    value={formData.alergiaMedicamento}
                    onChange={handleChange}
                  />
                </FormControl>
              </HStack>
              <Button type="submit" colorScheme="blue" width="full" mt="4">
                Enviar
              </Button>
            </VStack>
          </form>
        </Box>
      )}
    </DefaultLayout>
  );
}
