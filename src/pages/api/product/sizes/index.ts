import { NextApiRequest, NextApiResponse } from "next";
import { iSizes } from "@/interfaces";
import data from "../../../../data2.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<iSizes[]>
) {
  return res.status(200).json(data.sizes);
}
