"use client";
import React from "react";
import DashboardTable from "./DashboardTable";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChartThree from "../Charts/ChartThree";
import AppointmentStats from "./AppointmentStats";

export default function DashboardPage() {
  return (
    <>
      <AppointmentStats />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/*
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne /> */}
        <div className="col-span-12 xl:col-span-8">
          <div className="rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
            <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
              Últimos usuarios registrados
            </h4>
            <DashboardTable />
          </div>
        </div>
      </div>
    </>
  );
}
