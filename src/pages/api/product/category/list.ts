import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../../data2.json";

import { categories } from "../../../../categories";
import { filterByCategory } from "@/utils/dataFunctions";
import { iCategoriesList } from "@/interfaces";

type Response = {
    categoriesList: iCategoriesList[]
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  let categoriesArr: iCategoriesList[] = [];

  categories.map((element) => {
    categoriesArr = categoriesArr.concat({
      id: element.id,
      title: element.title,
      count: filterByCategory(data.products, element.id).length,
    });
  });

  return res.json({
    categoriesList: categoriesArr,
  });
}
