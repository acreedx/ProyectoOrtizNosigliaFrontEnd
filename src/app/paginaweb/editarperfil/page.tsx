"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CandadoIcon from "@/app/dashboard/components/Icons/CandadoIcon";
import PacienteIcon from "@/app/dashboard/components/Icons/PacienteIcon";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button, Spinner, Text } from "@chakra-ui/react";
import { changePassword } from "@/app/api/pages/serveractions/changePassword";
import Layout from "../components/Layout";
import Banner from "../components/Banner";

export default function Editar() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el loading
  const [errors, setErrors] = useState<any>({}); // Estado para los errores de validación

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    const formData = new FormData(event.currentTarget);
    const response = await changePassword(formData);
    if (!response.success) {
      if (response.message) {
        Swal.fire({
          title: "Error",
          text: response.message,
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#28a745",
        });
      } else {
        setErrors(response.errors);
      }
    } else {
      Swal.fire({
        title: "Éxito",
        text: "La contraseña se cambio exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#28a745",
      }).then(() => {
        router.push("/paginaweb/pages/login");
      });
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <main>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center ">
            <Banner />
            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Cambio de contraseña
                </h2>

                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Usuario
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="username"
                        placeholder="Ingresa tu nombre de usuario"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span className="absolute right-4 top-4">
                        <PacienteIcon />
                      </span>
                    </div>
                    {errors.username && (
                      <Text color="red.500">
                        {errors.username._errors.join(", ")}
                      </Text>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Ingresa tu contraseña actual
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="password"
                        name="password"
                        placeholder="Contraseña actual"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <CandadoIcon />
                      </span>
                    </div>
                    {errors.password && (
                      <Text color="red.500">
                        {errors.password._errors.join(", ")}
                      </Text>
                    )}
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nueva contraseña
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="password"
                        name="newpassword"
                        placeholder="Ingresa tu contraseña"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <CandadoIcon />
                      </span>
                    </div>
                    {errors.newpassword && (
                      <Text color="red.500">
                        {errors.newpassword._errors.join(", ")}
                      </Text>
                    )}
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Confirma tu nueva contraseña
                    </label>
                    <div className="relative">
                      <input
                        required
                        name="confirmnewpassword"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span className="absolute right-4 top-4">
                        <CandadoIcon />
                      </span>
                    </div>
                    {errors.confirmnewpassword && (
                      <Text color="red.500">
                        {errors.confirmnewpassword._errors.join(", ")}
                      </Text>
                    )}
                  </div>
                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Iniciar sesión"
                      disabled={isLoading}
                      className="w-full cursor-pointer rounded-lg border border-orange-500 bg-orange-400 p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>
                  <Link
                    href={"/paginaweb/pages/olvidarpassword"}
                    className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray-2 p-4 text-black hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                  >
                    Olvidaste tu contraseña?
                  </Link>
                  <div className="mt-6 text-center">
                    <p className="text-black">
                      No tienes una cuenta?{" "}
                      <Link
                        href="/auth/signup"
                        className="text-orange-400 hover:text-orange-500"
                      >
                        Registrate
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
