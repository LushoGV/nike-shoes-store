import Layout from "@/layout/Layout";
import Grid from "@/components/product/Grid";

import { GetServerSideProps } from "next";
import { product } from "@/interfaces";
import { API } from "@/utils/client/functions";
import Slider from "@/components/Slider";

export default function Home({ content } : {content: product[]}) {
  return (
    <>
      <Layout title="Home">
        <Slider/>

        <section className="text-center flex flex-col my-9 items-center mx-4 lg:mx-0">
          <h2 className="text-2xl md:text-3xl">Coushioning for Your Miles</h2>

          <p className="text-base md:text-lg max-w-2xl pt-3">
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
    content: await API.PRODUCTS.GET(true),
  },
});
