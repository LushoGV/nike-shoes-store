import { dbConnect } from "@/database/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { COOKIES } from "@/utils/server/functions";
import { setCookie } from "nookies";
import { SECRET_JWT } from "@/config";
import User from "@/database/models/User";
import { verify } from "jsonwebtoken";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { myRefreshCookie, myAccessCookie } = req.cookies;

  if (!myRefreshCookie || !verify(myRefreshCookie, SECRET_JWT))
    return res.status(200).json({user: null});

  const { id, createdAt } = COOKIES.GET(myRefreshCookie);

  const userFound = await User.findById(id);
  if (!userFound)  return res.status(200).json({user: null});

  if (+createdAt - Date.now() < 5 * 24 * 60 * 60 * 1000) {
    const { refreshToken } = COOKIES.CREATE.REFRESH_TOKEN(id);
    setCookie({ res }, "myRefreshCookie", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  if (!myAccessCookie || !verify(myAccessCookie, SECRET_JWT)) {
    const { accessToken } = COOKIES.CREATE.ACCESS_TOKEN(
      userFound._id,
      `${userFound.name} ${userFound.surname}`,
      createdAt
    );
    setCookie({ res }, "myAccessCookie", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 20,
    });
  }

  return res
    .status(200)
    .json({
      user: `${userFound.name} ${userFound.surname}`,
      accessToken: myAccessCookie,
      RefreshTokenDate: createdAt,
    });
}
