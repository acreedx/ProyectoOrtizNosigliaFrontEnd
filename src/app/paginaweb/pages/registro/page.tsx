"use client";
import PersoNavBar from "@/app/paginaweb/components/NavBar";
import "../../assets/css/animate.css";
import "../../assets/css/LineIcons.css";
import "../../assets/css/main.css";
import "../../assets/css/tiny-slider.css";
import React, { useEffect, useState } from "react";
import SelectGroupOne from "@/app/dashboard/components/SelectGroup/SelectGroupOne";
import { localDomain } from "@/types/domain";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Registro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    apellidoPaterno: "",
    apellidoMaterno: "",
    primerNombre: "",
    segundoNombre: "",
    fechaNacimiento: "",
    lugarNacimiento: "",
    sexo: "",
    carnetIdentidad: "",
    direccionZona: "",
    telefono: "",
    celular: "",
    email: "",
    alergiaMedicamento: "",
    estado: true,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = localDomain + "person";
    console.log(JSON.stringify(formData));
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error("Error al crear al paciente: " + error.message);
    }
    const data = await response.json();
    // Aquí puedes enviar los datos a tu backend o realizar alguna otra acción
    Swal.fire({
      title: "Éxito",
      text: "Bienvenido al centro Ortiz Nosiliga " + data.primerNombre,
      icon: "success",
      confirmButtonText: "Continuar al listado",
      confirmButtonColor: "#28a745",
    }).then((result) => {
      router.push("/dashboard/pacientes");
    });
  };

  return (
    <>
      <PersoNavBar />
      <div className="mx-12 my-4  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <h3 className="my-10 flex w-full justify-center font-medium text-black dark:text-white">
          Formulario de registro
        </h3>
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
          </div>
          <div className="flex flex-row gap-5.5 p-6.5">
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
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
          </div>
          <div className="flex flex-row gap-5.5 p-6.5">
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
          </div>
          <div className="flex flex-row gap-5.5 p-6.5">
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
          <button
            className="flex w-56 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
