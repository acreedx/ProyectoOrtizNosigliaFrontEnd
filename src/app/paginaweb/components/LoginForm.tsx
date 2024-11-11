"use client";
import { routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues, Form } from "react-hook-form";

interface IFormInputs {
  username: string;
  password: string;
}
export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, resetField, handleSubmit } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      resetField("username");
      resetField("password");
      router.push(routes.sitio_web);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 rounded-xl bg-slate-500 p-10 text-white"
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="username">Ingrese su nombre de usuario</label>
        <input
          className="rounded-md text-black focus:no-underline focus:shadow-none focus:outline-none"
          type="text"
          id="username"
          {...register("username")}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="password">Ingrese su password</label>
        <input
          className="rounded-md text-black focus:no-underline focus:shadow-none focus:outline-none"
          type="password"
          id="password"
          {...register("password")}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="rounded-xl bg-slate-600 px-4 py-2 focus:no-underline focus:shadow-none focus:outline-none"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Ingresar"}
        </button>
      </div>
    </form>
  );
}
