"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "@/app/dashboard/components/Common/Breadcrumb";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import BotonVolver from "@/app/dashboard/components/Common/BotonVolver";
import { OdontogramRows } from "@prisma/client";
import { obtenerOdontograma } from "@/controller/dashboard/odontograma/odontogramaListar";
import { Spinner } from "@chakra-ui/react";
export default function Odontograma({ params }: { params: { id: string } }) {
  const [odontograma, setOdontograma] = useState<OdontogramRows[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOdontograma() {
      try {
        setIsLoading(true);
        const data = (await obtenerOdontograma(params.id)) as OdontogramRows[];
        setOdontograma(data);
      } catch (error: any) {
        console.error("Error al cargar el odontograma:", error);
        setError("No se pudo cargar el odontograma.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchOdontograma();
  }, [params.id]);
  return (
    <DefaultLayout>
      <BotonVolver direccion="/dashboard/pacientes" />
      <Breadcrumb pageName="Editar odontograma" />
      {isLoading ? (
        <Spinner />
      ) : (
        <form>
          <div className="overflow-x-auto">
            <table className="block min-w-full border-collapse md:table">
              <thead className="block md:table-header-group">
                <tr className="border-gray-300 block md:table-row">
                  <th className="bg-gray-200 p-2 text-left font-bold">MSC</th>
                  <th className="bg-gray-200 p-2 text-left font-bold">Temp.</th>
                  <th className="bg-gray-200 p-2 text-left font-bold">
                    Piezas
                  </th>
                  <th className="bg-gray-200 p-2 text-left font-bold">Fecha</th>
                  <th className="bg-gray-200 p-2 text-left font-bold">
                    Diagnóstico
                  </th>
                  <th className="bg-gray-200 p-2 text-left font-bold">
                    Tratamiento presuntivo
                  </th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {odontograma.map((row, index) => (
                  <tr
                    key={index}
                    className="border-gray-300 block md:table-row"
                  >
                    <td className="block p-2 text-left md:table-cell">
                      {row.msc}
                    </td>
                    <td className="block p-2 text-left md:table-cell">
                      {row.temp}
                    </td>
                    <td className="block p-2 text-left md:table-cell">
                      {row.piezas}
                    </td>
                    <td className="block p-2 text-left md:table-cell">
                      {row.fecha
                        ? new Date(row.fecha).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="block p-2 text-left md:table-cell">
                      {row.diagnostico}
                    </td>
                    <td className="block p-2 text-left md:table-cell">
                      {row.tratamiento}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-10 rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      )}
    </DefaultLayout>
  );
}
