import { dbConnect } from "@/database/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie} from 'nookies'

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { myRefreshCookie } = req.cookies;

  if (!myRefreshCookie) return res.status(401).json({ message: "unauthorized" });
  try {
    setCookie({res}, 'myAccessCookie', "", { httpOnly: true, path: "/", maxAge: 0 });
    setCookie({res}, 'myRefreshCookie', "", { httpOnly: true, path: "/", maxAge: 0 });
    
    return res.status(200).json({myRefreshCookie});
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
}
