import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import CartList from "@/components/cart/CartList";
import Layout from "@/layout/Layout";
import Image from "next/image";
import { useState } from "react";

import emptyCart from "../assets/empty-cart.jpg";

type Props = {};

const Cart = (props: Props) => {
  const [cards, setCards] = useState([""]);

  return (
    <Layout title={"Cart"}>
      {cards.length !== 0 ? (
        <>
          <PageHeader text={"Shopping Cart"} />
          <section className="flex flex-col lg:flex-row gap-x-6 pt-6 md:p-6 relative w-full">
            <CartList />

            <div className="w-full pt-8 lg:pt-0 lg:max-w-md">
              <section className="flex flex-col gap-y-5 px-4 sticky top-[80px]">
                <h3 className="font-semibold text-lg">Summary</h3>

                <article className="flex flex-col py-6 px-4 gap-y-6 bg-[#F6F6F6] rounded-md mb-1">
                  <header className="flex items-center justify-between">
                    <h4 className="uppercase font-semibold">Subtotal</h4>
                    <span className="font-semibold text-red-400">$1231</span>
                  </header>

                  <p>
                    The subtotal reflects the total prive of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </p>
                </article>

                <Button text="checkout" black />
              </section>
            </div>
          </section>
        </>
      ) : (
        <>
          <Image alt="" src={emptyCart} width={350} height={100} className="m-auto" />
          <section className="max-w-sm mx-auto flex flex-col gap-y-3">
            <h2 className="text-2xl font-semibold mx-auto">
              Your cart is empty
            </h2>

            <p className="text-center">
              Looks like you have not added anything in your cart. Go ahead and
              explore top categories
            </p>

            <div className="max-w-[230px] w-full mx-auto mt-2">
              <Button text="Continue Shopping" black />
            </div>
          </section>
        </>
      )}
    </Layout>
  );
};

export default Cart;
