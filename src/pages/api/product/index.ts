import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../database/mongoose";
import { product } from "@/interfaces";
import Product from "@/database/models/Product";
import { formatDBProducts } from "@/utils/serverFunctions";
import data from '../../../data2.json'

dbConnect();

type Data = {
  products: product[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


// for (let i = 0; i <= data.products.length-1; i++) {
//   const newProduct = {
//     title: data.products[i].title,
//     image: data.products[1].image,
//     images: data.products[1].images,
//     folder: data.products[1].folder,
//     description: data.products[1].description,
//     price: data.products[1].price,
//     subtitle: data.products[1].subtitle,
//     colors: data.products[1].colors,
//     style: data.products[1].style,
//   }

//   const productFound = await Product.findOne({title: newProduct.title})
//   if(!productFound) await Product.create(data.products[i])  
 
// }

console.log("first")

  const products = await Product.find();
  res.status(200).json({ products: formatDBProducts(products) });
}
