import { CATEGORIES_LIST, ALL_PRODUCTS, ONE_CATEGORY, ONE_PRODUCT, SIZES } from "@/endpoints";
import { iCategoriesList, iSizes } from "@/interfaces";
import { product } from "@/pages";

export const getAllProducts = async ():Promise<product[]> => {
    const res = await fetch(ALL_PRODUCTS);
    const { products } = await res.json();
    return products;
};

export const getProduct = async (productId: string):Promise<{product: product, images: string[]}> => {
    const res = await fetch(ONE_PRODUCT(productId));
    const { productData, images } = await res.json();
    return { product: productData, images };
};

export const getCategoriesList = async ():Promise<iCategoriesList[]> => {
    const res = await fetch(CATEGORIES_LIST);
    const { categoriesList } = await res.json();
    return categoriesList;
};

export const getCategory = async (categoryId: string):Promise<product[]> => {
    const res = await fetch(ONE_CATEGORY(categoryId));
    const { products } = await res.json();
    return products;
};

export const getSizes = async ():Promise<iSizes[]> => {
  const res = await fetch(SIZES)
  const sizes = res.json()
  return sizes
}

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
