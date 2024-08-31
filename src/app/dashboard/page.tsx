import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import ECommerce from "@/app/dashboard/components/Dashboard/E-commerce";
export default function Dashboard() {
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}
