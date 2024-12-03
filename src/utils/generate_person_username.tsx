import { Person } from "@prisma/client";

const IDENTIFICATOR = "PER";
export const generate_person_username = (person: Person) => {
  return `${person.identification}${IDENTIFICATOR}`;
};
