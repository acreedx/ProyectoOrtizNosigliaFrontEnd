import React from "react";
import FormElements from "@/app/dashboard/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Centro Ortiz Nosiglia",
  description: "Este es el sitio web del Centro Odontológico Ortiz Nosiglia",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <FormElements />
    </DefaultLayout>
  );
};

export default FormElementsPage;
