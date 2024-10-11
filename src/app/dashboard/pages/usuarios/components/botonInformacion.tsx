"use client";
import { Button } from "@chakra-ui/react";
import React from "react";

export default function BotonInformacion() {
  const bla = () => {
    console.log("ga");
  };
  return (
    <Button size="sm" colorScheme="blue" onClick={bla}>
      Ver información
    </Button>
  );
}
