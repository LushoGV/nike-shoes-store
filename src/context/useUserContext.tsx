import { useState, createContext, useContext } from "react";
import { ProviderProps, iCart } from "@/interfaces";

interface context {
  token: string | null
  cart: iCart[];
  favorites: string[],
  setToken: React.Dispatch<React.SetStateAction<string | null>>
  handleCart: (order: iCart) => void;
  updateCartOrder: (productId:string, newSize:string, newQuantity:number) => void;
  handleFavorites: (productId: string) => void
}

const UserContext = createContext<context>({} as context);

export const UserProvider = ({ children }: ProviderProps) => {
  const [token, setToken] = useState<string | null>(null)
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
    <UserContext.Provider value={{ token, cart, favorites, setToken, handleCart, updateCartOrder, handleFavorites }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const { token, cart, favorites, setToken, handleCart, updateCartOrder, handleFavorites } = useContext(UserContext);
  return { token, cart, favorites, setToken, handleCart, updateCartOrder, handleFavorites };
};
