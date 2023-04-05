import React from "react";
import CartCard from "./CartCard";

type Props = {};

const CartList = (props: Props) => {
  return (
      <section className="w-full px-4">
        <h3 className="font-semibold text-lg first-letter:uppercase">
          cart items
        </h3>

        <ul className="flex flex-col w-full">
          <li>
            <CartCard
              price={1231}
              title="Air Jordan 1 Mid SE"
              subtitle="Men's Shoes"
            />
          </li>
          <li>
            <CartCard
              price={1231}
              title="Air Jordan 1 Mid SE"
              subtitle="Men's Shoes"
            />
          </li>
          <li>
            <CartCard
              price={1231}
              title="Air Jordan 1 Mid SE"
              subtitle="Men's Shoes"
            />
          </li>
        </ul>
    </section>
  );
};

export default CartList;
