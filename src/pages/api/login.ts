import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // Usamos cookies de Next.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
const key = process.env.JWT_SECRET_KEY;

export async function POST(req: NextResponse) {
  const { username, password } = await req.json(); // Cambia a req.json() para obtener el cuerpo

  try {
    if (!key) {
      return NextResponse.json(
        { message: "No se tiene el token Jwt en las variables de entorno" },
        { status: 500 },
      );
    }

    const prisma = new PrismaClient();
    const person = await prisma.person.findFirst({
      where: {
        username: username,
      },
    });

    if (!person) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 500 },
      );
    }

    const isTokenValid = await bcrypt.compare(password, person.password);
    if (!isTokenValid) {
      return NextResponse.json(
        { message: "Password o nombre de usuario incorrecto" },
        { status: 500 },
      );
    }

    person.password = "_"; // Para no enviar la contraseña
    const token = jwt.sign(
      {
        _id: person.id,
        nombreUsuario: person.username,
        email: person.email,
        foto: person.photoUrl,
        nombre: person.firstName,
        apellido: person.familyName,
      },
      key,
      {
        expiresIn: "1h",
      },
    );

    const response = NextResponse.json({ person });
    response.cookies.set("access_token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // la cookie solo se puede acceder en https
      sameSite: "strict",
      maxAge: 3600, // 1 hora
      path: "/", // Define el path para la cookie
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
