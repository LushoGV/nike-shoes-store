import { useState, useEffect, createContext, useContext } from "react";
import { ProviderProps, iCart, product } from "@/interfaces";
import { API } from "@/utils/client/functions";
import { Ctx } from ".";
import { iCartCard } from "@/pages/cart";

interface context {
  CART: {
    GET: iCartCard[];
    ADD: (newOrder: iCart) => void;
    DELETE: (productId: string) => void;
    UPDATE: (productId: string, newSize?: string, newQuantity?: number) => void;
  };
  FAVORITES: {
    GET: product[];
    ADD: (id: string) => void;
    REMOVE: (id: string) => void;
  };
  PRODUCTS: product[],
}

const UserContext = createContext<context>({} as context);

export const UserProvider = ({ children }: ProviderProps) => {
  const [products, setProducts] = useState<product[]>([])
  const [virtualCart, setVirtualCart] = useState<iCart[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { AuthCtx } = Ctx();

  const getCartAndFavorites = async () => {
    const productsData = await API.PRODUCTS.GET();
    const cartData = await API.CART.GET();
    const favoritesData = await API.FAVORITES.GET();

    setProducts(productsData)
    setFavorites(favoritesData);
    setVirtualCart(cartData);
  };

  const addToCart = (newOrder: iCart) => {
    setVirtualCart(virtualCart ? virtualCart.concat(newOrder) : [newOrder]);
  };
  const deleteFromCart = (productId: string) => {
    setVirtualCart(
      virtualCart.filter((element) => element.productId !== productId)
    );
  };
  const updateCart = (
    productId: string,
    newSize?: string,
    newQuantity?: number
  ) => {
    setVirtualCart((virtualCart) =>
      virtualCart.map((element) => {
        if (element.productId == productId) {
          (element.quantity = newQuantity ? newQuantity : element.quantity),
            (element.size = newSize ? newSize : element.size);
        }

        return element;
      })
    );
  };

  const getCart = virtualCart && virtualCart.map((element) => {
    const productFound = products.filter(
      (item) => item.id === element.productId
    )[0];

    return {
      product: productFound,
      size: element.size,
      quantity: element.quantity,
      price: productFound.price,
    };
  });

  const getFavorites = favorites && favorites.map((element) => {
    const productFound = products.filter(
      (item) => item.id.toString() === element
    )[0];
    
    return {
      id: productFound.id,
      title: productFound.title,
      subtitle: productFound.subtitle,
      image: productFound.image,
      price: productFound.price,
      description: productFound.description,
      colors: productFound.colors,
      style: productFound.style,
    }
  })

  const addToFavorites = (id: string) => {
    setFavorites(favorites.concat(id));
  };

  const removeToFavorites = (id: string) => {
    setFavorites(favorites.filter((element) => element !== id));
  };

  const CART = {
    GET: getCart,
    ADD: addToCart,
    DELETE: deleteFromCart,
    UPDATE: updateCart,
  };

  const FAVORITES = {
    GET: getFavorites,
    ADD: addToFavorites,
    REMOVE: removeToFavorites,
  };

  const PRODUCTS = products

  useEffect(() => {
    if (AuthCtx.isAuthenticated) {
      getCartAndFavorites();
    }
  }, [AuthCtx.isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        CART,
        FAVORITES,
        PRODUCTS
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const { CART, FAVORITES, PRODUCTS } = useContext(UserContext);
  return {
    CART,
    FAVORITES,
    PRODUCTS,
  };
};
