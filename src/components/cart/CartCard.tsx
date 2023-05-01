import Image from "next/image";
import { useState, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { API } from "@/utils/client/functions";
import { Ctx } from "@/context";
import Select from "../Select";
import Link from "next/link";

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

  const { UserCtx } = Ctx();

  const deleteItem = async () => {
    await API.CART.DELETE(props.id.toString());
    UserCtx.CART.DELETE(props.id.toString());
  };

  const updateItem = async () => {
    if (props.size !== size || props.quantity !== quantity) {
      const res = await API.CART.UPDATE(props.id, {
        productId: props.id,
        size: size,
        quantity: quantity,
        price: props.price,
      });
      res.ok && UserCtx.CART.UPDATE(props.id, size, quantity);
    }
  };

  useEffect(() => {
    updateItem();
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
            <h2 className="md:text-xl cursor-pointer hover:underline">
              <Link href={`/product/${props.id}`}>{props.title}</Link>
            </h2>
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

            <abbr title="delete">
              <BsTrash
                className="text-xl cursor-pointer hover:bg-slate-100 h-8 w-8 p-1 rounded-full hover:text-red-600"
                onClick={deleteItem}
              />
            </abbr>
          </div>
        </section>
      </section>
    </article>
  );
};

export default CartCard;
