"use client";
import CandadoIcon from "@/app/dashboard/components/Icons/CandadoIcon";
import PacienteIcon from "@/app/dashboard/components/Icons/PacienteIcon";
import { localDomain } from "@/types/domain";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Banner() {
  return (
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
  );
}
