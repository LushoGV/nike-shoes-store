import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/database/mongoose";
import { COOKIES } from "@/utils/server/functions";
import ItemCart from "@/database/models/ItemCart";

dbConnect()

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  const {myRefreshCookie} = req.cookies 
  const cookie = req.headers.cookie

  if (!cookie) return res.status(401).json({ message: "unauthorized" });

  try {
    
    if (req.method === "POST" && myRefreshCookie) {
      const {id}:any = COOKIES.GET(myRefreshCookie)
      const { productId, quantity, size, price } = req.body;

      const itemFound = await ItemCart.find({productId})
      
      if(itemFound.length > 0) return res.status(400).json({message: "already exist"})

      await ItemCart.create({
        productId,
        quantity,
        size,
        price,
        userId: id,
      });

      return res.status(200).json({message: "ok"});
    }

    let userId

    if(myRefreshCookie){
      const { id }: any = COOKIES.GET(myRefreshCookie);
      userId = id
    }else{
      const { id }: any = COOKIES.GET(cookie);
      userId = id
    }

    const cart = await ItemCart.find({userId: userId});
    if(cart.length === 0) throw Error("doesnt exist")
    
    return res.status(200).json({cart});
  } catch (error) {
    return res.status(200).json({cart: []});
  }
}
