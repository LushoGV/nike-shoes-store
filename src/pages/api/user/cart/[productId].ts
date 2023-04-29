import ItemCart from "@/database/models/ItemCart";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId } = req.query;
  const item = req.body

  try {
    switch (req.method) {
      case "DELETE":
        await ItemCart.findOneAndDelete({ productId: productId });
        return res.status(200).json("deleted");

      case "PUT":
        await ItemCart.findOneAndUpdate({productId}, item)
        return res.status(200).json("updated");

      default:
        const itemFound = await ItemCart.find({ productId: productId });
        return res.status(200).json({ 
          productId: itemFound[0].productId,
          quantity: itemFound[0].quantity,
          size: itemFound[0].size
         }) ;
    }
  } catch (error) {
    return res.status(400).json(error);
  }
}
