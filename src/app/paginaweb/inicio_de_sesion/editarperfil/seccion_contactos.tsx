import {
  Heading,
  Box,
  SimpleGrid,
  FormControl,
  FormLabel,
  Select,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import { Contact } from "@prisma/client";

import React from "react";

export default function SeccionContactos({
  contacts,
  setContacts,
}: {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}) {
  const addContact = () => {
    setContacts((prevData) => [
      ...prevData,
      {
        relationship: "",
        name: "",
        phone: "",
        mobile: "",
        email: "",
        addressLine: "",
        addressCity: "",
        gender: "",
      } as Contact,
    ]);
  };

  const removeContact = (index: number) => {
    setContacts((prevData) => prevData.filter((_, i) => i !== index));
  };
  return (
    <div>
      <Heading as="h4" size="md" mt={6} mb={2}>
        Contactos
      </Heading>
      <Box borderWidth="1px" borderRadius="md" p={4} mb={2}>
        {contacts && contacts.length === 0 && (
          <Box
            p={4}
            borderRadius="md"
            color="orange.400"
            textAlign="center"
            fontWeight="medium"
          >
            ¿Quieres registrar un contacto?
          </Box>
        )}
        {contacts &&
          contacts.map((contact, index) => (
            <div key={index}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Grado de parentesco</FormLabel>
                  <Select
                    name={`contacts[${index}][relationship]`}
                    defaultValue={contact.relationship}
                    placeholder="Seleccione una opción"
                  >
                    <option value="padre">Padre/Madre</option>
                    <option value="hijo">Hijo/Hija</option>
                    <option value="hermano">Hermano/Hermana</option>
                    <option value="abuelo">Abuelo/Abuela</option>
                    <option value="nieto">Nieto/Nieta</option>
                    <option value="tio">Tío/Tía</option>
                    <option value="sobrino">Sobrino/Sobrina</option>
                    <option value="primo">Primo/Prima</option>
                    <option value="otro">Otro</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    type="text"
                    name={`contacts[${index}][name]`}
                    defaultValue={contact.name || ""}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    type="text"
                    name={`contacts[${index}][phone]`}
                    defaultValue={contact.phone || ""}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Celular</FormLabel>
                  <Input
                    type="text"
                    name={`contacts[${index}][mobile]`}
                    defaultValue={contact.mobile || ""}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Correo</FormLabel>
                  <Input
                    type="text"
                    name={`contacts[${index}][email]`}
                    defaultValue={contact.email || ""}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Dirección</FormLabel>
                  <Input
                    type="text"
                    name={`contacts[${index}][addressLine]`}
                    defaultValue={contact.addressLine || ""}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Ciudad</FormLabel>
                  <Input
                    type="text"
                    name={`contacts[${index}][addressCity]`}
                    defaultValue={contact.addressCity || ""}
                  />
                </FormControl>

                <FormControl id="gender" isRequired>
                  <FormLabel>Género</FormLabel>
                  <Select
                    name={`contacts[${index}][gender]`}
                    defaultValue={contact.gender}
                    placeholder="Seleccione una opción"
                  >
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </Select>
                </FormControl>
              </SimpleGrid>
              <Box textAlign="right" mt={2}>
                <Button colorScheme="red" onClick={() => removeContact(index)}>
                  Eliminar contacto
                </Button>
              </Box>
            </div>
          ))}
      </Box>
      <Flex justifyContent="flex-end" gap={4} mt={4}>
        <Button
          onClick={addContact}
          colorScheme="blue"
          variant="outline"
          width="auto"
          maxWidth="150px"
        >
          Añadir Contacto
        </Button>
      </Flex>
    </div>
  );
}
