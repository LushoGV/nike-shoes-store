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

const ImageWithLoader = (props : Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = () => {
    setIsLoading(false);
  };
  
  return (
    <div className="flex w-full items-center justify-center overflow-hidden bg-[#f6f6f6] rounded-sm">
      {isLoading  && (<div className={`bg-[#f6f6f6] -z-50 ${props.loaderSize}`}></div>)} 

       <Image
        src={props.src}
        width={props.width}
        height={props.height}
        alt={props.alt ? props.alt : ""}
        className={`h-auto w-auto ${props.className}`}
        onLoad={handleLoad}
        priority={props.priority}
      />
    </div>
  );
};

export default ImageWithLoader;
