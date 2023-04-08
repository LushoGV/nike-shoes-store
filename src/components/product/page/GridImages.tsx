import Image from "next/image";
import { useState, useEffect } from "react";

type Props = {
  images: string[];
};

const GridImages = (props: Props) => {
  const [imageSelected, setImageSelected] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImageSelected(0);
    setImages(props.images);
  }, [props.images]);

  return (
    <section className="flex flex-col-reverse md:flex-row sticky gap-x-3 top-[20px] md:mr-4">
      {images.length > 0 &&
        <>
        <ul className="grid grid-cols-4 md:grid-cols-5 gap-x-2 gap-y-2 min-w-[70px] w-full md:w-auto md:flex mt-6 md:mt-0 md:flex-col">
        {images.map((element, index) => (
          <li
            key={index}
            className={`flex w-full transition-all cursor-pointer ${
              index === imageSelected && "brightness-75 cursor-auto"
            }`}
            onClick={() => setImageSelected(index)}
          >
            <Image
              src={element}
              width={75}
              height={75}
              alt=""
              className="rounded-md lg:min-w-[70px] w-full md:w-auto overflow-hidden"
            />
          </li>
        ))}
      </ul>
      <Image
        src={images[imageSelected]}
        alt=""
        width={400}
        height={100}
        className="w-full lg:w-auto lg:overflow-hidden rounded-md"
      />
      </>}
    </section>
  );
};

export default GridImages;
