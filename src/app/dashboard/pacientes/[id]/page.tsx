"use client";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/app/dashboard/components/Breadcrumbs/Breadcrumb";
import { useRouter } from "next/navigation";
import { localDomain } from "@/types/domain";
import Swal from "sweetalert2";
import Link from "next/link";
import BotonVolver from "../../components/BotonVolver";

interface patient {
  _id: String;
  apellidoPaterno: String;
  apellidoMaterno: String;
  primerNombre: String;
  segundoNombre: String;
  fechaNacimiento: String;
  lugarNacimiento: String;
  sexo: String;
  carnetIdentidad: String;
  direccionZona: String;
  telefono: String;
  celular: String;
  email: String;
  alergiaMedicamento: String;
}
export default function Pacientes({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    fechaFiliacion: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    primerNombre: "",
    segundoNombre: "",
    fechaNacimiento: "00/00/0000",
    lugarNacimiento: "",
    sexo: "",
    carnetIdentidad: "",
    direccionZona: "",
    telefono: "",
    celular: "",
    email: "",
    referidoPor: "",
    motivoConsulta: "",
    alergiaMedicamento: "",
  });
  useEffect(() => {
    const url = localDomain + "person/" + params.id;
    console.log(url);
    async function fectchPatient() {
      setloading(true);
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        const error = await response.json();
        throw new Error("Error al listar al paciente: " + error);
      }
      const data = await response.json();
      setFormData(data);
      console.log(data);
      setloading(false);
    }
    fectchPatient();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = localDomain + "person/" + params.id;
    console.log("Datos del formulario:", formData);
    // Aquí puedes enviar los datos a tu backend o realizar alguna otra acción
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error("Error al listar al paciente: " + error);
    }
    const data = await response.json();
    Swal.fire({
      title: "Éxito",
      text: "Paciente editado correctamente",
      icon: "success",
      confirmButtonText: "Volver al listado",
      confirmButtonColor: "#28a745",
    }).then((result) => {
      router.push("/dashboard/pacientes");
    });
  };
  return (
    <DefaultLayout>
      <BotonVolver direccion="/dashboard/pacientes" />
      <Breadcrumb pageName="Editar paciente" />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="mx-12 my-4  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center p-10 pt-0"
          >
            <div className="flex flex-row gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Apellido Paterno:
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="apellidoPaterno"
                  value={formData.apellidoPaterno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Apellido Materno:
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="apellidoMaterno"
                  value={formData.apellidoMaterno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Primer Nombre:
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="primerNombre"
                  value={formData.primerNombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Segundo Nombre:
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="segundoNombre"
                  value={formData.segundoNombre}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-row gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Fecha de Nacimiento:
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Lugar de Nacimiento:
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="lugarNacimiento"
                  value={formData.lugarNacimiento}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Sexo:
                </label>
                <select
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Carnet de Identidad:
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="carnetIdentidad"
                  value={formData.carnetIdentidad}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-row gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Dirección/Zona:
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="direccionZona"
                  value={formData.direccionZona}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Teléfono:
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Celular:
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="tel"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-row gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Email:
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Alergia a algún medicamento:
                </label>
                <textarea
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="alergiaMedicamento"
                  rows={4}
                  value={formData.alergiaMedicamento}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="flex w-56 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      )}
    </DefaultLayout>
  );
}
