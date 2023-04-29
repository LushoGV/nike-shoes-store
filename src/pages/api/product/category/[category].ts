import { dbConnect } from "@/database/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Product from "@/database/models/Product";
import { CATEGORIES } from "@/utils/categories";
import { product } from "@/interfaces";
import { PRODUCT } from "@/utils/server/functions";

type Data = {
  name?: string | undefined;
  products?: product[];
  message: string;
};

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query } = req;
  const { category } = query;

  const products = await Product.find();

  if (category) {
    if (CATEGORIES.find((element) => element.id == +category)) {
      const productsArr = PRODUCT.FILTER_BY_CATEGORY(
        PRODUCT.FORMAT_TO_CLIENT(products),
        +category
      );
      return res.status(200).json({ products: productsArr, message: "ok" });
    }

    return res.status(400).json({ message: "error" });
  }

  return res.status(400).json({ message: "error" });
}
