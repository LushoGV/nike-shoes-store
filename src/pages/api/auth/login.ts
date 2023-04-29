import User from "@/database/models/User";
import { dbConnect } from "@/database/mongoose";
import { COOKIES, PASSWORD } from "@/utils/server/functions";
import { NextApiRequest, NextApiResponse } from "next";
import {setCookie } from 'nookies'

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  
  const userFound = await User.findOne({ email: email });

  if (!userFound) return res.status(400).json({ message: "user not found" });

  const isTrue = await PASSWORD.VALIDATE(password, userFound.password);

  if (isTrue) {
    const { refreshToken, accessToken } = COOKIES.CREATE.ALL_TOKENS(
      userFound._id,
      `${userFound.name} ${userFound.surname}`
    );
      
    setCookie({res}, 'myRefreshCookie', refreshToken, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30 });
    setCookie({res}, 'myAccessCookie', accessToken, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30 });

    return res.status(200).json("ok");
  }

  return res.status(400).json({ message: "incorrect password" });
}
