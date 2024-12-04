"use client";
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
import { useState } from "react";

export default function SeccionAlergias() {
  const [allergies, setAllergies] = useState<number[]>([]);

  const addAllergy = () => {
    setAllergies((prevData) => [...prevData, prevData.length]);
  };

  const handleRemoveAllergy = (index: number) => {
    setAllergies((prevData) => prevData.filter((_, i) => i !== index));
  };
  return (
    <div>
      <Heading as="h4" size="md" mt={6} mb={2}>
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
        {allergies.map((index) => (
          <div key={index}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nombre de la sustancia</FormLabel>
                <Input type="text" name={`allergies[${index}][substance]`} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Tipo de reacción</FormLabel>
                <Select name={`allergies[${index}][reaction]`}>
                  <option value="mild">Baja</option>
                  <option value="moderate">Moderada</option>
                  <option value="severe">Severa</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Comentario sobre la alergia</FormLabel>
                <Input type="text" name={`allergies[${index}][notes]`} />
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
    </div>
  );
}
