import { useEffect, useState } from "react";

interface User {
  _id: string;
  nombreUsuario: string;
  email: string;
}

const useUser = () => {
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

  return { user, loading, error };
};

export default useUser;
