import { crearOrganizacion } from "@/controller/dashboard/organizaciones/organizacionesController";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
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
  FormLabel,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { Organization } from "@prisma/client";
import { FormEventHandler } from "react";

export default function CrearOrganizacion({
  refreshData,
}: {
  refreshData: Function;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmitCreate: FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const values = Object.fromEntries(formData.entries());
      const organization: Organization = {
        name: values.name as string,
        address: values.direccion as string,
      } as Organization;
      onClose();
      const res = await crearOrganizacion(organization);
      if (res.message) {
        refreshData();
        mostrarAlertaExito(res.message);
      }
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  return (
    <>
      <Button
        colorScheme="teal"
        onClick={() => {
          onOpen();
        }}
        float="right"
        ml={4}
        mb={4}
      >
        Crear Organización
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalHeader>
            <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
              Crear organización
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full">
              <Box>
                <form onSubmit={handleSubmitCreate}>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Nombre
                    </FormLabel>
                    <Input
                      name="name"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                    />
                  </FormControl>
                  <FormControl mb={6} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Dirección
                    </FormLabel>
                    <Input
                      name="direccion"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    w="full"
                    bg="orange.400"
                    color="white"
                    _hover={{ bg: "orange.500" }}
                    p={4}
                    borderRadius="lg"
                  >
                    Crear Organización
                  </Button>
                </form>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
