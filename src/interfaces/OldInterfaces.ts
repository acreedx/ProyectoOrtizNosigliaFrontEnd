interface MaritalStatus {
  coding?: Coding[];
}

interface Coding {
  system?: string;
  code?: string;
  display?: string;
}
interface Name {
  use?: string;
  given: string[];
  family: string;
}
interface Photo {
  _url: {
    id: string;
  };
}
interface Telecom {
  value: string;
  use?: string;
  system?: string;
}

interface Allergy {
  substance: string;
  reaction: string;
  severity: "mild" | "moderate" | "severe";
  notes?: string;
}

interface SystemUser {
  username: string;
  password: string;
  roles?: string[];
  lastLogin?: string;
  passwordExpiration?: string;
  status?: string;
}
