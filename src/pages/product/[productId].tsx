import { useEffect, useState } from "react";
import GridImages from "@/components/product/page/GridImages";

import Layout from "@/layout/Layout";
import Grid from "@/components/product/Grid";

import data from "../../data2.json";
import { product } from "..";
import { useRouter } from "next/router";
import { iCart } from "@/interfaces";
import ImageDescription from "@/components/product/page/ImageDescription";
import Loader from "@/components/Loader";
import { getProduct } from "@/utils/dataFunctions";

type Props = {};

const Index = (props: Props) => {
  const [product, setProduct] = useState<product>();
  const [imagesArr, setImagesArr] = useState<string[]>([]);
  const [order, setOrder] = useState<iCart>()

  const { query } = useRouter();

  const getData = async () => {
    if(query.productId){
      const {product, images} = await getProduct(query.productId?.toString())
      setImagesArr(images);
      setProduct(product);
    }
  };

  useEffect(() => {
    getData();
  }, [query]);

  return (
    <Layout title={product?.title}>
      {imagesArr ? (
        <>
          <section className="flex flex-col gap-y-8 lg:gap-y-0 lg:gap-x-4 lg:flex-row mx-auto px-4 lg:px-16">
            {product && (
              <>
                <div>
                  <GridImages images={imagesArr} />
                </div>
                <ImageDescription product={product} order={order} />
              </>
            )}
          </section>
          <section className="mx-auto lg:px-11 mt-20 mb-16">
            <span className="px-6 text-2xl">
              You Might Also Like
            </span>
            <Grid content={data.products.slice(0, 3)} />
          </section>
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default Index;
