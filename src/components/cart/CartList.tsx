import React from "react";
import CartCard from "./CartCard";
import { iCartCard } from "@/pages/cart";

type Props = {
  cards: iCartCard[];
};

const CartList = (props: Props) => {
  return (
    <section className="w-full px-4">
      <h3 className="font-semibold text-lg first-letter:uppercase">
        cart items
      </h3>

      <ul className="flex flex-col w-full">
        {props.cards.map((element, index) => (
          <li key={index}>
            <CartCard
              id={element.product.id.toString()}
              price={element.product.price}
              title={element.product.title}
              subtitle={element.product.subtitle}
              image={element.product.image}
              quantity={element.quantity}
              size={element.size}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CartList;
