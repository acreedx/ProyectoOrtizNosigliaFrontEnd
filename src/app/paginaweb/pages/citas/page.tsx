"use client";
import "../../assets/css/animate.css";
import "../../assets/css/LineIcons.css";
import "../../assets/css/main.css";
import "../../assets/css/tiny-slider.css";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import CancelIcon from "@/app/dashboard/components/Icons/CancelIcon";
import InfoIcon from "@/app/dashboard/components/Icons/InfoIcon";
import CheckIcon from "@/app/dashboard/components/Icons/CheckIcon";
import { AppointmentService } from "@/app/repositories/appointment";
import Appointment from "@/app/interfaces/Appointment";
import { title } from "process";
import { start } from "repl";
import useUser from "@/hooks/useUser";
import LoadingMessage from "@/app/dashboard/components/LoadingMessage";
import CheckSmallIcon from "@/app/dashboard/components/Icons/CheckSmallIcon";

export default function Citas() {
  const { user, loading, error } = useUser();
  const [loadingData, setloadingData] = useState(true);
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
  const [citasConf, setcitasConf] = useState<Appointment[]>([]);
  const [citasCancel, setcitasCancel] = useState<Appointment[]>([]);
  const [citasPend, setcitasPend] = useState<Appointment[]>([]);
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
  const handleSubmit = async (e: any) => {
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
        const cita: Appointment = {
          _id: "",
          resourceType: "Appointment",
          status: "booked",
          description: motivo,
          start: fechaHora,
          end: new Date(
            new Date(fechaHora).getTime() + 60 * 60 * 1000,
          ).toISOString(),
          participant: [
            {
              actor: { reference: user?._id, display: user?.nombreUsuario },
              status: "accepted",
            },
            {
              actor: { reference: doctor, display: doctor },
              status: "accepted",
            },
          ],
        };
        const citaRegistrada: Appointment =
          await AppointmentService.createAppointment(cita);
        setcitasPend([...citasPend, citaRegistrada]);
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
        await AppointmentService.cancelAppointment(eventoId);
        setloadingData(true);
        await citasPendientes();
        await citasConfirmadas();
        await citasCanceladas();
        setloadingData(false);
        Swal.fire({
          title: "Cita cancelada",
          text: "La cita ha sido cancelada con éxito",
          icon: "success",
          confirmButtonColor: "#28a745",
        });
      }
    });
  };
  const handleConfirmacion = (eventoId: string) => {
    Swal.fire({
      title: "Confirmación",
      text: "¿Quiere confirmar la cita?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await AppointmentService.confirmAppointment(eventoId);
        setloadingData(true);
        await citasPendientes();
        await citasConfirmadas();
        await citasCanceladas();
        setloadingData(false);
        Swal.fire({
          title: "Cita confirmada",
          text: "La cita ha sido confirmada con éxito",
          icon: "success",
          confirmButtonColor: "#28a745",
        });
      }
    });
  };
  const handleShowInformacionCanceled = async (eventoId: string) => {
    const cita = citasCancel.find((e) => e._id == eventoId);
    const fecha = convertDate(cita?.start);
    const hora = convertTime(cita?.start);
    const doctor = cita?.participant[1].actor.display;
    Swal.fire({
      title: "Información de la cita",
      text: `La cita con el doctor ${doctor} ha sido registrada para el ${fecha} a las ${hora}`,
      icon: "info",
      confirmButtonColor: "#28a745",
    });
  };
  const handleShowInformacionPending = async (eventoId: string) => {
    const cita = citasPend.find((e) => e._id == eventoId);
    const fecha = convertDate(cita?.start);
    const hora = convertTime(cita?.start);
    const doctor = cita?.participant[1].actor.display;
    Swal.fire({
      title: "Información de la cita",
      text: `La cita con el doctor ${doctor} ha sido registrada para el ${fecha} a las ${hora}`,
      icon: "info",
      confirmButtonColor: "#28a745",
    });
  };
  const handleShowInformacionConfirmed = async (eventoId: string) => {
    const cita = citasConf.find((e) => e._id == eventoId);
    const fecha = convertDate(cita?.start);
    const hora = convertTime(cita?.start);
    const doctor = cita?.participant[1].actor.display;
    Swal.fire({
      title: "Información de la cita",
      text: `La cita con el doctor ${doctor} ha sido registrada para el ${fecha} a las ${hora}`,
      icon: "info",
      confirmButtonColor: "#28a745",
    });
  };
  const citasConfirmadas = async () => {
    setcitasConf(await AppointmentService.getActiveAppointments());
  };
  const citasCanceladas = async () => {
    setcitasCancel(await AppointmentService.getCanceledAppointments());
  };
  const citasPendientes = async () => {
    setcitasPend(await AppointmentService.getPendingAppointments());
  };
  useEffect(() => {
    citasConfirmadas();
    citasCanceladas();
    citasPendientes();
    setloadingData(false);
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col flex-wrap items-center">
            <div className="w-full ">
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
            <div className="mb-4 flex flex-col gap-4">
              <div className="">
                {loadingData ? (
                  <LoadingMessage />
                ) : (
                  <>
                    {citasPend.length > 0 ? (
                      <>
                        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                          Citas pendientes
                        </h2>
                        <div className="flex cursor-pointer flex-col gap-4">
                          {citasPend.map((cita, key) => (
                            <div
                              key={key}
                              className="relative flex flex-row bg-orange-400 p-4 shadow-lg transition-all hover:shadow-2xl"
                            >
                              <div className="w-203">
                                <p className="text-white">
                                  <b>Fecha:</b>
                                  {` ${cita.start ? convertDate(cita.start) : ""}`}
                                </p>
                                <p className="text-white">
                                  <b>Hora:</b> de{" "}
                                  {cita.start ? convertTime(cita.start) : ""} a{" "}
                                  {cita.end ? convertTime(cita.end) : ""}
                                </p>
                                <p className="text-white">
                                  <b>Motivo:</b> {cita.description}
                                </p>
                                <p className="text-white">
                                  <b>Doctor:</b>{" "}
                                  {cita.participant[1].actor.display}
                                </p>
                              </div>
                              <div className="flex w-full items-center justify-end gap-4 text-white">
                                <div
                                  onClick={() => handleConfirmacion(cita._id)}
                                  className="transition-all hover:drop-shadow-lg"
                                >
                                  <CheckSmallIcon />
                                </div>
                                <div
                                  onClick={() => handleCancelacion(cita._id)}
                                  className="transition-all hover:drop-shadow-lg"
                                >
                                  <CancelIcon />
                                </div>
                                <div
                                  onClick={() => {
                                    handleShowInformacionPending(cita._id);
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
                  </>
                )}
              </div>
              <div className="">
                {loadingData ? (
                  <LoadingMessage />
                ) : (
                  <>
                    {citasConf.length > 0 ? (
                      <>
                        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                          Citas confirmadas
                        </h2>
                        <div className="flex cursor-pointer flex-col gap-4">
                          {citasConf.map((cita, key) => (
                            <div
                              key={key}
                              className="relative flex flex-row bg-orange-400 p-4 shadow-lg transition-all hover:shadow-2xl"
                            >
                              <div className="w-203">
                                <p className="text-white">
                                  <b>Fecha:</b>
                                  {` ${cita.start ? convertDate(cita.start) : ""}`}
                                </p>
                                <p className="text-white">
                                  <b>Hora:</b> de{" "}
                                  {cita.start ? convertTime(cita.start) : ""} a{" "}
                                  {cita.end ? convertTime(cita.end) : ""}
                                </p>
                                <p className="text-white">
                                  <b>Motivo:</b> {cita.description}
                                </p>
                                <p className="text-white">
                                  <b>Doctor:</b>{" "}
                                  {cita.participant[1].actor.display}
                                </p>
                              </div>
                              <div className="flex w-full items-center justify-end gap-4 text-white">
                                <div
                                  onClick={() => handleCancelacion(cita._id)}
                                  className="transition-all hover:drop-shadow-lg"
                                >
                                  <CancelIcon />
                                </div>
                                <div
                                  onClick={() => {
                                    handleShowInformacionConfirmed(cita._id);
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
                        No se encontraron citas confirmadas
                      </h2>
                    )}
                  </>
                )}
              </div>
              <div className="">
                {loadingData ? (
                  <LoadingMessage />
                ) : (
                  <>
                    {citasCancel.length > 0 ? (
                      <>
                        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                          Citas canceladas
                        </h2>
                        <div className="flex cursor-pointer flex-col gap-4">
                          {citasCancel.map((cita, key) => (
                            <div
                              key={key}
                              className="relative flex flex-row bg-orange-400 p-4 shadow-lg transition-all hover:shadow-2xl"
                            >
                              <div className="w-203">
                                <p className="text-white">
                                  <b>Fecha:</b>
                                  {` ${cita.start ? convertDate(cita.start) : ""}`}
                                </p>
                                <p className="text-white">
                                  <b>Hora:</b> de{" "}
                                  {cita.start ? convertTime(cita.start) : ""} a{" "}
                                  {cita.end ? convertTime(cita.end) : ""}
                                </p>
                                <p className="text-white">
                                  <b>Motivo:</b> {cita.description}
                                </p>
                                <p className="text-white">
                                  <b>Doctor:</b>{" "}
                                  {cita.participant[1].actor.display}
                                </p>
                              </div>
                              <div className="flex w-full items-center justify-end gap-4 text-white">
                                <div
                                  onClick={() => {
                                    handleShowInformacionCanceled(cita._id);
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
                        No se encontraron citas canceladas
                      </h2>
                    )}
                  </>
                )}
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
