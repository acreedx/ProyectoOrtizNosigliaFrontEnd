"use client";
import {
  deshabilitarRol,
  habilitarRol,
} from "@/controller/dashboard/roles/rolesController";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { mostrarAlertaConfirmacion } from "@/utils/show_question_alert";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button, IconButton } from "@chakra-ui/react";
import Swal from "sweetalert2";
import RestoreIcon from "../../components/Icons/RestoreIcon";

export default function BotonHabilitar({
  rolId,
  active,
  reloadData,
}: {
  rolId: string;
  active: boolean;
  reloadData: Function;
}) {
  const handleClick = async () => {
    try {
      if (active) {
        const isConfirmed = await mostrarAlertaConfirmacion(
          "Confirmación",
          "Esta seguro que quiere deshabilitar este rol?",
        );
        if (isConfirmed) {
          const response = await deshabilitarRol(rolId);
          reloadData();
          mostrarAlertaExito(response.message);
        }
      } else {
        const isConfirmed = await mostrarAlertaConfirmacion(
          "Confirmación",
          "Esta seguro que quiere rehabilitar este rol?",
        );
        if (isConfirmed) {
          const response = await habilitarRol(rolId);
          reloadData();
          mostrarAlertaExito(response.message);
        }
      }
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  return (
    <>
      {active ? (
        <IconButton
          aria-label="Deshabilitar"
          icon={<DeleteIcon color="red" />}
          onClick={handleClick}
        />
      ) : (
        <IconButton
          aria-label="Habilitar"
          icon={<RestoreIcon />}
          onClick={handleClick}
        />
      )}
    </>
  );
}
