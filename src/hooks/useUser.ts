import { localDomain } from "@/types/domain";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  nombreUsuario: string;
  email: string;
  foto: string;
  nombre: string;
  apellido: string;
  permisos: String[];
}
const LogOut = async () => {
  const res = await fetch(localDomain + "user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  return true;
};
const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/profile"); // Ruta para obtener el JWT
        if (!res.ok) {
          throw new Error("Error al obtener la información del usuario");
        }
        const data = await res.json();
        console.log(data);
        setUser(data.decodedToken); // Asumiendo que tienes el token decodificado aquí
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  const logout = async () => {
    try {
      await LogOut();
      setUser(null);
    } catch (err: any) {
      setError(err.message);
    }
  };
  return { user, loading, error, logout };
};

export default useUser;
