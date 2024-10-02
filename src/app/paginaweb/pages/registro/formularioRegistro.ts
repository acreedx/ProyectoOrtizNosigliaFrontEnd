interface Allergy {
  sustancia: string;
  reaccion: string;
  severidad: "mild" | "moderate" | "severe";
  notas: string;
}
export default interface formularioPersona {
  foto: string;
  primerNombre: string;
  segundoNombre: string;
  apellido: string;
  genero: string;
  telefono: string;
  celular: string;
  correo: string;
  fechaNacimiento: string;
  direccion: string;
  ciudad: string;
  estadoCivil: string;
  carnetDeIdentidad: string;
  username: string;
  password: string;
  confirmPassword: string;
  alergias: Allergy[];
}
