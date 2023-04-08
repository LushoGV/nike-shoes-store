import Image from "next/image";
import { useEffect, useState } from "react";

import Layout from "@/layout/Layout";
import Grid from "@/components/product/Grid";

import testSlider from "../assets/sliders/slide-3.png";
import { getAllProducts } from "@/utils/dataFunctions";

export type product = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: number;
  description: string;
  colors: string;
  style: string;
};

export default function Home() {
  const [products, setProducts] = useState<product[]>([]);

  const getData = async () => {
    const data = await getAllProducts()
    setProducts(data)
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <>
      <Layout title="Home">
        <section className="py-6 lg:px-6 pt-0">
          <Image
            src={testSlider}
            width={1500}
            height={75}
            alt="banner"
            className="lg:h-[550px]"
          />
        </section>

        <section className="text-center flex flex-col my-9 items-center mx-4 lg:mx-0">
          <h2 className="text-3xl">Coushioning for Your Miles</h2>

          <p className="max-w-2xl pt-3">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running
          </p>
        </section>

        <section className="py-2">
          <Grid content={products} />
        </section>
      </Layout>
    </>
  );
}
