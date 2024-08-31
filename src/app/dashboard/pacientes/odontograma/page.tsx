"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import Swal from "sweetalert2";
interface OdontogramaRow {
  msc: string;
  temp: number | string;
  piezas: number | string;
  fecha: string;
  diagnostico: string;
  tratamiento: string;
}
const odontogramaData: OdontogramaRow[] = [
  {
    msc: "ICSI",
    temp: 61,
    piezas: 21,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "ILSI",
    temp: 62,
    piezas: 22,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "CSI",
    temp: 63,
    piezas: 23,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "1PMSI",
    temp: 64,
    piezas: 24,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "2PMSI",
    temp: 65,
    piezas: 25,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "1MSI",
    temp: "",
    piezas: 26,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "2MSI",
    temp: "",
    piezas: 27,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "3MSI",
    temp: "",
    piezas: 28,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "3MII",
    temp: "",
    piezas: 38,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "2MII",
    temp: "",
    piezas: 37,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "1MII",
    temp: "",
    piezas: 36,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "2PMII",
    temp: "75",
    piezas: 35,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "1PMII",
    temp: "74",
    piezas: 34,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "CII",
    temp: "73",
    piezas: 33,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "ILII",
    temp: "72",
    piezas: 32,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "ICII",
    temp: "71",
    piezas: 31,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "ICSD",
    temp: "51",
    piezas: 11,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "ILSD",
    temp: "52",
    piezas: 12,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "CSD",
    temp: "53",
    piezas: 13,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "1PMSD",
    temp: "54",
    piezas: 14,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "2PMSD",
    temp: "55",
    piezas: 15,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "1MSD",
    temp: "",
    piezas: 16,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "2MSD",
    temp: "",
    piezas: 17,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "3MSD",
    temp: "",
    piezas: 18,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "3MID",
    temp: "",
    piezas: 48,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "2MID",
    temp: "",
    piezas: 47,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "1MID",
    temp: "",
    piezas: 46,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "2PMID",
    temp: "85",
    piezas: 45,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "1PMID",
    temp: "84",
    piezas: 44,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "CID",
    temp: "83",
    piezas: 43,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "ILID",
    temp: "82",
    piezas: 42,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  {
    msc: "ICID",
    temp: "81",
    piezas: 41,
    fecha: "",
    diagnostico: "",
    tratamiento: "",
  },
  // ... continua con el resto de los datos
];
const deletePatientAlert = () => {
  Swal.fire({
    title: "Confirmación",
    text: "Confirmas la edición de este Odontograma?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No, cancelar",
    confirmButtonColor: "#28a745", // Verde
    cancelButtonColor: "#dc3545",
  }).then((result) => {
    if (result.isConfirmed) {
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    }
  });
};
const Odontograma: React.FC = () => {
  const [data, setData] = useState<OdontogramaRow[]>(odontogramaData);
  const handleInputChange = (
    index: number,
    field: keyof OdontogramaRow,
    value: string | number,
  ) => {
    const newData = [...data];
    newData[index][field] = value.toString();
    setData(newData);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Editar odontograma" />
      <div className="overflow-x-auto">
        <table className="block min-w-full border-collapse md:table">
          <thead className="block md:table-header-group">
            <tr className="border-gray-300 absolute -left-full -top-full block border md:relative md:left-auto md:top-auto md:table-row md:border-none">
              <th className="bg-gray-200 text-gray-600 md:border-gray-300 block p-2 text-left font-bold md:table-cell md:border">
                MSC
              </th>
              <th className="bg-gray-200 text-gray-600 md:border-gray-300 block p-2 text-left font-bold md:table-cell md:border">
                Temp.
              </th>
              <th className="bg-gray-200 text-gray-600 md:border-gray-300 block p-2 text-left font-bold md:table-cell md:border">
                Piezas
              </th>
              <th className="bg-gray-200 text-gray-600 md:border-gray-300 block p-2 text-left font-bold md:table-cell md:border">
                Fecha
              </th>
              <th className="bg-gray-200 text-gray-600 md:border-gray-300 block p-2 text-left font-bold md:table-cell md:border">
                Diagnóstico
              </th>
              <th className="bg-gray-200 text-gray-600 md:border-gray-300 block p-2 text-left font-bold md:table-cell md:border">
                Tratamiento presuntivo
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {odontogramaData.map((row, index) => (
              <tr
                key={index}
                className="border-gray-300 block border md:table-row md:border-none"
              >
                <td className="md:border-gray-300 block w-fit p-2 text-left md:table-cell md:border">
                  {row.msc}
                </td>
                <td className="md:border-gray-300 block p-2 text-left md:table-cell md:border">
                  {row.temp}
                </td>
                <td className="md:border-gray-300 block p-2 text-left md:table-cell md:border">
                  {row.piezas}
                </td>
                <td className="md:border-gray-300 block p-2 text-left md:table-cell md:border">
                  <input
                    type="text"
                    value={row.fecha}
                    onChange={(e) =>
                      handleInputChange(index, "fecha", e.target.value)
                    }
                  />
                </td>
                <td className="md:border-gray-300 block p-2 text-left md:table-cell md:border">
                  <input
                    type="text"
                    value={row.diagnostico}
                    onChange={(e) =>
                      handleInputChange(index, "diagnostico", e.target.value)
                    }
                  />
                </td>
                <td className="md:border-gray-300 block p-2 text-left md:table-cell md:border">
                  <input
                    type="text"
                    value={row.tratamiento}
                    onChange={(e) =>
                      handleInputChange(index, "tratamiento", e.target.value)
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
          onClick={deletePatientAlert}
          className=" mt-10 flex w-56 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          type="submit"
        >
          Actualizar
        </button>
      </div>
    </DefaultLayout>
  );
};

export default Odontograma;
