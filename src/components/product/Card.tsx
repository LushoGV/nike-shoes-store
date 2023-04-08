import { product } from "@/pages";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  content: product;
};

const Card = (props: Props) => {
  return (
    <article className="hover:scale-[1.03] cursor-pointer duration-300 bg-white">
      <Link href={`/product/${props.content.id}`}>
        <section className="bg-[#F4F4F4] flex items-center justify-center">
          <Image
            src={props.content.image}
            alt="test"
            width={340}
            height={270}
            className=""
          />
        </section>
        <footer className="py-4 px-2">
          <h3 className="text-lg lg:text-xl">{props.content.title}</h3>
          <div className="flex justify-between">
            <span className="text-slate-500">{props.content.subtitle}</span>
            <span className="text-green-500">${props.content.price}</span>
          </div>
        </footer>
      </Link>
    </article>
  );
};

export default Card;
