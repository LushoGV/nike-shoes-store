import { DBProduct, product } from "@/interfaces";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import {serialize} from 'cookie';

const SECRET_JWT = process.env.SECRET_JWT

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const validatePassword = async (password:string, userPassword:string):Promise<boolean> => {
  return await bcrypt.compare(password, userPassword)
};

export const createTokenCookie = (userId:string):string => {
    const token = jwt.sign({id: userId}, SECRET_JWT ? SECRET_JWT : "test")
    return serialize('myToken', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 *24 * 30,
      path: "/"
    })
}

export const formatDBProducts = (product: DBProduct[] | DBProduct): product[] => {

    const products = [product].flat()

  if (products.length > 1)
    return products.map((element) => ({
      id: element._id,
      title: element.title,
      subtitle: element.subtitle,
      image: element.image,
      price: element.price,
      description: element.description,
      colors: element.colors,
      style: element.style,
    }));

    return([{
        id: products[0]._id,
        title: products[0].title,
        subtitle: products[0].subtitle,
        image: products[0].image,
        price: products[0].price,
        description: products[0].description,
        colors: products[0].colors,
        style: products[0].style,
      }])
};

export const filterByCategory = (data: product[], categoryId: number) => {
  switch (categoryId) {
    case 1:
      return data.filter(
        (element) => !element.title.toLowerCase().split(" ").includes("air")
      );

    case 3:
      return data.filter(
        (element) =>
          element.title.toLowerCase().split(" ").includes("low") ||
          element.title.toLowerCase().split(" ").includes("pf")
      );

    case 4:
      return data.filter(
        (element) =>
          element.title.toLowerCase().split(" ").includes("air") &&
          !element.title.toLowerCase().split(" ").includes("low")
      );

    default:
      return data;
  }
};
