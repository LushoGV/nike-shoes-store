export const DOMAIN = "http://localhost:3000";

export const PRODUCTS = {
  ALL_PRODUCTS: "/api/product",
  ONE_PRODUCT: (product: string) => `/api/product/${product}`,
  CATEGORIES_LIST: "/api/product/category/list",
  ONE_CATEGORY: (category: string) => `/api/product/category/${category}`,
  SIZES: "/api/product/sizes",
};

export const AUTH = {
  SIGNUP: "/api/auth/signup",
  LOGIN: "/api/auth/login",
  REFRESH_TOKEN: "/api/auth/refreshToken",
  VERIFY_USER: "/api/auth/verifyUser",
};

export const USER = {}
