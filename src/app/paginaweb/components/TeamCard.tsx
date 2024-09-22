"use client";

import Image from "next/image";

interface TeamCardProps {
  imgRoute: string;
  imgAlt: string;
  name: string;
  description: string;
}
export default function TeamCard({
  imgRoute,
  imgAlt,
  name,
  description,
}: TeamCardProps) {
  return (
    <div className="flex w-[400px] min-w-40 flex-col  items-center justify-center">
      <Image
        src={imgRoute}
        alt={imgAlt}
        width={400}
        height={400}
        className="mb-4 rounded-xl shadow-xl"
      />
      <b className="text-black">{name}</b>
      <p className=" text-center text-black">{description}</p>
    </div>
  );
}
