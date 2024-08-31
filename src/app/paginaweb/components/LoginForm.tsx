"use client";
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
      console.log(data);
      router.push("pages/home");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 bg-slate-500 p-10 rounded-xl text-white"
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="username">Ingrese su nombre de usuario</label>
        <input
          className="rounded-md text-black"
          type="text"
          id="username"
          {...register("username")}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="password">Ingrese su password</label>
        <input
          className="rounded-md text-black"
          type="password"
          id="password"
          {...register("password")}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-slate-600 px-4 py-2 rounded-xl"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Ingresar"}
        </button>
      </div>
    </form>
  );
}
