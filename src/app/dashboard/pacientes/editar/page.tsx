"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/Switchers/SwitcherFour";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MultiSelect from "@/components/FormElements/MultiSelect";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import TablePatients from "@/components/Tables/TablePatients";
export default function Pacientes() {
  const personalData = {
    apellidoPaterno: "Pérez",
    apellidoMaterno: "González",
    primerNombre: "Juan",
    segundoNombre: "Carlos",
    fechaNacimiento: "15/08/1990",
    lugarNacimiento: "La Paz",
    sexo: "Masculino",
    carnetIdentidad: "12345678",
    direccionZona: "Zona Sur",
    telefono: "1234567",
    celular: "76543210",
    email: "juan@example.com",
    alergiaMedicamento: "No",
  };
  const [formData, setFormData] = useState({
    fechaFiliacion: "",
    apellidoPaterno: personalData.apellidoPaterno,
    apellidoMaterno: personalData.apellidoMaterno,
    primerNombre: personalData.primerNombre,
    segundoNombre: personalData.segundoNombre,
    fechaNacimiento: personalData.fechaNacimiento,
    lugarNacimiento: personalData.lugarNacimiento,
    sexo: personalData.sexo,
    carnetIdentidad: personalData.carnetIdentidad,
    direccionZona: personalData.direccionZona,
    telefono: personalData.telefono,
    celular: personalData.celular,
    email: personalData.email,
    referidoPor: "",
    motivoConsulta: "",
    alergiaMedicamento: personalData.alergiaMedicamento,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    // Aquí puedes enviar los datos a tu backend o realizar alguna otra acción
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Editar pacientes" />
      <div className="mx-12 my-4  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <h3 className="my-10 flex w-full justify-center font-medium text-black dark:text-white">
          Editar Paciente
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
    </DefaultLayout>
  );
}
