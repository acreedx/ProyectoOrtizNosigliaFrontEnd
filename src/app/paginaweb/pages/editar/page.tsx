"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CandadoIcon from "@/app/dashboard/components/Icons/CandadoIcon";
import PacienteIcon from "@/app/dashboard/components/Icons/PacienteIcon";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import schema from "./validation";
import { z } from "zod";
import Swal from "sweetalert2";
import { Text } from "@chakra-ui/react";
import { localDomain } from "@/types/domain";

export default function Editar() {
  const router = useRouter();
  const [errors, setErrors] = useState<any>({});
  const [nombreUsuario, setnombreUsuario] = useState("");
  const [password, setpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setshowNewPassword] = useState(false);

  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      const obj = {
        username: nombreUsuario,
        password: password,
        newpassword: newpassword,
        confirmPassword: confirmpassword,
      };
      schema.parse(obj);
      setErrors({});
      const fetchData = async () => {
        const res = await fetch(localDomain + "user/cambiopassword", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: nombreUsuario,
            password: password,
            newpassword: newpassword,
          }),
        });
        const data = await res.json();
        if (data.message) {
          Swal.fire({
            title: "Error",
            text: data.message,
            icon: "error",
            confirmButtonColor: "#28a745",
          });
        } else {
          Swal.fire({
            title: "Éxito",
            text: `Password cambiado con exito`,
            icon: "success",
            confirmButtonColor: "#28a745",
          }).then((result) => {
            router.push("/paginaweb/pages/login");
          });
        }
      };
      fetchData();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          formErrors[err.path[0]] = err.message;
        });
        setErrors(formErrors);
      } else {
        Swal.fire({
          title: "Error",
          text: `Error al editar el usuario`,
          icon: "error",
          confirmButtonColor: "#28a745",
        });
      }
    }
  };
  return (
    <Layout>
      <main>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center ">
            <div className="hidden w-full  xl:block xl:w-1/2">
              <div className=" px-26 py-17.5 text-center ">
                <div className="rounded-xl bg-orange-400 p-10 shadow-lg">
                  <Link
                    className="mb-5.5 inline-block transition hover:drop-shadow-xl"
                    href="/paginaweb/pages/home"
                  >
                    <Image
                      className="hidden shadow-lg dark:block"
                      src={"/images/logo/logo.png"}
                      alt="Logo"
                      width={80}
                      height={32}
                    />
                    <Image
                      className="dark:hidden"
                      src={"/images/logo/logo.png"}
                      alt="Logo"
                      width={80}
                      height={32}
                    />
                  </Link>

                  <p className="text-xl font-bold  text-white drop-shadow-sm 2xl:px-20">
                    Bienvenido al Sistema Web del centro Ortiz Nosiglia
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Cambio de contraseña
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Usuario
                    </label>
                    <div className="relative">
                      <input
                        required
                        value={nombreUsuario}
                        onChange={(e: any) => {
                          setnombreUsuario(e.target.value);
                        }}
                        type="text"
                        placeholder="Ingresa tu nombre de usuario"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span className="absolute right-4 top-4">
                        <PacienteIcon />
                      </span>
                    </div>
                    {errors.username && (
                      <Text color="red.500">{errors.username}</Text>
                    )}
                  </div>

                  <div className="mb-6">
                    {" "}
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Ingresa tu contraseña actual
                    </label>
                    <div className="relative">
                      <input
                        required
                        value={password}
                        onChange={(e: any) => {
                          setpassword(e.target.value);
                        }}
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña actual"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span
                        className="absolute right-4 top-4"
                        onClick={() => {
                          setShowPassword((prev) => !prev);
                        }}
                      >
                        <CandadoIcon />
                      </span>
                    </div>
                    {errors.password && (
                      <Text color="red.500">{errors.password}</Text>
                    )}
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nueva contraseña
                    </label>
                    <div className="relative">
                      <input
                        required
                        value={newpassword}
                        onChange={(e: any) => {
                          setnewpassword(e.target.value);
                        }}
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Ingresa tu contraseña"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span
                        className="absolute right-4 top-4"
                        onClick={() => {
                          setshowNewPassword((prev) => !prev);
                        }}
                      >
                        <CandadoIcon />
                      </span>
                    </div>
                    {errors.newpassword && (
                      <Text color="red.500">{errors.newpassword}</Text>
                    )}
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Confirma tu nueva contraseña
                    </label>
                    <div className="relative">
                      <input
                        required
                        value={confirmpassword}
                        onChange={(e: any) => {
                          setconfirmpassword(e.target.value);
                        }}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Ingresa tu contraseña"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span
                        className="absolute right-4 top-4"
                        onClick={() => {
                          setshowConfirmPassword((prev) => !prev);
                        }}
                      >
                        <CandadoIcon />
                      </span>
                    </div>
                    {errors.confirmPassword && (
                      <Text color="red.500">{errors.confirmPassword}</Text>
                    )}
                  </div>
                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Iniciar sesión"
                      className="w-full cursor-pointer rounded-lg border border-orange-500 bg-orange-400 p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>

                  <Link
                    href={"/paginaweb/pages/editar"}
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
