import User from "@/database/models/User";
import { dbConnect } from "@/database/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;
  const emailFound = await User.findOne({email: email});
  return res.status(200).json({ emailFound: emailFound ? true : false });
}
