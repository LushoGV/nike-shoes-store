import Link from "next/link";
import sizes from "@/utils/sizes";

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
      <ul className={`grid grid-cols-2 gap-1 mt-3 ${ props.error && "border-red-400 rounded-md border-[1px]"}`}>
        {sizes.map((element, index) => (
          <li
            key={index}
            className={`border-[1px] py-[12px] text-center rounded-md cursor-pointer hover:border-slate-500 
            ${props.sizeSelected && props.sizeSelected.toLocaleLowerCase() == element.size.toLocaleLowerCase() ? "border-slate-500" : "border-slate-300"}  
            ${!element.enabled && "text-slate-300 bg-slate-100 font-normal border-slate-200 cursor-not-allowed"}`}
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
