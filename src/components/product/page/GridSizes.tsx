import Link from "next/link";
import React from "react";
import data from "../../../data2.json";

type Props = {
  error?: boolean 
  sizeSelected?: string,
  changeSize: (newSize:string) => void
};

const GridSizes = (props: Props) => {
  return (
    <section>
      <div className="flex justify-between">
        <span className="font-semibold">Select Size</span>
        <Link href={'https://www.nike.com/size-fit/unisex-footwear-mens-based'} target="_blank" className="text-gray-500">Sizes Guide</Link>
      </div>
      <ul className="grid grid-cols-2 gap-1 mt-3">
        {data.sizes.map((element, index) => (
          <li
            key={index}
            className={`font-semibold border-[1px] py-[10px] text-center rounded-md cursor-pointer hover:border-slate-500 
            ${props.sizeSelected && props.sizeSelected == element.size ? "border-slate-500" : "border-slate-200"}  
            ${!element.enabled && "text-slate-300 bg-slate-50 font-normal border-slate-200 cursor-auto hover:border-slate-200"}`}
            onClick={() => element.enabled && props.changeSize(element.size)}
          >
            {element.size}
          </li>
        ))}
      </ul>
      {props.error && <p className="text-red-400 mt-1">You must select a size</p>}
    </section>
  );
};

export default GridSizes;
