"use client";
import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import PacienteIcon from "@/app/dashboard/components/Icons/PacienteIcon";
import { Button, EmailIcon } from "@chakra-ui/icons";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { routes } from "@/config/routes";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import { forgetPassword } from "@/controller/paginaweb/inicio_de_sesion/olvidarPasswordController";
import { mostrarAlertaConfirmacion } from "@/utils/show_question_alert";
import { getCaptchaToken } from "@/utils/captcha";

export default function OlvidarPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const isConfirmed = await mostrarAlertaConfirmacion(
      "Confirmación",
      "Al confirmar se enviara una nueva contraseña a tu correo electrónico",
    );
    if (isConfirmed) {
      try {
        setIsLoading(true);
        setErrors({});
        const token = await getCaptchaToken();
        const response = await forgetPassword(token, formData);
        if (response.success) {
          Swal.fire({
            title: "Éxito",
            text: "La contraseña se cambio exitosamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#28a745",
          }).then(() => {
            router.push(routes.login);
          });
        } else {
          if (response.message) {
            mostrarAlertaError(response.message);
          }
        }
      } catch (e: any) {
        mostrarAlertaError(e);
      } finally {
        setIsLoading(false);
      }
    }
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
                      <span className="absolute left-4 top-4">
                        <PacienteIcon />
                      </span>
                      <input
                        required
                        type="text"
                        name="username"
                        placeholder="Ingresa tu nombre de usuario"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Ingresa tu correo registrado
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-4">
                        <EmailIcon />
                      </span>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Ingresa tu correo registrado"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      width="full"
                      cursor="pointer"
                      rounded="lg"
                      height={14}
                      border="1px"
                      borderColor="orange.500"
                      bg="orange.400"
                      p={4}
                      color="white"
                      _hover={{
                        opacity: 0.9,
                      }}
                    >
                      Reestablecer Contraseña
                    </Button>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-black">
                      No tienes una cuenta?{" "}
                      <Link
                        href={routes.registro}
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
