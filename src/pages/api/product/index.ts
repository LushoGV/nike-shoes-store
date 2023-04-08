import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../../data2.json'

import { product } from '@/pages'

type Data = {
  products: product[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const productsArr = data.products.map((element, index) => {
    return element 
  })
  res.status(200).json({products: productsArr})
}
