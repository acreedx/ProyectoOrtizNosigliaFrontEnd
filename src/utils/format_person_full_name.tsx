import { Patient, Person } from "@prisma/client";

export const personFullNameFormater = (person: Person | Patient) => {
  return person.firstName + " " + person.familyName;
};
