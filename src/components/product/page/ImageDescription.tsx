import { BsHeart } from "react-icons/bs";
import { useState, useEffect } from "react";

import Button from "@/components/Button";
import GridSizes from "./GridSizes";
import { iCart, product } from "@/interfaces";
import { API } from "@/utils/client/functions";
import { Ctx } from "@/context";

type Props = {
  product: product;
  order: iCart | null;
};

const ImageDescription = ({ product, order }: Props) => {
  const [size, setSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [button, setButton] = useState({
    cart: order ? true : false,
    favorites: false,
  });

  const { AuthCtx, UserCtx, ModalCtx } = Ctx();

  const handleButtonState = (isToDelete?: boolean) => {
    if (isToDelete) {
      setButton({ ...button, cart: !button.cart });
      UserCtx.CART.DELETE(product.id.toString());
    } else if (size) {
      setButton({ ...button, cart: !button.cart });
      UserCtx.CART.ADD({
        productId: product.id,
        size,
        quantity: 1,
        price: product.price,
      });
    }
  };

  const changeSize = (newSize: string) => {
    newSize != size ? setSize(newSize) : setSize(undefined);
    setError(false);
  };

  const handleCart = async () => {
    try {
      if (!size) return setError(true);

      if (!button.cart && size) {
        const res = await API.CART.CREATE({
          productId: product.id,
          size,
          quantity: 1,
          price: product.price,
        });
        res.status === 200 && handleButtonState();
      } else {
        const res = await API.CART.DELETE(product.id.toString());
        res.status === 200 && handleButtonState(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorites = async () => {
    if (!button.favorites) {
      const res = await API.FAVORITES.ADD(product.id.toString())
      res.status === 200 && UserCtx.FAVORITES.ADD(product.id.toString());
    } else {
      const res = await API.FAVORITES.REMOVE(product.id.toString())
      res.status === 200 && UserCtx.FAVORITES.REMOVE(product.id.toString()); 
    }
  };

  useEffect(() => {
    const getOrder = () => {
      setButton({ ...button, cart: order ? true : false });
  
      if (order) {
        setSize(order.size);
        setQuantity(order.quantity);
      } else {
        setSize(undefined), setQuantity(1);
      }
    };
    
    getOrder();
    setError(false);
  }, [product, order]);

  useEffect(() => {
    if(UserCtx.FAVORITES.GET){
      setButton({
        ...button,
        favorites: UserCtx.FAVORITES.GET.find(
          (element) => element.id == product.id
        )
          ? true
          : false,
      });
    }else setButton({...button, favorites: false})
    
  },[UserCtx.FAVORITES.GET])

  return (
    <section className="flex flex-col gap-y-14 mt-8 lg:mt-0">
      <header className="flex flex-col">
        <h1 className="text-3xl lg:text-3xl ">{product?.title}</h1>
        <span className="py-1 text-lg">{product?.subtitle}</span>
        <span className="pt-4 text-lg">${product?.price}</span>
      </header>

      <GridSizes error={error} sizeSelected={size} changeSize={changeSize} />

      <section className="grid gap-y-2">
        <Button
          text={button.cart ? "remove to cart" : "add to cart"}
          black
          onClick={async () =>
            AuthCtx.isAuthenticated
              ? await handleCart()
              : ModalCtx.activeAuthModal()
          }
        />
        <Button
          text={
            button.favorites
              ? "Remove to favorites"
              : "favorites"
          }
          icon={BsHeart}
          onClick={() =>
            AuthCtx.isAuthenticated
              ? handleFavorites()
              : ModalCtx.activeAuthModal()
          }
        />
      </section>

      <section className="flex flex-col gap-5">
        <span className="text-slate-700 font-semibold">Product Details</span>
        <p className="lg:max-w-sm">{product?.description}</p>

        <ul className="flex flex-col gap-1 px-5">
          <li className="list-disc">Color Shown: {product?.colors}</li>
          <li className="list-disc">Style: {product?.style}</li>
        </ul>
      </section>
    </section>
  );
};

export default ImageDescription;
