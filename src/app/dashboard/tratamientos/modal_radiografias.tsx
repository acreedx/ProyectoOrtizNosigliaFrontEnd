"use client";
import { listarRadiografias } from "@/controller/dashboard/tratamientos/listarRadiografias";
import {
  agregarRadiografias,
  deshabilitarEstudio,
} from "@/controller/dashboard/tratamientos/radiografiasController";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { mostrarAlertaConfirmacion } from "@/utils/show_question_alert";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  Box,
  FormControl,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  FormLabel,
  Input,
  Flex,
  Link,
  Text,
} from "@chakra-ui/react";
import { CarePlan, ImagingStudy } from "@prisma/client";
import React, { useEffect, useState } from "react";

export default function ModalRadiografias({
  isThirdModalOpen,
  onCloseThirdModal,
  selectedTreatment,
}: {
  isThirdModalOpen: boolean;
  onCloseThirdModal: () => void;
  selectedTreatment: CarePlan | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [estudios, setEstudios] = useState<ImagingStudy[]>([]);
  const [files, setFiles] = useState<{ [key: string]: File[] }>({});
  const [imagingStudies, setimagingStudies] = useState<ImagingStudy[]>([]);
  const handleAddField = () => {
    const newField: ImagingStudy = {
      id: "",
      media: [] as string[],
      active: true,
    } as ImagingStudy;
    setEstudios((prevFields) => [...prevFields, newField]);
  };

  const handleRemoveField = (index: number) => {
    setEstudios((prevFields) => prevFields.filter((_, i) => i !== index));
    const newFiles = { ...files };
    delete newFiles[estudios[index].id];
    setFiles(newFiles);
  };

  const handleSubmitRadiografias = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.target as HTMLFormElement);
      const response = await agregarRadiografias(
        formData,
        selectedTreatment!.id,
      );
      if (response.message) {
        onCloseThirdModal();
        mostrarAlertaExito(response.message);
        fetchData();
        setEstudios([]);
        setFiles({});
      }
    } catch (e: any) {
      onCloseThirdModal();
      mostrarAlertaError(e);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRemoveEstudio = async (estudioId: string) => {
    try {
      onCloseThirdModal();
      const isConfirmed = await mostrarAlertaConfirmacion(
        "Confirmación",
        "Esta seguro de deshabilitar este estudio?",
      );
      if (isConfirmed) {
        const response = await deshabilitarEstudio(estudioId);
        fetchData();
        mostrarAlertaExito(response.message);
      }
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  const fetchData = async () => {
    setimagingStudies(
      selectedTreatment ? await listarRadiografias(selectedTreatment.id) : [],
    );
  };
  useEffect(() => {
    fetchData();
  }, [selectedTreatment]);
  return (
    <Modal isOpen={isThirdModalOpen} onClose={onCloseThirdModal} isCentered>
      <ModalOverlay />
      <ModalContent p={8} maxW="800px">
        <ModalHeader>
          <Heading fontSize="2xl" color="black" textAlign={"center"}>
            Administrar Radiografías
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box w="full" maxHeight="500px" overflowY="auto">
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
              <Box
                borderWidth="1px"
                borderColor="gray.300"
                p={4}
                borderRadius="md"
              >
                <Heading fontSize="lg" color="gray.600" mb={4}>
                  Radiografías Subidas
                </Heading>
                <Box
                  maxHeight="400px"
                  overflowY="auto"
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor="gray.200"
                  p={4}
                >
                  {imagingStudies.length === 0 ? (
                    <Box color="gray.500" textAlign="center" fontStyle="italic">
                      No se han subido radiografías.
                    </Box>
                  ) : (
                    imagingStudies.map((estudio, index) => (
                      <Box
                        key={index}
                        mb={4}
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        bg="gray.50"
                        borderColor="gray.300"
                        shadow="sm"
                      >
                        <Heading fontSize="md" color="gray.700" mb={2}>
                          {`Estudio Radiográfico ${index + 1}`}
                        </Heading>
                        <Text color="gray.600" mb={2}>
                          <strong>Descripción:</strong> {estudio.description}
                        </Text>
                        <Box>
                          <Heading fontSize="sm" color="gray.600" mb={2}>
                            Archivos:
                          </Heading>
                          <Box>
                            {estudio.media.map((url: string, fileIndex) => (
                              <Box
                                key={fileIndex}
                                mb={2}
                                display="flex"
                                alignItems="center"
                                gap={2}
                                bg="white"
                                p={2}
                                borderWidth="1px"
                                borderRadius="md"
                                borderColor="gray.300"
                              >
                                <Box
                                  p={2}
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  bg="teal.100"
                                  borderRadius="full"
                                  h="40px"
                                  w="40px"
                                  flexShrink={0}
                                >
                                  <ChevronDownIcon
                                    color="teal.500"
                                    boxSize={6}
                                  />
                                </Box>
                                <Link
                                  href={url}
                                  color="teal.600"
                                  isExternal
                                  fontWeight="medium"
                                  _hover={{
                                    textDecoration: "underline",
                                    color: "teal.700",
                                  }}
                                >
                                  {`Archivo ${fileIndex + 1}`}
                                </Link>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                        <Flex justifyContent={"flex-end"}>
                          <Button
                            mt={2}
                            colorScheme="red"
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveEstudio(estudio.id)}
                          >
                            Deshabilitar Estudio
                          </Button>
                        </Flex>
                      </Box>
                    ))
                  )}
                </Box>
              </Box>
              <Box>
                <form
                  onSubmit={handleSubmitRadiografias}
                  encType="multipart/form-data"
                >
                  {estudios.length === 0 ? (
                    <Text mb={2}>
                      No se encontraron estudios radiográficos por subir
                    </Text>
                  ) : (
                    estudios.map((estudio, index) => (
                      <FormControl mb={4} key={index}>
                        {estudio.media.length > 0 && (
                          <Box mb={2}>
                            <Menu>
                              <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                variant="outline"
                                colorScheme="teal"
                                size="sm"
                                width="auto"
                              >
                                Ver Archivos
                              </MenuButton>
                              <MenuList>
                                {estudio.media.map((value, fileIndex) => (
                                  <MenuItem key={fileIndex}>
                                    <Button
                                      variant="link"
                                      colorScheme="teal"
                                      as="a"
                                      href={value.toString()}
                                      fontSize="sm"
                                      display="inline-flex"
                                      alignItems="center"
                                      gap={2}
                                      _hover={{
                                        textDecoration: "underline",
                                        color: "orange.500",
                                      }}
                                    >
                                      Archivo {fileIndex + 1}
                                    </Button>
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </Menu>
                          </Box>
                        )}
                        <FormLabel color="black">{`Estudio Radiográfico ${index + 1}`}</FormLabel>
                        <Input
                          type="text"
                          name={`estudios[${index}][descripcion]`}
                          bg="transparent"
                          borderColor="gray.400"
                          _hover={{ borderColor: "orange.500" }}
                          _focus={{ borderColor: "orange.500" }}
                          required
                          placeholder="Ingrese una descripción"
                          mb={4}
                        />
                        <Input
                          type="file"
                          name={`estudios[${index}][files]`}
                          accept="image/*,application/pdf"
                          multiple
                          bg="transparent"
                          borderColor="gray.400"
                          _hover={{ borderColor: "orange.500" }}
                          _focus={{ borderColor: "orange.500" }}
                          required
                        />
                        <Flex justifyContent={"flex-end"}>
                          <Button
                            mt={2}
                            colorScheme="red"
                            onClick={() => handleRemoveField(index)}
                          >
                            Eliminar Estudio
                          </Button>
                        </Flex>
                      </FormControl>
                    ))
                  )}
                  <Button mt={4} colorScheme="teal" onClick={handleAddField}>
                    Agregar Radiografía
                  </Button>
                  {estudios.length > 0 && (
                    <Button
                      mt={4}
                      colorScheme="orange"
                      type="submit"
                      w="full"
                      isLoading={isLoading}
                    >
                      Guardar Radiografías
                    </Button>
                  )}
                </form>
              </Box>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
