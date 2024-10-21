"use client";
import React, { useEffect, useState } from "react";
import LoadingMessage from "@/app/dashboard/components/LoadingMessage";
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
          <Spinner />
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
