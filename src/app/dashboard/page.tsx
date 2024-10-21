import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import DashboardPage from "./components/Dashboard/DashboardPage";

export const metadata: Metadata = {
  title: "Centro Ortiz Nosiglia",
  description: "Este es el sitio web del Centro Odontológico Ortiz Nosiglia",
};
export default function Dashboard() {
  return (
    <DefaultLayout>
      <DashboardPage />
    </DefaultLayout>
  );
}
