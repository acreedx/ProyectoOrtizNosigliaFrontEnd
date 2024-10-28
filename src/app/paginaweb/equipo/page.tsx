"use client";
import React, { useEffect, useState } from "react";
import TeamCard from "../components/TeamCard";
import Layout from "../components/Layout";
import { Spinner } from "@chakra-ui/react";
import { Person, Qualification } from "@prisma/client";
import { getDentistas } from "@/serveractions/paginaweb/dentistas/listarDentistas";
import { personFullNameFormater } from "@/utils/format_person_full_name";
export default function Page() {
  const [loading, setloading] = useState(true);
  const [dentistas, setdentistas] = useState<
    (Person & { qualifications: Qualification[] })[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      setdentistas(await getDentistas());
      setloading(false);
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <section className="h-[750px] bg-[url('/images/paginaweb/team.png')] bg-cover bg-center">
        <div className="flex h-full w-full items-center justify-center bg-black bg-opacity-50"></div>
      </section>
      <section className="mb-20 mt-16 flex w-full flex-col flex-wrap content-center justify-center">
        <h1 className="text-orange mb-8 py-4 text-center text-3xl font-bold text-orange-400">
          Nuestro equipo
        </h1>
        {loading ? (
          <div className="flex  justify-center p-40">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-wrap items-start justify-center gap-12">
            {dentistas.map((dentista, index) => (
              <TeamCard
                key={index}
                imgRoute={dentista.photoUrl}
                imgAlt={personFullNameFormater(dentista)}
                name={`Dr. ${personFullNameFormater(dentista)}`}
                description={dentista.qualifications
                  .map((q) => `${q.name} - ${q.issuer}`)
                  .join(", ")}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
