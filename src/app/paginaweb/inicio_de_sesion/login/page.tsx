"use client";
import React, { useState } from "react";
import Link from "next/link";
import CandadoIcon from "@/app/dashboard/components/Icons/CandadoIcon";
import PacienteIcon from "@/app/dashboard/components/Icons/PacienteIcon";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import Swal from "sweetalert2";
import Banner from "../../components/Banner";
import { signIn, signOut, useSession } from "next-auth/react";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { MdOutlineVisibilityOff, MdRemoveRedEye } from "react-icons/md";
import { routes } from "@/config/routes";
import { Button, Spinner } from "@chakra-ui/react";
import { getCaptchaToken } from "@/utils/captcha";

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [username, setnombreUsuario] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setisLoading(true);
      const token = await getCaptchaToken();
      const res = await signIn("credentials", {
        redirect: false,
        username: username,
        password: password,
        token: token,
      });
      if (res?.ok) {
        Swal.fire({
          title: "Éxito",
          text: `Bienvenido de nuevo`,
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#28a745",
        }).then((result) => {
          router.push(routes.login);
        });
      } else {
        mostrarAlertaError(res!.error!);
      }
    } catch (error: any) {
      mostrarAlertaError(error);
    } finally {
      setnombreUsuario("");
      setpassword("");
      setisLoading(false);
    }
  };
  return (
    <Layout>
      <main>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center ">
            <Banner />
            {status === "loading" ? (
              <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                <div className="flex w-full justify-center p-4 sm:p-12.5 xl:p-17.5">
                  <Spinner w={50} height={50} />
                </div>
              </div>
            ) : status === "authenticated" ? (
              <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                  <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                    ¡Bienvenido de nuevo!
                  </h2>
                  <p className="mb-6 text-black dark:text-white">
                    Ya estás autenticado en el sistema.
                  </p>
                  {session.user.rol.roleName === "Paciente" ? (
                    <Button
                      onClick={() => {
                        routes.paginawebcitas;
                      }}
                      width="full"
                      cursor="pointer"
                      rounded="lg"
                      height={14}
                      border="1px"
                      borderColor="orange.500"
                      bg="whiteAlpha.100"
                      p={4}
                      color="orange.400"
                      _hover={{
                        bg: "orange.400",
                        color: "white",
                        opacity: 0.9,
                      }}
                    >
                      Reservar una cita?
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        router.push(routes.dashboard);
                      }}
                      width="full"
                      cursor="pointer"
                      rounded="lg"
                      height={14}
                      border="1px"
                      borderColor="orange.500"
                      bg="whiteAlpha.100"
                      p={4}
                      color="orange.400"
                      _hover={{
                        bg: "orange.400",
                        color: "white",
                        opacity: 0.9,
                      }}
                    >
                      Ir al Dashboard
                    </Button>
                  )}
                  <Button
                    mt={4}
                    onClick={() => signOut()}
                    width="full"
                    cursor="pointer"
                    rounded="lg"
                    height={14}
                    border="1px"
                    borderColor="orange.500"
                    bg="orange.400"
                    p={4}
                    color="white"
                    _hover={{ bg: "orange.400", opacity: 0.9 }}
                  >
                    Cerrar sesión
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                  <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                    Iniciar sesión
                  </h2>

                  <form onSubmit={handleLogin}>
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
                          value={username}
                          onChange={(e: any) => {
                            setnombreUsuario(e.target.value);
                          }}
                          type="text"
                          placeholder="Ingresa tu nombre de usuario"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-6 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Contraseña
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-4">
                          <CandadoIcon />
                        </span>
                        <input
                          required
                          value={password}
                          onChange={(e: any) => {
                            setpassword(e.target.value);
                          }}
                          type={showPassword ? "text" : "password"}
                          placeholder="Ingresa tu contraseña"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-6 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <span
                          className="absolute right-4 top-4 cursor-pointer"
                          onClick={() => {
                            setShowPassword((prev) => !prev);
                          }}
                        >
                          {showPassword ? (
                            <MdRemoveRedEye size={24} color="orange" />
                          ) : (
                            <MdOutlineVisibilityOff size={24} color="gray" />
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="mb-5">
                      <Button
                        type="submit"
                        width="full"
                        cursor="pointer"
                        rounded="lg"
                        height={14}
                        isLoading={isLoading}
                        border="1px"
                        borderColor="orange.500"
                        bg="orange.400"
                        p={4}
                        color="white"
                        _hover={{ bg: "orange.400", opacity: 0.9 }}
                      >
                        Iniciar sesión
                      </Button>
                    </div>

                    <Link
                      href={routes.cambiopassword}
                      className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray-2 p-4 text-black hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                    >
                      Problemas para iniciar sesión?
                    </Link>

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
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
