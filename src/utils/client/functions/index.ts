import { login, logout, signup, verifyUser } from "./Auth";
import { getAllProducts, getCategoriesList, getCategory, getProduct, getSizes} from "./Product";
import { addToCart, deleteCart, getCart, getItemCart, updateCart } from "./Cart";
import { addToFavorites, getFavorites, removeToFavorites } from "./Favorites";

const PRODUCTS = {
  GET: getAllProducts,
  GET_ONE: getProduct,
  SIZES: getSizes,
  CATEGORY: {
    GET: getCategory,
    LIST: getCategoriesList,
  },
};

const AUTH = {
  LOGIN: login,
  SIGN_UP: signup,
  LOG_OUT: logout,
  VERIFY_USER: verifyUser,
};

const CART = {
  GET: getCart,
  GET_ONE: getItemCart,
  CREATE: addToCart,
  UPDATE: updateCart,
  DELETE: deleteCart,
};

const FAVORITES = {
  GET: getFavorites,
  ADD: addToFavorites,
  REMOVE: removeToFavorites
}

export const API = {
  PRODUCTS,
  AUTH,
  CART,
  FAVORITES,
};
