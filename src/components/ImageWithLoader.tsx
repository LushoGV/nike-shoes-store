import Image, { StaticImageData } from "next/image";
import { useState } from "react";

type Props = {
  src: string | StaticImageData;
  width: number;
  height: number;
  alt?: string;
  className?: string;
  loaderSize?: string;
  priority?: boolean
};

const ImageWithLoader = ({ src, width, height, alt, className, loaderSize, priority }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = () => {
    setIsLoading(false);
  };
  
  return (
    <div className="flex w-full items-center justify-center overflow-hidden bg-[#f6f6f6] rounded-sm">
      {isLoading && (
        <div
          className={`bg-[#f6f6f6] -z-50 ${loaderSize}`}
        ></div>
      )} 

       <Image
        src={src}
        width={width}
        height={height}
        alt={alt ? alt : ""}
        className={`h-auto w-auto ${className}`}
        onLoad={handleLoad}
        priority={priority}
      />
    </div>
  );
};

export default ImageWithLoader;
