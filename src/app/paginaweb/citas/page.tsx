"use client";
import React from "react";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import { Spinner } from "@chakra-ui/react";
import CrearCitas from "./crear_citas";
import IniciarSesion from "./inciar_sesion";
import AccesoRestringido from "./acceso_restringido";
export default function Citas() {
  const { data: session, status } = useSession();
  return (
    <Layout>
      <main>
        {status === "loading" ? (
          <div className="flex h-80 items-center justify-center">
            <Spinner />
          </div>
        ) : !session || !session.user ? (
          <IniciarSesion />
        ) : session.user.resourceType === "Patient" ? (
          <CrearCitas />
        ) : (
          <AccesoRestringido />
        )}
      </main>
    </Layout>
  );
}
