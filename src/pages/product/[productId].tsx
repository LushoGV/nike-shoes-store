import Layout from "@/layout/Layout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GridImages from "@/components/product/page/GridImages";
import { BsHeart } from "react-icons/bs";

import data from "../../data2.json";
import { product } from "..";
import { useRouter } from "next/router";
import ImageDescription from "@/components/product/page/ImageDescription";
import Grid from "@/components/product/Grid";

type Props = {};

const Index = (props: Props) => {
  const [product, setProduct] = useState<product>();
  const { query } = useRouter();

  const getData = () => {
    const productFound = data.products.filter(
      (element) => element.id.toString() === query.productId
    );
    setProduct(productFound[0]);
  };

  useEffect(() => {
    getData();
  }, [query]);

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row mx-auto px-4 lg:px-16">
        {product && (
          <>
            <div>
              <GridImages />
            </div>
            <ImageDescription product={product} />
          </>
        )}
      </div>
      <div className="mx-auto lg:px-16 mt-20 mb-16">
        <span className="px-6 font-semibold text-xl">You Might Also Like</span>
        <Grid content={data.products.slice(0, 3)} />
      </div>
    </Layout>
  );
};

export default Index;
