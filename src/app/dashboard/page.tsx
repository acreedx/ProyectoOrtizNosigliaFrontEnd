import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ECommerce from "@/components/Dashboard/E-commerce";
export default function Dashboard() {
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}
