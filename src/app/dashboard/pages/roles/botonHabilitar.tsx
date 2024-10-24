"use client";
import { deshabilitarRol, habilitarRol } from "@/serveractions/roleActions";
import { Button } from "@chakra-ui/react";
import Swal from "sweetalert2";

interface BotonHabilitarProps {
  rolId: string;
  active: boolean;
}

export default function BotonHabilitar({ rolId, active }: BotonHabilitarProps) {
  const handleClick = async () => {
    if (active) {
      Swal.fire({
        title: "Confirmación",
        text: "Esta seguro que quiere deshabilitar este rol?",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#a72828",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#28a745",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deshabilitarRol(rolId);
        }
      });
    } else {
      Swal.fire({
        title: "Confirmación",
        text: "Esta seguro que quiere rehabilitar este rol?",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#a72828",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#28a745",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await habilitarRol(rolId);
        }
      });
    }
  };
  return (
    <Button colorScheme={active ? "red" : "green"} onClick={handleClick}>
      {active ? "Deshabilitar" : "Habilitar"}
    </Button>
  );
}
