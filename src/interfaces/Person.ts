import Address from "./Address";
import MaritalStatus from "./MaritalStatus";
import Name from "./Name";
import Photo from "./Photo";
import Telecom from "./Telecom";

interface SystemUser {
  username: string;
  password: string;
  roles?: string[];
  lastLogin?: string;
  passwordExpiration?: string;
  status?: string;
}

interface Allergy {
  substance: string;
  reaction: string;
  severity: "mild" | "moderate" | "severe";
  notes?: string;
}

export default interface Person {
  resourceType?: string;
  active: boolean;
  name: Name;
  gender: string;
  birthDate: string;
  telecom?: Telecom[];
  photo?: Photo;
  address?: Address;
  maritalStatus?: MaritalStatus;
  systemUser: SystemUser;
  allergies?: Allergy[];
}
