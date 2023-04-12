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
        <section className="bg-[#f6f6f6] flex items-center justify-center">
          <Image
            src={props.content.image}
            alt="test"
            width={340}
            height={270}
            className=""
          />
        </section>
        <footer className="py-4 px-2 flex flex-col">
          <h3 className="text-base">{props.content.title}</h3>

          <div className="flex flex-col text-slate-500 mb-3">
            <span className="leading-6">{props.content.subtitle}</span>
            <span className="leading-6">
              {props.content.colors.split("/").length === 1
                ? "1 Color"
                : `${props.content.colors.split("/").length} Colors`}
            </span>
          </div>

          <span className="">${props.content.price}</span>
        </footer>
      </Link>
    </article>
  );
};

export default Card;
