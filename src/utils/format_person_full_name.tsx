import { Person } from "@prisma/client";

export const personFullNameFormater = (person: Person) => {
  return person.firstName + " " + person.familyName;
};
