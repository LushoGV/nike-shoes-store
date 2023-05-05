import ItemCart from "@/database/models/ItemCart";
import { COOKIES } from "@/utils/server/functions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { myRefreshCookie } = req.cookies;
  const cookie = req.headers.cookie;
  const { productId } = req.query;
  const item = req.body;
  let userId;

  if (!cookie && !myRefreshCookie) return res.status(401).json("unauthorized");

  if (myRefreshCookie) {
    const { id }: any = COOKIES.GET(myRefreshCookie);
    userId = id;
  } else if (cookie) {
    const { id }: any = COOKIES.GET(cookie);
    userId = id;
  }

  try {
    switch (req.method) {
      case "DELETE":
        await ItemCart.findOneAndDelete({ productId: productId, userId: userId });
        return res.status(200).json("deleted");

      case "PUT":
        await ItemCart.findOneAndUpdate({productId, userId: userId}, {...item, userId: userId})
        return res.status(200).json("updated");

      default:
        const itemFound = await ItemCart.find({ productId: productId, userId: userId });
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
