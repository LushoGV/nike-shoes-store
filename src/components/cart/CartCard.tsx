import Image from "next/image";
import { useState } from "react";

import testImage from "../../assets/products/p1/thumbnail.jpeg";
import { BsTrash } from "react-icons/bs";

type Props = {
  title: string;
  subtitle: string;
  price: number;
};

const CartCard = (props: Props) => {
  const [size, setSize] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(2);

  return (
    <article className="flex gap-x-4 border-b-[1px] border-slate-200 py-4">
      <Image
        alt=""
        src={testImage}
        width={100}
        height={80}
        className="rounded-md w-16 h-16 md:w-auto md:h-auto"
      />

      <section className="w-full flex flex-col gap-y-4">
        <header className="flex justify-between gap-x-4 w-full">
          <div className="flex flex-col">
            <h2 className="md:text-xl font-semibold">{props.title}</h2>
            <span className="text-sm md:text-base">{props.subtitle}</span>
          </div>

          <span>${props.price}</span>
        </header>

        <section className="w-full">
          <div className="flex items-center">
            <div className="mr-5 md:mr-10 text-sm md:text-base">
              <span className="font-semibold">Size: </span>
              <span>{size}</span>
            </div>

            <div className="mx-auto ml-0 text-sm md:text-base">
              <span className="font-semibold">Quantity: </span>
              <span>{quantity}</span>
            </div>

            <BsTrash className="text-xl" />
          </div>
        </section>
      </section>
    </article>
  );
};

export default CartCard;
