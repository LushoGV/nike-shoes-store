import { DOMAIN, PRODUCTS } from "@/utils/endpoints";
import { iCategoriesList, iSizes, product } from "@/interfaces";

export const getAllProducts = async (): Promise<{ products: product[] }> => {
  const res = await fetch(DOMAIN + PRODUCTS.ALL_PRODUCTS);
  const { products } = await res.json();
  return products;
};

export const getProduct = async (productId: string): Promise<{ product: product; images: string[] }> => {
  const res = await fetch(DOMAIN + PRODUCTS.ONE_PRODUCT(productId));
  const { productData, images } = await res.json();
  return { product: productData, images };
};

export const getCategoriesList = async (): Promise<iCategoriesList[]> => {
  const res = await fetch(PRODUCTS.CATEGORIES_LIST);
  const { categoriesList } = await res.json();
  return categoriesList;
};

export const getCategory = async (categoryId: string): Promise<product[]> => {
  console.log(PRODUCTS.ONE_CATEGORY(categoryId));

  const res = await fetch(DOMAIN + PRODUCTS.ONE_CATEGORY(categoryId));
  const { products } = await res.json();
  return products;
};

export const getSizes = async (): Promise<iSizes[]> => {
  const res = await fetch(DOMAIN + PRODUCTS.SIZES);
  const sizes = res.json();
  return sizes;
};

