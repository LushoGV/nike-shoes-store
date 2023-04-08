import { product } from "@/pages";
import { BsHeart } from "react-icons/bs";
import { useState, useEffect } from "react";

import GridSizes from "./GridSizes";
import Button from "@/components/Button";
import { iCart } from "@/interfaces";
import { useUserContext } from "@/context/useUserContext";

type Props = {
  product: product;
  order?: iCart;
};

const ImageDescription = (props: Props) => {
  const [size, setSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);

  const { cart, favorites, handleCart, handleFavorites } = useUserContext();

  const changeSize = (newSize: string) => {
    newSize != size ? setSize(newSize) : setSize(undefined);
    setError(false);
  };

  const handleCartArr = () => {
    if (props.product.id && size) {
      let order = {
        productId: props.product.id,
        quantity: quantity,
        size,
      };

      handleCart(order);

      if (cart.find((element) => element.productId === props.product.id))
        setSize(undefined), setQuantity(1);
    } else setError(true);
  };

  const handleFavoritesArr = (productId: string) => {
    handleFavorites(productId);
  };

  const findOrder = () => {
    const orderFound = cart.filter(
      (element) => element.productId == props.product.id
    );

    if (orderFound.length > 0) {
      setSize(orderFound[0].size);
      setQuantity(orderFound[0].quantity);
    }
  };

  useEffect(() => {
    setSize(undefined);
    setQuantity(1);
    findOrder();
    setError(false);
  }, [props.product]);

  return (
    <section className="flex flex-col gap-y-14 mt-8 lg:mt-0">
      <header className="flex flex-col">
        <h1 className="text-3xl lg:text-3xl ">{props.product?.title}</h1>
        <span className="py-1 text-lg">{props.product?.subtitle}</span>
        <span className="pt-4 text-lg">${props.product?.price}</span>
      </header>

      <GridSizes error={error} sizeSelected={size} changeSize={changeSize} />

      <section className="grid gap-y-2">
        <Button
          text={
            cart.filter((element) => element.productId == props.product.id)[0]
              ? "remove to cart"
              : "add to cart"
          }
          black
          onClick={() => handleCartArr()}
        />
        <Button
          text={
            favorites.filter(
              (element) => element == props.product.id.toString()
            )[0]
              ? "Remove to favorites"
              : "favorites"
          }
          icon={BsHeart}
          onClick={() => handleFavoritesArr(props.product.id.toString())}
        />
      </section>

      <section className="flex flex-col gap-5">
        <span className="text-slate-700 font-semibold">Product Details</span>
        <p className="max-w-sm">{props.product?.description}</p>

        <ul className="flex flex-col gap-1 px-5">
          <li className="list-disc">Color Shown: {props.product?.colors}</li>
          <li className="list-disc">Style: {props.product?.style}</li>
        </ul>
      </section>
    </section>
  );
};

export default ImageDescription;
