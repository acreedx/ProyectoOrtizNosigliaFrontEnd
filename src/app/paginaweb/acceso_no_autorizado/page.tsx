"use client";
import React from "react";
import Banner from "../components/Banner";
import Layout from "../components/Layout";

export default function Page() {
  return (
    <Layout>
      <main>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center ">
            <Banner />
            <div className="p-6">
              <div className="text-center">
                <h1 className="text-red-600 text-2xl font-bold">
                  Acceso No Autorizado
                </h1>
                <p className="text-gray-700 dark:text-gray-300 mt-4 text-lg">
                  Lo sentimos, no tienes permisos suficientes para acceder a
                  esta página.
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                  Si crees que esto es un error, por favor contacta con el
                  administrador.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
