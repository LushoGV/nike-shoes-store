import Image from "next/image";
import { useState, useEffect } from "react";

type Props = {
  images:string[]
};

const GridImages = (props: Props) => {
  const [imageSelected, setImageSelected] = useState(0);
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    setImageSelected(0)
    setImages(props.images)
  },[props.images])

  return (
    <section className="flex flex-col-reverse justify-center md:flex-row sticky top-[20px] md:mr-4">
      <ul className="flex w-full md:w-auto mt-6 md:mt-0 md:flex-col">
        {images.map((element, index) => (
          <li
            key={index}
            className={`flex w-full transition-all lg:px-4 mb-4 cursor-pointer ${
              index === imageSelected && "brightness-75 cursor-auto"
            }`}
            onClick={() => setImageSelected(index)}
          >
            <Image
              src={element}
              width={75}
              height={75}
              alt=""
              className=" rounded-md min-w-[70px]"
            />
          </li>
        ))}
      </ul>
      <Image
        src={images[imageSelected]}
        alt=""
        width={560}
        height={100}
        className="w-full md:w-auto rounded-md"
      />
    </section>
  );
};

export default GridImages;
