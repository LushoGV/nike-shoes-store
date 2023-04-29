import ImageWithLoader from "@/components/ImageWithLoader";
import { useState, useEffect } from "react";

const GridImages = ({images}: {images: string[]}) => {
  const [imageSelected, setImageSelected] = useState(0);
  const [imagesArr, setImagesArr] = useState<string[]>([]);

  useEffect(() => {
    setImageSelected(0);
    setImagesArr(images);
  }, [images]);

  return (
    <section className="flex flex-col-reverse md:flex-row sticky gap-x-3 top-[20px] md:mr-4">
      {images.length > 0 && (
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
                <ImageWithLoader
                  src={element}
                  width={75}
                  height={100}
                  alt=""
                  loaderSize="w-[90px] h-[100px]"
                  className="rounded-md overflow-hidden"
                />
              </li>
            ))}
          </ul>
          {imagesArr.length > 0 && <ImageWithLoader
            src={imagesArr[imageSelected ? imageSelected : 0]}
            alt=""
            width={400}
            height={100}
            priority
            loaderSize="w-full h-[500px] md:w-[605px] lg:h-[700px]"
            className="lg:overflow-hidden rounded-md"
          />}
        </>
      )}
    </section>
  );
};

export default GridImages;
