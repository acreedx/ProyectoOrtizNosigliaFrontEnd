import Participant from "./Participant";

export default interface Appointment {
  _id: string;
  resourceType: "Appointment";
  status:
    | "proposed"
    | "pending"
    | "booked"
    | "arrived"
    | "fulfilled"
    | "cancelled"
    | "noshow";
  description: string;
  start: string;
  end: string;
  participant: Participant[];
}
