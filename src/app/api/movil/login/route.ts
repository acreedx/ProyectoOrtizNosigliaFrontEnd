import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
const key = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 500 });
    }
    console.log(username, password);
    if (!key) {
      return NextResponse.json(
        { error: "No se tiene el token Jwt en las variables de entorno" },
        { status: 500 },
      );
    }
    console.log(await prisma.person.findMany());
    const person = await prisma.person.findFirst({
      where: {
        username: username,
      },
      include: {
        rol: {
          include: {
            permissions: true,
          },
        },
      },
    });

    if (!person) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 500 },
      );
    }

    if (person.rol.roleName !== "Dentista") {
      return NextResponse.json(
        { error: "El usuario no tiene los permisos requeridos" },
        { status: 500 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, person.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Password o nombre de usuario incorrecto" },
        { status: 500 },
      );
    }
    if (!person.active) {
      return NextResponse.json(
        { error: "Usuario bloquedo reestablezca su contraseña por favor" },
        { status: 500 },
      );
    }

    person.password = "_";
    const token = jwt.sign(
      {
        access_token: person,
      },
      key,
      {
        expiresIn: "1h",
      },
    );
    return NextResponse.json({ access_token: token });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
