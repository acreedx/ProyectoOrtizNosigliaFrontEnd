"use client";
import { dehabilitateUser, habilitateUser } from "@/serveractions/userActions";
import { Button } from "@chakra-ui/react";
import Swal from "sweetalert2";

interface BotonHabilitarProps {
  userId: string;
  active: boolean;
}

export default function BotonHabilitar({
  userId,
  active,
}: BotonHabilitarProps) {
  const handleClick = async () => {
    if (active) {
      Swal.fire({
        title: "Confirmación",
        text: "Esta seguro que quiere deshabilitar este usuario?",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#a72828",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#28a745",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dehabilitateUser(userId);
        }
      });
    } else {
      Swal.fire({
        title: "Confirmación",
        text: "Esta seguro que quiere rehabilitar este usuario?",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#a72828",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#28a745",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await habilitateUser(userId);
        }
      });
    }
  };
  return (
    <Button
      size="sm"
      colorScheme={active ? "red" : "green"}
      onClick={handleClick}
    >
      {active ? "Deshabilitar" : "Habilitar"}
    </Button>
  );
}
