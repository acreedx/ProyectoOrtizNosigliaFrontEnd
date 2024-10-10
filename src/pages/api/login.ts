import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // Usamos cookies de Next.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const key = process.env.JWT_SECRET_KEY || "your_secret_key"; // Reemplaza con tu clave secreta real

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
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
    person.password = "_";
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
      //secure: process.env.NODE_ENV === "production", // la cookie solo se puede acceder en https
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
