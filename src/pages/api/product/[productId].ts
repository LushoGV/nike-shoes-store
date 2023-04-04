import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import data from "../../../data2.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query;
  let imagesArr: string[] = [];

  const product = data.products.filter(
    (element, index) => element.id.toString() == productId
  );

  fs.readdir(`.//public//images//products//p${productId}`, (error, files) => {
    if (!error) {
      files.forEach((file) => {
        if (!file.startsWith("thumbnail")) {
          imagesArr = imagesArr.concat(
            `/images/products/p${productId}/${file}`
          );
        }
      });
      return res
        .status(200)
        .json({ message: "ok", productData: product[0], images: imagesArr });
    } else {
      console.log(error);
      return res.status(400).json({ message: "error" });
    }
  });
}
