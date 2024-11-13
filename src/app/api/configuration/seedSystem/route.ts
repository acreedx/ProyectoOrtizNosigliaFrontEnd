import { NextRequest, NextResponse } from "next/server";
const DOMAIN = "http://localhost:3000/api/configuration/";
export async function POST(req: NextRequest) {
  try {
    const Permissionsresponse = await fetch(DOMAIN + "seedPermissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!Permissionsresponse.ok) {
      throw new Error("Error in request: " + Permissionsresponse.text);
    }
    const Organizationsresponse = await fetch(DOMAIN + "seedOrganizations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!Organizationsresponse.ok) {
      throw new Error("Error in request: " + Organizationsresponse.text);
    }
    const Rolesresponse = await fetch(DOMAIN + "seedRoles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!Rolesresponse.ok) {
      throw new Error("Error in request: " + Rolesresponse.text);
    }
    const UserResponse = await fetch(DOMAIN + "createInitialUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!UserResponse.ok) {
      throw new Error("Error in request: " + UserResponse.text);
    }
    return NextResponse.json({
      message: "Datos creados correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al insertar las organizaciones", details: error },
      { status: 500 },
    );
  }
}
