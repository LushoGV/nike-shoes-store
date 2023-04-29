import { NextApiRequest, NextApiResponse } from "next";
import Product from "@/database/models/Product";
import { DBProduct } from "@/interfaces";
import { dbConnect } from "@/database/mongoose";
import { PRODUCT } from "@/utils/server/functions";

dbConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query;
  
  const productFound = await Product.findById(productId)
  
  if([productFound].length === 0) return res.status(401).json({message: "product not found"})

  const imagesArr = productFound.images.map((element:DBProduct) => (
    `/images/products/${productFound.folder}/${element}`
  ))

  return res
        .status(200)
        .json({ message: "ok", productData: PRODUCT.FORMAT_TO_CLIENT(productFound)[0], images: imagesArr });
}
