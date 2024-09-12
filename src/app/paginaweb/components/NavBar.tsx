import Image from "next/image";
import React from "react";
import NavBarLink from "./NavBarLink";
import Link from "next/link";

export default function PersoNavBar() {
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
          <li>
            <Link
              href="/paginaweb/pages/login"
              className="rounded-xl bg-orange-400 p-2 text-lg text-white no-underline  hover:text-orange-700 hover:drop-shadow-md "
            >
              Iniciar Sesión
            </Link>
          </li>
          <li>
            <Link
              href="/paginaweb/pages/registro"
              className="rounded-xl border-2 border-orange-400 p-2 text-lg text-orange-400 no-underline hover:bg-orange-400 hover:text-white hover:drop-shadow-md"
            >
              Crear Cuenta
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
