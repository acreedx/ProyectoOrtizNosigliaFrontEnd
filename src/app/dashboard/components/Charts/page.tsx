"use client";
import Breadcrumb from "@/app/dashboard/components/Common/Breadcrumb";
import ChartOne from "@/app/dashboard/components/Charts/ChartOne";
import ChartTwo from "@/app/dashboard/components/Charts/ChartTwo";
import dynamic from "next/dynamic";
import React from "react";

const ChartThree = dynamic(
  () => import("@/app/dashboard/components/Charts/ChartThree"),
  {
    ssr: false,
  },
);

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
