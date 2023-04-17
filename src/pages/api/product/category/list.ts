import { NextApiRequest, NextApiResponse } from "next";

import { categories } from "../../../../utils/categories";
import { iCategoriesList } from "@/interfaces";
import { filterByCategory } from "@/utils/serverFunctions";
import Product from "@/database/models/Product";
import { dbConnect } from "@/database/mongoose";

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

  categories.map((element) => {
    categoriesArr = categoriesArr.concat({
      id: element.id,
      title: element.title,
      count: filterByCategory(products, element.id).length,
    });
  });

  return res.json({
    categoriesList: categoriesArr,
  });
}
