import { NextApiRequest, NextApiResponse } from "next";
import { iCategoriesList } from "@/interfaces";
import Product from "@/database/models/Product";
import { dbConnect } from "@/database/mongoose";
import { PRODUCT } from "@/utils/server/functions";
import { CATEGORIES } from "@/utils/categories";

type Response = {
  categoriesList: iCategoriesList[];
};

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  let categoriesArr: iCategoriesList[] = [];

  const products = await Product.find();

  CATEGORIES.map((element) => {
    categoriesArr = categoriesArr.concat({
      id: element.id,
      title: element.title,
      count: PRODUCT.FILTER_BY_CATEGORY(products, element.id).length,
    });
  });

  return res.json({
    categoriesList: categoriesArr,
  });
}
