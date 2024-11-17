import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function AccesoRestringido() {
  return (
    <div className="flex h-150 w-full items-center justify-center">
      <Box className="bg-gray-100 flex flex-col items-center justify-center rounded-lg p-6 shadow-md">
        <Text className="mb-4 text-lg font-semibold">
          Solo los pacientes pueden crear citas propias.
        </Text>
      </Box>
    </div>
  );
}
