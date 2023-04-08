import Image from "next/image";
import { useState, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { useUserContext } from "@/context/useUserContext";
import Select from "../Select";

type Props = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

const CartCard = (props: Props) => {
  const [size, setSize] = useState<string>(props.size);
  const [quantity, setQuantity] = useState<number>(props.quantity);

  const { updateCartOrder } = useUserContext();

  useEffect(() => {
    updateCartOrder(props.id, size, quantity);
  }, [size, quantity]);

  return (
    <article className="flex gap-x-4 border-b-[1px] border-slate-200 py-4">
      {props.image && (
        <Image
          alt=""
          src={props.image}
          width={100}
          height={80}
          className="rounded-md w-16 h-16 md:w-auto md:h-auto"
        />
      )}

      <section className="w-full flex flex-col gap-y-4">
        <header className="flex justify-between gap-x-4 w-full">
          <div className="flex flex-col">
            <h2 className="md:text-xl">{props.title}</h2>
            <span className="text-sm md:text-base">{props.subtitle}</span>
          </div>

          <span>${props.price}</span>
        </header>

        <section className="w-full">
          <div className="flex items-center">
            <div className="mr-5 md:mr-10 text-sm md:text-base">
              <span className="text-slate-700 font-semibold">Size: </span>
              <Select
                initialValue={props.size}
                type="size"
                onChange={(newSize: string) => setSize(newSize)}
              />
            </div>

            <div className="mx-auto ml-0 text-sm md:text-base">
              <span className="text-slate-700 font-semibold">Quantity: </span>
              <Select
                initialValue={props.quantity}
                type="quantity"
                onChange={(newQuantity: number) => setQuantity(newQuantity)}
              />
            </div>

            <BsTrash className="text-xl" />
          </div>
        </section>
      </section>
    </article>
  );
};

export default CartCard;
