import Swal from "sweetalert2";

export function mostrarAlertaConfirmacion(
  titulo: string,
  mensaje: string,
): Promise<boolean> {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, hazlo!",
    cancelButtonText: "No, cancelar",
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#dc3545",
  }).then((result) => {
    return result.isConfirmed;
  });
}
