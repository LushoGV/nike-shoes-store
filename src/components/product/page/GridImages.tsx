import Image from "next/image";
import { useState } from "react";

import test1 from "../../../assets/test/693cc53f-d228-472a-bf17-0a2e2c42daf7.webp";
import test2 from "../../../assets/test/38175751-fd04-468e-8049-c772d41f5397.webp";
import test3 from "../../../assets/test/air-jordan-1-mid-se-craft-shoes-RmP7J6.jpeg";
import test4 from "../../../assets/test/cb9e0841-2e25-42b5-89f8-71a958794c2a.webp";

type Props = {};

const GridImages = (props: Props) => {
  const [imageSelected, setImageSelected] = useState(0);
  const images = [test1, test2, test3, test4];

  return (
    <section className="flex flex-col-reverse justify-center md:flex-row sticky top-[95px] md:mr-4">
      <ul className="flex w-full md:w-auto mt-6 md:mt-0 md:flex-col">
        {images.map((element, index) => (
          <li
            key={index}
            className={`flex w-full transition-all lg:px-4 mb-4 cursor-pointer ${index === imageSelected && "brightness-75 cursor-auto"}`}
            onClick={() => setImageSelected(index)}
          >
            <Image src={element} width={75} height={75} alt="" className=" rounded-md min-w-[70px]" />
          </li>
        ))}
      </ul>
      <Image src={images[imageSelected]} alt="" width={560} height={100} className="w-full md:w-auto rounded-md" />
    </section>
  );
};

export default GridImages;
