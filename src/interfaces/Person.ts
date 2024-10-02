export default interface Person {
  _id?: string;
  resourceType?: string;
  active?: boolean;
  name: {
    given: string[];
    family: string;
  };
  gender: string;
  birthDate: string;
  telecom: [
    {
      value: string;
    },
    {
      value: string;
    },
    {
      value: string;
    },
  ];
  photo: {
    _url: {
      id: string;
    };
  };
  address: {
    line: string[];
    city: string;
  };
  maritalStatus: {
    coding: [
      {
        code: "M" | "S";
        display: string;
      },
    ];
  };
  carnetDeIdentidad: string;
  systemUser: {
    username: string;
    password: string;
    roles?: string[];
    lastLogin?: string;
    passwordExpiration?: string;
    status?: string;
  };
  allergies?: [
    {
      substance: string;
      reaction: string;
      severity: "mild" | "moderate" | "severe";
      notes?: string;
    },
  ];
}
