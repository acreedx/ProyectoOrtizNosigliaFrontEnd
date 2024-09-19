"use client";
import PersoNavBar from "@/app/paginaweb/components/NavBar";
import "../../assets/css/animate.css";
import "../../assets/css/LineIcons.css";
import "../../assets/css/main.css";
import "../../assets/css/tiny-slider.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import SelectGroupOne from "@/app/dashboard/components/SelectGroup/SelectGroupOne";
import { localDomain } from "@/types/domain";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../firebase.config.js";
import Image from "next/image";

interface FileWithPreview extends File {
  preview?: string;
}

export default function Registro() {
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();
  const [confirmPassword, setconfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    fotoDePerfil: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    primerNombre: "",
    segundoNombre: "",
    nombreUsuario: "",
    password: "",
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0] as FileWithPreview;
      selectedImage.preview = URL.createObjectURL(selectedImage);
      setImage(selectedImage);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const storageRef = await ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgress(progress);
      },
      (error) => {
        console.error("Error al subir la imagen: ", error);
        setImage(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            ["fotoDePerfil"]: downloadURL,
          });
        });
      },
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (confirmPassword != formData.password) {
      Swal.fire({
        title: "Error",
        text: "El password debe ser igual a la confirmacion",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      });
      return;
    }
    if (image) {
      await handleUpload();
    } else {
      setFormData({
        ...formData,
        ["fotoDePerfil"]:
          "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
      });
    }
    const url = localDomain + "person";
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
            <div className="">
              <label className="flex flex-col  content-center items-center justify-center gap-4 text-sm font-medium ">
                <p className="text-black dark:text-white ">Imagen</p>
                {image ? (
                  <Image
                    src={image!.preview!}
                    alt="Previsualizacion imagen"
                    width={250}
                    height={250}
                    className="max-h-[250px]"
                  />
                ) : (
                  <Image
                    src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    alt="Imagen por defecto"
                    height={250}
                    width={250}
                    className="max-h-[250px]"
                  />
                )}
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="file"
                  name="fotoDePerfil"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
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
                Nombre de usuario:
              </label>
              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="text"
                name="nombreUsuario"
                value={formData.nombreUsuario}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Password:
              </label>
              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Confirmar Password:
              </label>
              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value);
                }}
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
