"use client";
import "../../assets/css/animate.css";
import "../../assets/css/LineIcons.css";
import "../../assets/css/main.css";
import "../../assets/css/tiny-slider.css";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import CancelIcon from "@/app/dashboard/components/Icons/CancelIcon";
import InfoIcon from "@/app/dashboard/components/Icons/InfoIcon";
import CheckIcon from "@/app/dashboard/components/Icons/CheckIcon";

export default function Citas() {
  const [motivo, setMotivo] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [doctor, setDoctor] = useState("");
  const doctores = [
    {
      nombre: "Ortiz",
    },
    {
      nombre: "Mendoza",
    },
    {
      nombre: "Perez",
    },
  ];
  const [eventos, setEventos] = useState<any[]>([
    {
      id: "1",
      title: "Extracción de muelas",
      start: "2024-09-10T10:00:00",
      end: "2024-09-10T11:00:00",
      paciente: "Martin García",
      doctor: "Ortiz",
    },
    {
      id: "2",
      title: "Revisión Dental",
      start: "2024-09-16T12:00:00",
      end: "2024-09-16T13:00:00",
      paciente: "Juan Pérez",
      doctor: "Ortiz",
    },
    {
      id: "3",
      title: "Control de Salud",
      start: "2024-09-16T14:00:00",
      end: "2024-09-16T15:00:00",
      paciente: "Camilo Mendoza",
      doctor: "Ortiz",
    },
  ]);
  function convertDate(fecha: any) {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  function convertTime(fecha: any) {
    const hora = new Date(fecha).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return hora;
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const motivo = e.target[0].value;
    const fechaHora = e.target[1].value;
    const doctor = e.target[2].value;
    const fecha = convertDate(fechaHora);
    const hora = convertTime(fechaHora);
    Swal.fire({
      title: "Esta seguro?",
      text: `¿Quiere reservar una cita el día ${fecha} a las ${hora}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const nuevoEvento = {
          id: (eventos.length + 1).toString(),
          title: motivo,
          start: fechaHora,
          end: new Date(
            new Date(fechaHora).getTime() + 60 * 60 * 1000,
          ).toISOString(), // +1 hora
          paciente: "Nombre del paciente", // Puedes agregar lógica para esto
          doctor: doctor,
        };

        setEventos([...eventos, nuevoEvento]);
        setMotivo("");
        setFechaHora("");
        setDoctor("");
        Swal.fire({
          title: "Cita registrada",
          text: `La cita con el doctor ${doctor} ha sido registrada para el ${fecha} a las ${hora}.`,
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#28a745",
        });
      }
    });
  };
  const handleCancelacion = (eventoId: string) => {
    Swal.fire({
      title: "Confirmación",
      text: "¿Está seguro que quiere cancelar la cita?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setEventos(eventos.filter((evento) => evento.id !== eventoId));
        Swal.fire({
          title: "Cita cancelada",
          text: "La cita ha sido cancelada con éxito",
          icon: "success",
          confirmButtonColor: "#28a745",
        });
      }
    });
  };
  const handleShowInformacion = (eventoId: string) => {
    const cita = eventos.find((e) => e.id == eventoId);
    const fecha = convertDate(cita.start);
    const hora = convertTime(cita.start);
    const doctor = cita.doctor;
    Swal.fire({
      title: "Información de la cita",
      text: `La cita con el doctor ${doctor} ha sido registrada para el ${fecha} a las ${hora}`,
      icon: "info",
      confirmButtonColor: "#28a745",
    });
  };
  const fechaActual = new Date().toISOString().slice(0, 16);
  return (
    <>
      <Header />
      <main>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center ">
            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                {eventos.length > 0 ? (
                  <>
                    <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                      Citas pendientes
                    </h2>
                    <div className="flex cursor-pointer flex-col gap-4">
                      {eventos.map((evento, key) => (
                        <div
                          key={key}
                          className="relative flex flex-row bg-orange-400 p-4 shadow-lg transition-all hover:shadow-2xl"
                        >
                          <div className="w-203">
                            <p className="text-white">
                              <b>Fecha:</b>
                              {` ${evento.start ? convertDate(evento.start) : ""}`}
                            </p>
                            <p className="text-white">
                              <b>Hora:</b> de{" "}
                              {evento.start ? convertTime(evento.start) : ""} a{" "}
                              {evento.end ? convertTime(evento.end) : ""}
                            </p>
                            <p className="text-white">
                              <b>Motivo:</b> {evento.title}
                            </p>
                            <p className="text-white">
                              <b>Doctor:</b> {evento.doctor}
                            </p>
                          </div>
                          <div className="flex w-full items-center justify-end gap-4 text-white">
                            <div
                              onClick={() => handleCancelacion(evento.id)}
                              className="transition-all hover:drop-shadow-lg"
                            >
                              <CancelIcon />
                            </div>
                            <div
                              onClick={() => {
                                handleShowInformacion(evento.id);
                              }}
                              className="transition-all hover:drop-shadow-lg"
                            >
                              <InfoIcon />
                            </div>{" "}
                          </div>
                        </div>
                      ))}
                    </div>{" "}
                  </>
                ) : (
                  <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                    No se encontraron citas pendientes
                  </h2>
                )}
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Crear una cita
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Motivo de la cita
                    </label>
                    <div className="relative">
                      <textarea
                        required
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        placeholder="Describa brevemente el motivo de su consulta"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Fecha y hora
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="datetime-local"
                        value={fechaHora}
                        onChange={(e) => setFechaHora(e.target.value)}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-3 text-black outline-none focus:border-orange-500 dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Doctor
                    </label>
                    <div className="relative">
                      <select
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <option value="" disabled>
                          Seleccione un doctor
                        </option>
                        {doctores.map((doctor, key) => (
                          <option key={key} value={doctor.nombre}>
                            {doctor.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Registrar cita"
                      className="w-full cursor-pointer rounded-lg border border-orange-500 bg-orange-400 p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <a
        href="#"
        className="fixed bottom-[30px] right-[30px] z-[9] h-[45px] w-[45px] cursor-pointer rounded-[5px] bg-orange-400 text-center text-[20px] leading-[45px] text-white transition-all duration-300 ease-out hover:bg-[#00adb5b3] hover:text-white"
      >
        <i className="lni lni-arrow-up"></i>
      </a>
    </>
  );
}
