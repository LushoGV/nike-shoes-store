import { categories } from "@/categories";
import type { NextApiRequest, NextApiResponse } from "next";
import data from '../../../../data2.json'
import { product } from "@/pages";
import { filterByCategory } from "@/utils/dataFunctions";

type Data = {
  name?: string | undefined;
  products?: product[]
  message: string
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { query } = req;
  const { category } = query;
  
  if(category){
    if(categories.find(element => element.id == +category)){
        const productsArr = filterByCategory(data.products, +category)
        return res.status(200).json({ products: productsArr, message: "ok" });
    }

    return res.status(400).json({message: "error"})
  }

  return res.status(400).json({message: "error"})
}
