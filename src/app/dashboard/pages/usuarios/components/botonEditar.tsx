"use client";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BotonEditar(props: { route: string }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(props.route);
  };
  return (
    <Button size="sm" colorScheme="yellow" onClick={handleClick}>
      Editar
    </Button>
  );
}
