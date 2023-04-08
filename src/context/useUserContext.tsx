import { useState, createContext, useContext } from "react";
import { iCart } from "@/interfaces";

type ProviderProps = {
  children: JSX.Element | JSX.Element[];
};

interface context {
  cart: iCart[];
  favorites: string[],
  handleCart: (order: iCart) => void;
  updateCartOrder: (productId:string, newSize:string, newQuantity:number) => void;
  handleFavorites: (productId: string) => void
}

const UserContext = createContext<context>({} as context);

export const UserProvider = ({ children }: ProviderProps) => {
  const [cart, setCart] = useState<iCart[]>([]);
  const [favorites, setFavorites] = useState<string[]>([])

  const updateCartOrder = (productId:string, newSize?:string, newQuantity?:number) => {   
      setCart(cart => cart.map((element) => {
        if(element.productId == productId){
          element.quantity = newQuantity ? newQuantity : element.quantity,
          element.size = newSize ? newSize : element.size
        }

        return element
      }))
  }

  const handleCart = (order: iCart) => {
    if(cart.find(element => element.productId === order.productId)){
      setCart(orders => orders.filter(element => element.productId !== order.productId))
    }else{
      setCart([...cart, order]);
    }
  };

  const handleFavorites = (productId: string) => {
    if(favorites.find(element => element === productId)){
      setFavorites(favorites => favorites.filter(element => element !== productId))
    }else{
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <UserContext.Provider value={{ cart, favorites, handleCart, updateCartOrder, handleFavorites }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const { cart, favorites, handleCart, updateCartOrder, handleFavorites } = useContext(UserContext);
  return { cart, favorites, handleCart, updateCartOrder, handleFavorites };
};
