import Link from "next/link";
import React from "react";
interface props {
  direccion: string;
}
const BotonVolver: React.FC<props> = ({ direccion }) => {
  return (
    <button className="mb-4 flex w-fit justify-center rounded bg-secondary p-3 font-medium text-gray hover:bg-opacity-90">
      <Link href={direccion}>{"<-"} Volver</Link>
    </button>
  );
};
export default BotonVolver;
