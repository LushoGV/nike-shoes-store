import User from "@/database/models/User";
import { dbConnect } from "@/database/mongoose";
import { createTokenCookie, encryptPassword } from "@/utils/serverFunctions";
import { NextApiRequest, NextApiResponse } from "next";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, surname, email, password } = req.body;
  
  const userFound = await User.findOne({ email });
  if (userFound) return res.status(400).json({ message: "email in use" });

  const newPassword = await encryptPassword(password);
  const userCreated = await User.create({ name, surname, email, password: newPassword });

  const cookie = createTokenCookie(userCreated._id);
  res.setHeader("Set-Cookie", cookie);
  return res.status(200);
}
