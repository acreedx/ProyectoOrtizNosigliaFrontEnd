"use client";
import React from "react";
import IniciarSesion from "./inciar_sesion";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import { Spinner } from "@chakra-ui/react";
import CrearCitas from "./citas";
export default function Citas() {
  const { data: session, status } = useSession();
  return (
    <Layout>
      <main>
        {status === "loading" ? (
          <div className="flex h-80 items-center justify-center">
            <Spinner />
          </div>
        ) : session ? (
          <CrearCitas />
        ) : (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <IniciarSesion />
          </div>
        )}
      </main>
    </Layout>
  );
}
