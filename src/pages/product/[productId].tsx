import { useEffect, useState } from "react";
import GridImages from "@/components/product/page/GridImages";

import Layout from "@/layout/Layout";
import Grid from "@/components/product/Grid";

import data from "../../data2.json";
import { product } from "..";
import { useRouter } from "next/router";
import ImageDescription from "@/components/product/page/ImageDescription";
import Loader from "@/components/Loader";

type Props = {};

const Index = (props: Props) => {
  const [product, setProduct] = useState<product>();
  const [imagesArr, setImagesArr] = useState<string[]>([]);
  const { query } = useRouter();

  const getData = async () => {
    const res = await fetch(`/api/product/${query.productId}`);
    const { productData, images } = await res.json();
    console.log(productData)
    setImagesArr(images);
    setProduct(productData);
  };

  useEffect(() => {
    getData();
  }, [query]);

  return (
    <Layout title={product?.title}>
      {imagesArr ? (
        <>
          <div className="flex flex-col lg:flex-row mx-auto px-4 lg:px-16">
            {product && (
              <>
                <div>
                  <GridImages images={imagesArr} />
                </div>
                <ImageDescription product={product} />
              </>
            )}
          </div>
          <div className="mx-auto lg:px-16 mt-20 mb-16">
            <span className="px-6 font-semibold text-xl">
              You Might Also Like
            </span>
            <Grid content={data.products.slice(0, 3)} />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default Index;
