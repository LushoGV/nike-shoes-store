import { useState, useEffect } from "react";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import CartList from "@/components/cart/CartList";
import Layout from "@/layout/Layout";
import EmptyCart from "@/components/cart/EmptyCart";

import { useUserContext } from "@/context/useUserContext";
import { product } from ".";
import { getAllProducts } from "@/utils/dataFunctions";

type Props = {};

export interface iCartCard {
  product: product;
  size: string;
  quantity: number;
}

const Cart = (props: Props) => {
  const [cards, setCards] = useState<iCartCard[]>([]);
  const { cart } = useUserContext();

  const getCards = async () => {
    const data = await getAllProducts()

    const cardsArr = cart.map((element) => {
      const productFound = data.filter(
        (product: any) => product.id === element.productId
      );

      return {
        product: productFound[0],
        size: element.size,
        quantity: element.quantity,
      };
    });

    setCards(cardsArr);
  };

  const total = () => {
    let finalPrice = 0;

    cards.length > 0 &&
      cards.map((element) => {
        finalPrice += element.quantity * element.product.price;
      });

    return finalPrice;
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <Layout title={"Cart"}>
      {cards.length !== 0 ? (
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
