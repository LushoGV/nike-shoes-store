import { dbConnect } from "@/database/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Product from "@/database/models/Product";
import { categories } from "@/utils/categories";
import { product } from "@/interfaces";
import { filterByCategory, formatDBProducts } from "@/utils/serverFunctions";

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
    if (categories.find((element) => element.id == +category)) {
      const productsArr = filterByCategory(
        formatDBProducts(products),
        +category
      );
      return res.status(200).json({ products: productsArr, message: "ok" });
    }

    return res.status(400).json({ message: "error" });
  }

  return res.status(400).json({ message: "error" });
}
