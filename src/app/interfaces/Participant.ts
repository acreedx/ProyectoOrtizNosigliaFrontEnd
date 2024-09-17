export default interface Participant {
  actor: {
    reference: string; // Ejemplo: "Patient/123" o "Practitioner/456"
    display: string; // Ejemplo: "John Doe" o "Dr. Smith"
  };
  status: "accepted" | "declined" | "tentative" | "needs-action";
}
