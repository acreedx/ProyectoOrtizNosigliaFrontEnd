import Image from "next/image";
import React from "react";
import NavBarLink from "./NavBarLink";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import LoadingMessage from "@/app/dashboard/components/LoadingMessage";
import { localDomain } from "@/types/domain";
import { useRouter } from "next/navigation";

export default function PersoNavBar() {
  const { user, loading, error } = useUser();
  const router = useRouter();
  const LogOut = async () => {
    const res = await fetch(localDomain + "user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      throw new Error(data.message);
    }
    router.push("/paginaweb");
  };
  return (
    <nav className="border-b-1 sticky flex w-full flex-row justify-center">
      <ul className="mb-0  flex w-full flex-wrap justify-around px-0 py-2 align-middle">
        <div>
          <li className="">
            <Link
              href="/paginaweb"
              className="text-gray-900 no-underline hover:text-orange-400"
            >
              <Image
                src={"/images/logo/logo.png"}
                alt="Ortiz Nosiglia Logo"
                width={60}
                height={60}
              />
            </Link>
          </li>
        </div>
        <div className="flex gap-10">
          <NavBarLink linkName="Inicio" linkUrl="/paginaweb/pages/home" />
          <NavBarLink linkName="Servicios" linkUrl="/paginaweb/pages/home" />
          <NavBarLink linkName="Contacto" linkUrl="/paginaweb/pages/home" />
          <NavBarLink
            linkName="Reserva una cita"
            linkUrl="/paginaweb/pages/citas"
          />
        </div>
        <div className="flex items-center gap-4">
          {loading ? (
            <div>Cargando...</div>
          ) : user ? (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="rounded-xl bg-orange-400 p-2 text-lg text-white no-underline transition-all  hover:text-orange-700 hover:drop-shadow-md "
                >
                  Ingresar al dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={LogOut}
                  className="rounded-xl border-2 border-orange-400 p-2 text-lg text-orange-400 no-underline transition-all hover:bg-orange-400 hover:text-white hover:drop-shadow-md"
                >
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/paginaweb/pages/login"
                  className="rounded-xl bg-orange-400 p-2 text-lg text-white no-underline transition-all  hover:text-orange-700 hover:drop-shadow-md "
                >
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link
                  href="/paginaweb/pages/registro"
                  className="rounded-xl border-2 border-orange-400 p-2 text-lg text-orange-400 no-underline transition-all hover:bg-orange-400 hover:text-white hover:drop-shadow-md"
                >
                  Crear Cuenta
                </Link>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}
