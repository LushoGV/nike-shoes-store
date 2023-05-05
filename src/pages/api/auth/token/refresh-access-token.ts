import { dbConnect } from "@/database/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { COOKIES } from "@/utils/server/functions";
import {setCookie} from 'nookies'
import { SECRET_JWT } from "@/config";
import jwt from "jsonwebtoken";
import User from "@/database/models/User";

dbConnect();

type Data = {
  user?: string;
  RefreshTokenDate?: Date;
  message?: string;
  accessToken?: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { myRefreshCookie } = req.cookies;

  if (!myRefreshCookie) return res.status(401).json({ message: "unauthorized" });

  try {
    jwt.verify(myRefreshCookie, SECRET_JWT);
    const { id, createdAt } = COOKIES.GET(myRefreshCookie);
    
    const userFound = await User.findById(id);
    if (!userFound) throw Error();

    if(+createdAt - Date.now() < (5 * 24 * 60 * 60 * 1000)){
      const {refreshToken} = COOKIES.CREATE.REFRESH_TOKEN(id);
      setCookie({res}, 'myRefreshCookie', refreshToken, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30 });
    }

    const { accessToken } = COOKIES.CREATE.ACCESS_TOKEN(
      id,
      `${userFound.name} ${userFound.surname}`,
      createdAt
    );

    setCookie({res}, 'myAccessCookie', accessToken, { httpOnly: true, path: "/", maxAge: 60 * 20 });
    return res.status(200).json({ user: `${userFound.name} ${userFound.surname}`, accessToken: accessToken , RefreshTokenDate: createdAt });
  } catch (error) {
    return res.status(401).json({ message: "jwt expired" });
  }
}
