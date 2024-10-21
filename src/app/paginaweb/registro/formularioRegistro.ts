interface Allergy {
  substance: string;
  reaction: string;
  severity: "mild" | "moderate" | "severe";
  notes: string;
}
export default interface formularioPersona {
  photoUrl: string;
  firstName: string;
  secondName: string;
  familyName: string;
  gender: string;
  phone: string;
  mobile: string;
  email: string;
  birthDate: string;
  addressLine: string;
  addressCity: string;
  maritalStatus: "Married" | "Single";
  identification: string;
  username: string;
  password: string;
  confirmPassword: string;
  allergies: Allergy[];
}
export const createEmptyFormularioPersona = (): formularioPersona => {
  return {
    photoUrl: "",
    firstName: "",
    secondName: "",
    familyName: "",
    gender: "",
    phone: "",
    mobile: "",
    email: "",
    birthDate: "",
    addressLine: "",
    addressCity: "",
    maritalStatus: "Single",
    identification: "",
    username: "",
    password: "",
    confirmPassword: "",
    allergies: [],
  };
};
