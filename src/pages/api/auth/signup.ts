import User from "@/database/models/User";
import { dbConnect } from "@/database/mongoose";
import { COOKIES, PASSWORD } from "@/utils/server/functions";
import { NextApiRequest, NextApiResponse } from "next";
import {setCookie} from 'nookies'

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, surname, email, password } = req.body;
  
  const userFound = await User.findOne({ email: email.trim() });
  if (userFound) return res.status(400).json({ message: "email in use" });

  const newPassword = await PASSWORD.ENCRYPT(password.trim());
  await User.create({ name: name.trim(), surname: surname.trim(), email: email.trim(), password: newPassword.trim() });

  const { refreshToken, accessToken } = COOKIES.CREATE.ALL_TOKENS(
    userFound._id,
    `${userFound.name} ${userFound.surname}`
  );

  setCookie({res}, 'myAccessCookie', accessToken, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30 });
  setCookie({res}, 'myRefreshCookie', refreshToken, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30 });

  return res.status(200).json("ok");
}
