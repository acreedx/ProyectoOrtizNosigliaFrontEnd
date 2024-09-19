import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface MyJwtPayload extends JwtPayload {
  _id: string;
  username: string;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { access_token } = req.cookies;
  if (!access_token) {
    return res.status(401).json({ message: "Token no encontrado" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error(
        "El secreto JWT no está definido en las variables de entorno.",
      );
    }
    const decodedToken = jwt.verify(access_token, secret) as MyJwtPayload;
    return res.json({ decodedToken });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Token inválido" });
  }
}
