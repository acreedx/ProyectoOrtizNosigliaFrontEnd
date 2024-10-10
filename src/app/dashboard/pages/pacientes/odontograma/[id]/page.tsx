"use client";
import Breadcrumb from "@/app/dashboard/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import { localDomain } from "@/types/domain";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BotonVolver from "@/app/dashboard/components/BotonVolver";
interface OdontogramaRow {
  msc: string;
  temp: string;
  piezas: string;
  fecha: string;
  diagnostico: string;
  tratamiento: string;
}

const Odontograma = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<OdontogramaRow[]>([]);
  const [loading, setloading] = useState<Boolean>(false);
  const router = useRouter();

  const handleInputChange = (
    index: number,
    field: keyof OdontogramaRow,
    value: string | number,
  ) => {
    const newData = [...data];
    newData[index][field] = value.toString();
    setData(newData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = await Swal.fire({
      title: "Confirmación",
      text: "Confirmas la edición de este Odontograma?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No, cancelar",
      confirmButtonColor: "#28a745", // Verde
      cancelButtonColor: "#dc3545",
    }).then((result) => result.isConfirmed);
    if (confirmed) {
      try {
        const response = await fetch(localDomain + "odontograma/" + params.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patientId: params.id, odontogramRows: data }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(
            "Error al actualizar el odontograma: " + error.message,
          );
        }
        Swal.fire({
          title: "Actualizado",
          text: "El odontograma ha sido actualizado.",
          icon: "success",
          confirmButtonText: "Sí",
          confirmButtonColor: "#28a745",
        }).then((result) => {
          router.push("/dashboard/pacientes");
        });
      } catch (error: any) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };
  useEffect(() => {
    async function fetchOdontogram() {
      setloading(true);
      const url = localDomain + "odontograma/" + params.id;
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        const error = await response.json();
        throw new Error("Error al listar los pacientes: " + error);
      }
      const data = await response.json();
      setData(data.odontogramRows);
      setloading(false);
    }
    fetchOdontogram();
  }, []);
  return (
    <DefaultLayout>
      <BotonVolver direccion="/dashboard/pacientes" />
      <Breadcrumb pageName="Editar odontograma" />
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto">
            <table className="block min-w-full border-collapse md:table">
              <thead className="block md:table-header-group">
                <tr className="border-gray-300 absolute -left-full -top-full block border md:relative md:left-auto md:top-auto md:table-row md:border-none">
                  <th className="bg-gray-200 md:border-gray-300 block p-2 text-left font-bold text-black md:table-cell md:border">
                    MSC
                  </th>
                  <th className="bg-gray-200 md:border-gray-300 block p-2 text-left font-bold text-black md:table-cell md:border">
                    Temp.
                  </th>
                  <th className="bg-gray-200 md:border-gray-300 block p-2 text-left font-bold text-black md:table-cell md:border">
                    Piezas
                  </th>
                  <th className="bg-gray-200 md:border-gray-300 block p-2 text-left font-bold text-black md:table-cell md:border">
                    Fecha
                  </th>
                  <th className="bg-gray-200 md:border-gray-300 block p-2 text-left font-bold text-black md:table-cell md:border">
                    Diagnóstico
                  </th>
                  <th className="bg-gray-200 md:border-gray-300 block p-2 text-left font-bold text-black md:table-cell md:border">
                    Tratamiento presuntivo
                  </th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {data.map((row, index) => (
                  <tr
                    key={index}
                    className="border-gray-300 block border md:table-row md:border-none"
                  >
                    <td className="md:border-gray-300 block w-fit p-2 text-left text-black md:table-cell md:border">
                      {row.msc}
                    </td>
                    <td className="md:border-gray-300 block p-2 text-left text-black md:table-cell md:border">
                      {row.temp}
                    </td>
                    <td className="md:border-gray-300 block p-2 text-left text-black md:table-cell md:border">
                      {row.piezas}
                    </td>
                    <td className="md:border-gray-300 block p-2 text-left text-black md:table-cell md:border">
                      <input
                        type="date"
                        value={row.fecha}
                        onChange={(e) =>
                          handleInputChange(index, "fecha", e.target.value)
                        }
                      />
                    </td>
                    <td className="md:border-gray-300 block p-2 text-left text-black md:table-cell md:border">
                      <input
                        type="text"
                        value={row.diagnostico}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "diagnostico",
                            e.target.value,
                          )
                        }
                      />
                    </td>
                    <td className="md:border-gray-300 block p-2 text-left text-black md:table-cell md:border">
                      <input
                        type="text"
                        value={row.tratamiento}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "tratamiento",
                            e.target.value,
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex w-full justify-end">
            <button
              className=" mt-10 flex w-56 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              type="submit"
            >
              Actualizar
            </button>
          </div>
        </form>
      )}
    </DefaultLayout>
  );
};

export default Odontograma;
