import { iCategoriesList, iSizes, product } from "@/interfaces";
import { DOMAIN, ENDPOINTS } from "../../server/endpoints";

export const getAllProducts = async (withDomain?:boolean): Promise<product[]> => {
  const URL = withDomain
  ? `${DOMAIN}${ENDPOINTS.PRODUCTS.ALL_PRODUCTS}`
  : ENDPOINTS.PRODUCTS.ALL_PRODUCTS;
  const res = await fetch(URL);
  const { products } = await res.json();
  return products;
};

export const getProduct = async (productId: string): Promise<{ product: product; images: string[] }> => {
  const res = await fetch(DOMAIN + ENDPOINTS.PRODUCTS.ONE_PRODUCT(productId));
  const { productData, images } = await res.json();
  return { product: productData, images };
};

export const getCategoriesList = async (): Promise<iCategoriesList[]> => {
  const res = await fetch(ENDPOINTS.PRODUCTS.CATEGORIES_LIST);
  const { categoriesList } = await res.json();
  return categoriesList;
};

export const getCategory = async (categoryId: string): Promise<product[]> => {
  console.log(ENDPOINTS.PRODUCTS.ONE_CATEGORY(categoryId));

  const res = await fetch(DOMAIN + ENDPOINTS.PRODUCTS.ONE_CATEGORY(categoryId));
  const { products } = await res.json();
  return products;
};

export const getSizes = async (): Promise<iSizes[]> => {
  const res = await fetch(DOMAIN + ENDPOINTS.PRODUCTS.SIZES);
  const sizes = res.json();
  return sizes;
};

