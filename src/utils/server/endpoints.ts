export const DOMAIN = process.env.DOMAIN || "http://localhost:3000";

const PRODUCTS = {
  ALL_PRODUCTS: "/api/product",
  ONE_PRODUCT: (product: string) => `/api/product/${product}`,
  CATEGORIES_LIST: "/api/product/category/list",
  ONE_CATEGORY: (category: string) => `/api/product/category/${category}`,
  SIZES: "/api/product/sizes",
};

const AUTH = {
  SIGNUP: "/api/auth/signup",
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  VERIFY_TOKEN: "/api/auth/token/verify-token",
  REFRESH_TOKEN: "/api/auth/token/refresh-token",
  REFRESH_ACCESS_TOKEN: "/api/auth/token/refresh-access-token",
  VERIFY_USER: "/api/auth/verifyUser",
};

const USER = {
  CART: {
    GET_ALL: "/api/user/cart",
    GET_ONE: (itemId:string) => `/api/user/cart/${itemId}`,
    ADD: "/api/user/cart",
    UPDATE: (itemId:string) => `/api/user/cart/${itemId}`,
    DELETE: (itemId:string) => `/api/user/cart/${itemId}`,
  },
  FAVORITES: "/api/user/favorites"
}

export const ENDPOINTS = {
  PRODUCTS,
  AUTH,
  USER
}
