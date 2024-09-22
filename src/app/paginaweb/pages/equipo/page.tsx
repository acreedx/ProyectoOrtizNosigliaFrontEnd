"use client";
import React from "react";
import Layout from "../../components/Layout";
import Image from "next/image";
import TeamCard from "../../components/TeamCard";

export default function page() {
  return (
    <Layout>
      <section className="h-[750px] bg-[url('/images/paginaweb/team.png')] bg-cover bg-center">
        <div className="flex h-full w-full items-center justify-center bg-black bg-opacity-50"></div>
      </section>
      <section className="mb-20 mt-16 flex w-full flex-col flex-wrap content-center justify-center">
        <h1 className="text-orange mb-8 py-4 text-center text-3xl font-bold text-orange-400">
          Nuestro equipo
        </h1>
        <div className="flex flex-wrap items-start justify-center gap-12">
          <TeamCard
            imgRoute="/images/paginaweb/team/Fernando.png"
            imgAlt="Foto de Fernando Ortiz"
            name="Dr. Fernando Ortiz Nosiglia"
            description="Periodoncia, tratamientos anti-ronquidos y odontopediatría"
          />
          <TeamCard
            imgRoute="/images/paginaweb/team/Alvaro.png"
            imgAlt="Foto de Álvaro Ortiz"
            name="Dr. Álvaro Ortiz Nosiglia"
            description="Implantes dentales, cirugías y ortodoncia"
          />
          <TeamCard
            imgRoute="/images/paginaweb/team/Javier.png"
            imgAlt="Foto de Javier Ortiz"
            name="Dr. Javier Ortiz Nosiglia"
            description="Implantes dentales, endodoncia y estética facial."
          />
        </div>
      </section>
    </Layout>
  );
}
