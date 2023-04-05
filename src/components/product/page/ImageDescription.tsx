import { product } from "@/pages";
import { BsHeart } from "react-icons/bs";

import GridSizes from "./GridSizes";
import Button from "@/components/Button";

type Props = {
  product: product;
};

const ImageDescription = (props: Props) => {
  return (
    <section className="flex flex-col gap-y-14 mt-8 lg:mt-0">
      <header className="flex flex-col">
        <h1 className="font-semibold text-2xl lg:text-3xl ">
          {props.product?.title}
        </h1>
        <span className="py-1 text-lg">{props.product?.subtitle}</span>
        <span className="pt-4 text-lg">${props.product?.price}</span>
      </header>

      <GridSizes />

      <section className="grid gap-y-2">
        <Button text="add to cart" black />
        <Button text="favorites" icon={BsHeart} />
      </section>

      <section className="flex flex-col gap-5">
        <span className="text-slate-700 font-semibold">Product Details</span>
        <p className="max-w-sm">{props.product?.description}</p>

        <ul className="flex flex-col gap-1 px-5">
          <li className="list-disc">Color Shown: {props.product?.colors}</li>
          <li className="list-disc">Style: {props.product?.style}</li>
        </ul>
      </section>
    </section>
  );
};

export default ImageDescription;
