import React from "react";

export default function FormularioCitas() {
  const personas = [
    { id: 1, nombre: "Paciente García" },
    { id: 2, nombre: "Paciente Pérez" },
    { id: 3, nombre: "Paciente Juan" },
  ];
  return (
    <div>
      <label htmlFor="motivo">Motivo de la cita:</label>
      <input
        id="motivo"
        className="swal2-input"
        placeholder="Motivo de la cita"
      />
      <br />
      <label htmlFor="persona">Elige a una persona:</label>
      <select id="persona" className="swal2-input">
        $
        {personas
          .map(
            (persona) =>
              `<option value="${persona.nombre}">${persona.nombre}</option>`,
          )
          .join("")}
      </select>
    </div>
  );
}
