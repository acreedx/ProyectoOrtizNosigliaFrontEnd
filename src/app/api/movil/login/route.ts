import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/config/authenticateUser";
const key = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    const user = await authenticateUser({ username, password });
    if (!key) {
      return NextResponse.json(
        { error: "No se tiene el token JWT en las variables de entorno" },
        { status: 500 },
      );
    }
    if (user.rol.roleName !== "Dentista") {
      return NextResponse.json(
        { error: "El usuario no tiene los permisos requeridos" },
        { status: 403 },
      );
    }
    const token = jwt.sign({ access_token: user }, key, { expiresIn: "1h" });
    return NextResponse.json({ access_token: token });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
