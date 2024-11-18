"use client";
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
interface patient {
  _id: string;
  fotoDePerfil: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  primerNombre: string;
  segundoNombre: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  sexo: string;
  carnetIdentidad: string;
  direccionZona: string;
  telefono: string;
  celular: string;
  email: string;
  alergiaMedicamento: string;
  estado: Boolean;
}
const TablePatients = () => {
  const [personalData, setpersonalData] = useState<patient[]>([]);
  const [loading, setloading] = useState<Boolean>(true);
  const deletePatient = async (id: string) => {
    Swal.fire({
      title: "Advertencia",
      text: "Estas seguro de inhabilitar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, hazlo!",
      cancelButtonText: "No, cancelar",
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = "" + "person/deletepatient/" + id;
        const response = await fetch(url);
        if (!response.ok) {
          const error = await response.json();
          throw new Error("Error al listar los pacientes: " + error);
        }
        const data = await response.json();
        Swal.fire({
          title: "Éxito",
          text: "Usuario inhabilitado",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#28a745",
        }).then(async () => {
          fectchPatients();
        });
      }
    });
  };
  const restorePatient = async (id: string) => {
    Swal.fire({
      title: "Advertencia",
      text: "Estas seguro de rehabilitar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, hazlo!",
      cancelButtonText: "No, cancelar",
      confirmButtonColor: "#28a745", // Verde
      cancelButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = "" + "person/restorepatient/" + id;
        const response = await fetch(url);
        if (!response.ok) {
          const error = await response.json();
          throw new Error("Error al listar los pacientes: " + error);
        }
        const data = await response.json();
        Swal.fire({
          title: "Éxito",
          text: "Usuario rehabilitado",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#28a745",
        }).then(async () => {
          fectchPatients();
        });
      }
    });
  };
  async function fectchPatients() {
    setloading(true);
    const url = "" + "person";
    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw new Error("Error al listar los usuarios: " + error);
    }
    const data = await response.json();
    setpersonalData(data);
    setloading(false);
  }
  useEffect(() => {
    fectchPatients();
  }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white px-1 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark  xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {loading ? (
          <LoadingMessage />
        ) : personalData.length == 0 ? (
          <h1 className="mb-6">No se encontraron pacientes</h1>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 font-medium text-black dark:text-white xl:pl-11">
                  Nro
                </th>
                <th className="py-4 font-medium text-black dark:text-white xl:pl-11">
                  Foto de perfil
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Apellido Paterno
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Apellido Materno
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Primer Nombre
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Fecha de Nacimiento
                </th>
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                  Sexo
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Carnet de Identidad
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {personalData.map((person, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {key + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <Image
                      width={50}
                      height={50}
                      className="max-h-[50px] max-w-[50px]"
                      src={person.fotoDePerfil}
                      alt={`Foto de perfil del paciente ${person.primerNombre}`}
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {person.apellidoPaterno}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {person.apellidoMaterno}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {person.primerNombre}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {person.fechaNacimiento}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{person.sexo}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {person.carnetIdentidad}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        title="Editar Paciente"
                        className="hover:text-primary"
                      >
                        <Link
                          href={`/dashboard/pacientes/${encodeURIComponent(person._id)}`}
                        >
                          <OptionsIcon />
                        </Link>
                      </button>
                      {!person.estado ? (
                        <button
                          title="Rehabilitar Paciente"
                          className="hover:text-primary"
                          onClick={async () => {
                            restorePatient(person._id);
                          }}
                        >
                          <RestoreIcon />
                        </button>
                      ) : (
                        <button
                          title="Inhabilitar Paciente"
                          className="hover:text-primary"
                          onClick={async () => {
                            deletePatient(person._id);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      )}
                      <button
                        title="Odontograma"
                        className="hover:text-primary"
                      >
                        <Link
                          href={`/dashboard/pacientes/odontograma/${encodeURIComponent(person._id)}`}
                        >
                          <OdontogramaIcon />
                        </Link>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TablePatients;
