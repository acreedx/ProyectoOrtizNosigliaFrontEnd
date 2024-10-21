import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { sendEmail } from "../../utils/mailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, subject, message } = req.body;

    const result = await sendEmail(email, subject, message);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ error: result.error });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}
