"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import Link from "next/link";
import Swal from "sweetalert2";
import { forgetPassword } from "@/app/serveractions/forgetPassword";
import { useRouter } from "next/navigation";
import PacienteIcon from "@/app/dashboard/components/Icons/PacienteIcon";
import { Text } from "@chakra-ui/react";
import CandadoIcon from "@/app/dashboard/components/Icons/CandadoIcon";
import { EmailIcon } from "@chakra-ui/icons";

export default function OlvidarPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el loading
  const [errors, setErrors] = useState<any>({}); // Estado para los errores de validación

  const [showPassword, setShowPassword] = useState(false);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    Swal.fire({
      title: "Confirmación",
      text: "Al confirmar se enviara una nueva contraseña a tu correo electrónico",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#a72828",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#28a745",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        setErrors({});
        const response = await forgetPassword(formData);
        if (!response.success) {
          if (response.message) {
            Swal.fire({
              title: "Error",
              text: response.message,
              icon: "question",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#28a745",
            });
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
      }
    });
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
                  Olvidaste tu Password?
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
                  </div>

                  <div className="mb-6">
                    {" "}
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Ingresa tu correo registrado
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Ingresa tu correo registrado"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span
                        className="absolute right-4 top-4"
                        onClick={() => {
                          setShowPassword((prev) => !prev);
                        }}
                      >
                        <EmailIcon />
                      </span>
                    </div>
                  </div>
                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Reestablecer password"
                      disabled={isLoading}
                      className="w-full cursor-pointer rounded-lg border border-orange-500 bg-orange-400 p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>

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
