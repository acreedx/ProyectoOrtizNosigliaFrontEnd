import Person from "@/interfaces/Person";
import { localDomain } from "@/types/domain";
const moduleName = "persons";
export class PersonService {
  static async getPerson(): Promise<Person[]> {
    const res = await fetch(localDomain + moduleName);
    const data: Person[] = await res.json();
    return data;
  }
  static async getLatestPersons(): Promise<Person[]> {
    const res = await fetch(localDomain + moduleName + "/newpersons");
    const data: Person[] = await res.json();
    return data;
  }
  static async getPersonById(id: string): Promise<Person> {
    const res = await fetch(localDomain + moduleName + "/" + id);
    const data: Person = await res.json();
    return data;
  }
  static async createPerson(person: Person) {
    const res = await fetch(localDomain + moduleName, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    });
    const data = await res.json();
    return data;
  }
  static async updatePerson(person: Person) {
    const res = await fetch(localDomain + moduleName + "/" + person._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    });
    const data = await res.json();
    return data;
  }
  static async enablePerson(id: string): Promise<Person> {
    const res = await fetch(localDomain + moduleName + "/habilitar/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const data: Person = await res.json();
    return data;
  }
  static async disablePerson(id: string): Promise<Person> {
    const res = await fetch(localDomain + moduleName + "/deshabilitar/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const data: Person = await res.json();
    return data;
  }
}
