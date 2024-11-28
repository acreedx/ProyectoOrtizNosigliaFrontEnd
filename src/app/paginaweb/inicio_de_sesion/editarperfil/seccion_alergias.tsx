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
import { Allergy } from "@prisma/client";
import React, { SetStateAction, useState } from "react";

export default function SeccionAlergias({
  allergies,
  setAllergies,
}: {
  allergies: Allergy[];
  setAllergies: React.Dispatch<React.SetStateAction<Allergy[]>>;
}) {
  const addAllergy = () => {
    setAllergies((prevData) => [
      ...prevData,
      { substance: "", reaction: "baja", notes: "" } as Allergy,
    ]);
  };
  const removeAllergy = (index: number) => {
    setAllergies((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Heading as="h4" size="md" mt={6}>
        Alergias
      </Heading>
      <Box borderWidth="1px" borderRadius="md" p={4} mb={2}>
        {allergies && allergies.length === 0 && (
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
        {allergies &&
          allergies.map((allergy, index) => (
            <div key={index}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Nombre de la sustancia</FormLabel>
                  <Input
                    type="text"
                    name={`allergies[${index}][substance]`}
                    defaultValue={allergy.substance}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Tipo de reacción</FormLabel>
                  <Select
                    name={`allergies[${index}][reaction]`}
                    defaultValue={allergy.reaction}
                  >
                    <option value="baja">Baja</option>
                    <option value="moderada">Moderada</option>
                    <option value="severa">Severa</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Comentario sobre la alergia</FormLabel>
                  <Input
                    type="text"
                    name={`allergies[${index}][notes]`}
                    defaultValue={allergy.notes || ""}
                  />
                </FormControl>
              </SimpleGrid>

              <Box textAlign="right" mt={2}>
                <Button colorScheme="red" onClick={() => removeAllergy(index)}>
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
