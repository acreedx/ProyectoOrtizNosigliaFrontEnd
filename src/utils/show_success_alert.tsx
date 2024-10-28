import Swal from "sweetalert2";

export function mostrarAlertaExito(mensaje: string) {
  Swal.fire({
    title: "Éxito",
    text: mensaje,
    icon: "success",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#28a745",
  });
}
