"use client";
import React, { useState } from "react";
import Link from "next/link";
import CandadoIcon from "@/app/dashboard/components/Icons/CandadoIcon";
import PacienteIcon from "@/app/dashboard/components/Icons/PacienteIcon";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button, Text } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import { MdOutlineVisibilityOff, MdRemoveRedEye } from "react-icons/md";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { routes } from "@/config/routes";
import { changePassword } from "@/controller/paginaweb/inicio_de_sesion/cambioDePasswordController";
import { getCaptchaToken } from "@/utils/captcha";

export default function Editar() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [showpassword, setShowpassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [shownewpassword, setShownewpassword] = useState(false);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    const formData = new FormData(event.currentTarget);
    const token = await getCaptchaToken();
    const response = await changePassword(token, formData);
    if (!response.success) {
      if (response.message) {
        mostrarAlertaError(response.message);
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
        router.push(routes.login);
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
                      <span className="absolute left-4 top-4">
                        <CandadoIcon />
                      </span>
                      <input
                        required
                        type={showpassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña actual"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span
                        className="absolute right-4 top-4 cursor-pointer"
                        onClick={() => {
                          setShowpassword((prev) => !prev);
                        }}
                      >
                        {showpassword ? (
                          <MdRemoveRedEye size={24} color="orange" />
                        ) : (
                          <MdOutlineVisibilityOff size={24} color="gray" />
                        )}
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
                      <span className="absolute left-4 top-4">
                        <CandadoIcon />
                      </span>
                      <input
                        required
                        type={shownewpassword ? "text" : "password"}
                        name="newpassword"
                        placeholder="Ingresa tu contraseña"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span
                        className="absolute right-4 top-4 cursor-pointer"
                        onClick={() => {
                          setShownewpassword((prev) => !prev);
                        }}
                      >
                        {shownewpassword ? (
                          <MdRemoveRedEye size={24} color="orange" />
                        ) : (
                          <MdOutlineVisibilityOff size={24} color="gray" />
                        )}
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
                      <span className="absolute left-4 top-4">
                        <CandadoIcon />
                      </span>
                      <input
                        required
                        name="confirmnewpassword"
                        type={showConfirmNewPassword ? "text" : "password"}
                        placeholder="Ingresa tu contraseña"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span
                        className="absolute right-4 top-4 cursor-pointer"
                        onClick={() => {
                          setShowConfirmNewPassword((prev) => !prev);
                        }}
                      >
                        {showConfirmNewPassword ? (
                          <MdRemoveRedEye size={24} color="orange" />
                        ) : (
                          <MdOutlineVisibilityOff size={24} color="gray" />
                        )}
                      </span>
                    </div>
                    {errors.confirmnewpassword && (
                      <Text color="red.500">
                        {errors.confirmnewpassword._errors.join(", ")}
                      </Text>
                    )}
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
                      Confirmar
                    </Button>
                  </div>

                  <Link
                    href={routes.olvidarpassword}
                    className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray-2 p-4 text-black hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                  >
                    Olvidaste tu contraseña?
                  </Link>

                  <div className="mt-6 text-center">
                    <p className="text-black">
                      No tienes una cuenta?{" "}
                      <Link
                        href="/paginaweb/registro"
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
