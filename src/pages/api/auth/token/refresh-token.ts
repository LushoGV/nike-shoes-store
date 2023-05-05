import { dbConnect } from "@/database/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { COOKIES } from "@/utils/server/functions";
import {setCookie} from 'nookies'
import { SECRET_JWT } from "@/config";
import jwt from 'jsonwebtoken'

dbConnect();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { myRefreshToken } = req.cookies;
  if (!myRefreshToken) return res.status(401).json({ message: "unauthorized" });

  try {
    jwt.verify(myRefreshToken, SECRET_JWT)
    const { id } = COOKIES.GET(myRefreshToken);

    const {refreshToken} = COOKIES.CREATE.REFRESH_TOKEN(id);

    setCookie({res}, 'myRefreshCookie', refreshToken, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30 });
    return res.status(200).json("ok");
  } catch (error) {
    return res.status(401).json({ message: "jwt expired" });
  }
}

