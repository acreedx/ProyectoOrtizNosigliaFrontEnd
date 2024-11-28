"use client";

import React, { useState, useEffect, FormEventHandler, FormEvent } from "react";
import Breadcrumb from "@/app/dashboard/components/Common/Breadcrumb";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import BotonVolver from "@/app/dashboard/components/Common/BotonVolver";
import { OdontogramRows } from "@prisma/client";
import { obtenerOdontograma } from "@/controller/dashboard/odontograma/odontogramaListar";
import {
  Box,
  Button,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { routes } from "@/config/routes";
import { useForm } from "react-hook-form";
import { editarOdontograma } from "@/controller/dashboard/odontograma/odontogramaController";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
export default function Odontograma({ params }: { params: { id: string } }) {
  const [odontograma, setOdontograma] = useState<OdontogramRows[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      odontograma: [] as OdontogramRows[],
    },
  });
  const [isloading, setisLoading] = useState(false);
  const onSubmit = async (data: { odontograma: OdontogramRows[] }) => {
    try {
      setisLoading(true);
      const response = await editarOdontograma(data.odontograma);
      mostrarAlertaExito(response.message);
      fetchData();
    } catch (e: any) {
      mostrarAlertaError(e);
    } finally {
      setisLoading(false);
    }
  };
  async function fetchData() {
    try {
      setLoading(true);
      setOdontograma((await obtenerOdontograma(params.id)) as OdontogramRows[]);
    } catch (error: any) {
      mostrarAlertaError(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [params.id]);
  return (
    <DefaultLayout>
      <BotonVolver direccion={routes.pacientes} />
      <Breadcrumb pageName="Editar odontograma" />
      {loading ? (
        <Spinner />
      ) : (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <Box overflowX="auto">
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th>MSC</Th>
                  <Th>Temp.</Th>
                  <Th>Piezas</Th>
                  <Th>Fecha</Th>
                  <Th>Diagnóstico</Th>
                  <Th>Tratamiento presuntivo</Th>
                </Tr>
              </Thead>
              <Tbody>
                {odontograma.map((row, index) => (
                  <Tr key={index}>
                    <Td>
                      <input
                        type="hidden"
                        {...register(`odontograma.${index}.id`)}
                        defaultValue={row.id}
                      />
                      {row.msc}
                    </Td>
                    <Td>{row.temp}</Td>
                    <Td>{row.piezas}</Td>
                    <Td>
                      <Input
                        type="date"
                        {...register(`odontograma.${index}.fecha`)}
                        defaultValue={
                          row.fecha
                            ? new Date(row.fecha).toISOString().split("T")[0]
                            : ""
                        }
                        size="sm"
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        {...register(`odontograma.${index}.diagnostico`)}
                        defaultValue={row.diagnostico || ""}
                        size="sm"
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        {...register(`odontograma.${index}.tratamiento`)}
                        defaultValue={row.tratamiento || ""}
                        size="sm"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Box display="flex" justifyContent="end" mt={10} mr={10}>
            <Button
              type="submit"
              colorScheme="blue"
              px={4}
              py={2}
              _hover={{ bg: "blue.600" }}
              isLoading={isloading}
            >
              Guardar Cambios
            </Button>
          </Box>
        </Box>
      )}
    </DefaultLayout>
  );
}
