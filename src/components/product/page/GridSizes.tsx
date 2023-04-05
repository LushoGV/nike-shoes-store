import Link from "next/link";
import React from "react";
import data from "../../../data2.json";

type Props = {};

const GridSizes = (props: Props) => {
  return (
    <section className="">
      <div className="flex justify-between">
        <span className="font-semibold">Select Size</span>
        <Link href={'https://www.nike.com/size-fit/unisex-footwear-mens-based'} target="_blank" className="text-gray-500">Sizes Guide</Link>
      </div>
      <ul className="grid grid-cols-2 gap-1 mt-3">
        {data.sizes.map((element, index) => (
          <li
            key={index}
            className={`font-semibold border-[1px] border-slate-200 py-[10px] text-center rounded-md cursor-pointer hover:border-slate-500 ${
              !element.enabled &&
              "text-slate-300 bg-slate-50 font-normal border-slate-200 cursor-auto hover:border-slate-200"
            }`}
          >
            {element.size}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GridSizes;
