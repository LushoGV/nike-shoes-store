import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../database/mongoose";
import { product } from "@/interfaces";
import { PRODUCT } from "@/utils/server/functions";
import Product from "@/database/models/Product";

dbConnect();

type Data = {
  products: product[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const products = await Product.find();
  res.status(200).json({ products: PRODUCT.FORMAT_TO_CLIENT(products) });
}
