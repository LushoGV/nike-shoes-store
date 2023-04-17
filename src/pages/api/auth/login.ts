import User from "@/database/models/User";
import { dbConnect } from "@/database/mongoose";
import { createTokenCookie, validatePassword } from "@/utils/serverFunctions";
import { NextApiRequest, NextApiResponse } from "next";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email: email });

  if (!userFound) return res.status(400).json({ message: "user not found" });

  const isTrue = await validatePassword(password, userFound.password);

  if (isTrue) {
    const cookie = createTokenCookie(userFound._id);
    res.setHeader("Set-Cookie", cookie);
    return res.status(200);
  }

  return res.status(400).json({ message: "incorrect password" });
}
