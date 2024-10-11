import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
const key = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
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
        { message: "Usuario no encontrado" },
        { status: 500 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, person.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Password o nombre de usuario incorrecto" },
        { status: 500 },
      );
    }
    if (!person.active) {
      return NextResponse.json(
        { message: "Usuario bloquedo reestablezca su contraseña por favor" },
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
        rol: person.rol.roleName,
        permisos: person.rol.permissions?.map((permiso) => permiso.code),
      },
      key,
      {
        expiresIn: "1h",
      },
    );

    const response = NextResponse.json({ person });
    response.cookies.set("access_token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hora
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
