import { NextApiRequest, NextApiResponse } from "next";
import Product from "@/database/models/Product";
import { DBProduct } from "@/interfaces";
import { formatDBProducts } from "@/utils/serverFunctions";
import { dbConnect } from "@/database/mongoose";

dbConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query;

  const productFound = await Product.findById(productId)

  if(!productFound) return res.status(401).json({message: "product not found"})

  const imagesArr = productFound.images.map((element:DBProduct) => (
    `/images/products/${productFound.folder}/${element}`
  ))

  return res
        .status(200)
        .json({ message: "ok", productData: formatDBProducts(productFound)[0], images: imagesArr });
}
