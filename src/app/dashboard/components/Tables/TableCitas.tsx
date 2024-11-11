"use client";
import { localDomain } from "@/types/domain";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingMessage from "../Common/LoadingMessage";
import RestoreIcon from "../Icons/RestoreIcon";
import OdontogramaIcon from "../Icons/OdontogramaIcon";
import OptionsIcon from "../Icons/OptionsIcon";
import DeleteIcon from "../Icons/DeleteIcon";
const TableCitas = () => {
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
  const [loading, setloading] = useState<Boolean>(true);
  function convertDate(fecha: any) {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  function convertTime(fecha: any) {
    return new Date(fecha).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-1 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark  xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 font-medium text-black dark:text-white xl:pl-11">
                Número
              </th>
              <th className="py-4 font-medium text-black dark:text-white xl:pl-11">
                Descripción
              </th>
              <th className="py-4 font-medium text-black dark:text-white xl:pl-11">
                Fecha
              </th>
              <th className="py-4 font-medium text-black dark:text-white xl:pl-11">
                Hora
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Paciente
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Doctor
              </th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {key + 1}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {evento.title}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {convertDate(evento.start)}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    De {convertTime(evento.start)} a {convertTime(evento.end)}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {evento.paciente}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{evento.doctor}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCitas;
