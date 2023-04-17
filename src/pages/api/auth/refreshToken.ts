import { dbConnect } from "@/database/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

}
