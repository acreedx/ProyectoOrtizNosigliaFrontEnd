"use client";
import React, { useState } from "react";
import Link from "next/link";
import CandadoIcon from "@/app/dashboard/components/Icons/CandadoIcon";
import PacienteIcon from "@/app/dashboard/components/Icons/PacienteIcon";
import { useRouter } from "next/navigation";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import Banner from "../components/Banner";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [username, setnombreUsuario] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: username,
        password: password,
      });
      if (res?.ok) {
        Swal.fire({
          title: "Éxito",
          text: `Bienvenido de nuevo`,
          icon: "success",
          confirmButtonColor: "#28a745",
        }).then((result) => {
          router.push("/dashboard");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: res!.error!,
          icon: "error",
          confirmButtonColor: "#28a745",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonColor: "#28a745",
      });
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
                  Iniciar sesión
                </h2>

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Usuario
                    </label>
                    <div className="relative">
                      <input
                        required
                        value={username}
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
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        required
                        value={password}
                        onChange={(e: any) => {
                          setpassword(e.target.value);
                        }}
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingresa tu contraseña"
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
                  </div>

                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Iniciar sesión"
                      className="w-full cursor-pointer rounded-lg border border-orange-500 bg-orange-400 p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>

                  <Link
                    href={"/paginaweb/editarperfil"}
                    className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray-2 p-4 text-black hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                  >
                    Cambio de contraseña?
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
