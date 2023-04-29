import { dbConnect } from "@/database/mongoose";
import { COOKIES } from "@/utils/server/functions";
import { NextApiRequest, NextApiResponse } from "next";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { myToken } = req.cookies;

  if (!myToken) return res.status(401).json({ message: "unauthorized" });

  try {
    COOKIES.GET(myToken);
    const newCookie = COOKIES.DELETE();

    res.setHeader("Set-Cookie", newCookie);
    return res.status(200);
  } catch (error) {
    if (!myToken) return res.status(401).json({ message: "unauthorized" });
  }
}
