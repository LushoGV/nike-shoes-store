import Favorites from "@/database/models/Favorites";
import { COOKIES } from "@/utils/server/functions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { myRefreshCookie } = req.cookies;
    if (!myRefreshCookie) return res.status(401).json({});

    const { id }: any = COOKIES.GET(myRefreshCookie);
    const { productId } = req.body;
   
    switch (req.method) {
      case "POST":        
        await Favorites.create({ userId: id, productId: productId });
        return res.status(200).json("created");

      case "DELETE":
        await Favorites.findOneAndRemove({ userId: id, productId: productId });
        return res.status(200).json("deleted");

      default:
        const favoritesArr = await Favorites.find({ userId: id });
        const favorites = favoritesArr.map(element => (element.productId))
        console.log(favorites)

        return res.status(200).json({ favorites });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
}
