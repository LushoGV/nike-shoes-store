import { useState, useEffect } from "react";
import { product } from "@/interfaces";
import { API } from "@/utils/client/functions";
import { Ctx } from "@/context";

import Button from "@/components/Button";
import Layout from "@/layout/Layout";
import PageHeader from "@/components/PageHeader";
import CartList from "@/components/cart/CartList";
import EmptyCart from "@/components/cart/EmptyCart";

export interface iCartCard {
  product: product;
  size: string;
  quantity: number;
  price: number;
}

const Cart = () => {
  const [cards, setCards] = useState<iCartCard[] | null>([]);
  const { UserCtx } = Ctx();

  const total = () => {
    let finalPrice = 0;

    cards !== null &&
      cards.map((element) => {
        finalPrice += element.quantity * element.product.price;
      });

    return finalPrice;
  };

  useEffect(() => {
    if(UserCtx.CART.GET && UserCtx.CART.GET.length > 0){
      setCards(UserCtx.CART.GET)
    }else setCards(null)
  }, [UserCtx.CART.GET]);

  return (
    <Layout title={"Cart"}>
      {cards !== null ? (
        <>
          <PageHeader text={"Shopping Cart"} />
          <section className="flex flex-col lg:flex-row gap-x-6 pt-6 md:p-6 relative w-full">
            <CartList cards={cards} />

            <div className="w-full pt-8 lg:pt-0 lg:max-w-md">
              <section className="flex flex-col gap-y-5 px-4 sticky top-[80px]">
                <h3 className="font-semibold text-lg">Summary</h3>

                <article className="flex flex-col py-6 px-4 gap-y-6 bg-[#F6F6F6] rounded-md mb-1">
                  <header className="flex items-center justify-between">
                    <h4 className="uppercase font-semibold">Subtotal</h4>
                    <span className="font-semibold text-red-400">
                      ${total()}
                    </span>
                  </header>

                  <p>
                    The subtotal reflects the total prive of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </p>
                </article>

                <Button text="checkout" black onClick={() => {}} />
              </section>
            </div>
          </section>
        </>
      ) : (
        <EmptyCart />
      )}
    </Layout>
  );
};

export default Cart;
