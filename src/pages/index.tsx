import Image from "next/image";
import Layout from "@/layout/Layout";
import Grid from "@/components/product/Grid";

import testSlider from "../assets/sliders/slide-2.png";
import { getAllProducts } from "@/utils/fetch/productFunctions";
import { GetServerSideProps } from "next";
import { product } from "@/interfaces";

type Props = {
  content: product[];
};

export default function Home({ content }: Props) {
  console.log(content);

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
            priority
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
          <Grid content={content} />
        </section>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    content: await getAllProducts(),
  },
});
