import Image from "next/image";
import React from "react";
import NavBarLink from "./NavBarLink";
import Link from "next/link";

export default function PersoNavBar() {
  return (
    <nav className="border-b-1 sticky flex w-full flex-row justify-center">
      <ul className="mb-0  flex w-full justify-around px-0 py-2 align-middle">
        <div>
          <li className="">
            <a
              href=""
              className="text-gray-900 no-underline hover:text-orange-400"
            >
              <Image
                src={"/paginawebimages/logo/logo.png"}
                alt="Ortiz Nosiglia Logo"
                width={60}
                height={60}
              />
            </a>
          </li>
        </div>
        <div className="flex gap-10">
          <NavBarLink linkName="Inicio" linkUrl="#" />
          <NavBarLink linkName="Servicios" linkUrl="#" />
          <NavBarLink linkName="Contacto" linkUrl="#" />
        </div>
        <div className="flex items-center gap-4">
          <li>
            <Link
              href="/dashboard"
              className="rounded-xl bg-orange-400 p-2 text-lg text-white   no-underline hover:text-orange-400"
            >
              Iniciar Sesión
            </Link>
          </li>
          <li>
            <Link
              href="/paginaweb/registro"
              className="rounded-xl border-2 border-orange-400 p-2 text-lg text-orange-400   no-underline hover:text-orange-400"
            >
              Crear Cuenta
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
