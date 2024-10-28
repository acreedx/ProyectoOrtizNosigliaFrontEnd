import Swal from "sweetalert2";

export function mostrarAlertaError(mensaje: string) {
  Swal.fire({
    title: "Error",
    text: mensaje,
    icon: "error",
    confirmButtonColor: "#28a745",
  });
}
