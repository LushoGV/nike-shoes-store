import data from "../../data2.json";
import { product } from "@/interfaces";
import { getProduct } from "@/utils/fetch/productFunctions";
import { GetServerSideProps } from "next";
import { redirectToHome } from "@/utils/ServerSideRedirects";

import Grid from "@/components/product/Grid";
import Loader from "@/components/Loader";
import Layout from "@/layout/Layout";
import ImageDescription from "@/components/product/page/ImageDescription";
import GridImages from "@/components/product/page/GridImages";

type Props = {
  content: product;
  imagesArr: string[];
};

const Index = ({ content, imagesArr }: Props) => (
  <Layout title={content?.title ? content?.title : "Sneaker"}>
    {imagesArr ? (
      <>
        <section className="flex flex-col gap-y-8 lg:gap-y-0 lg:gap-x-4 lg:flex-row mx-auto px-4 lg:px-16">
          {content && (
            <>
              <div>
                <GridImages images={imagesArr} />
              </div>
              <ImageDescription product={content} />
            </>
          )}
        </section>
        <section className="mx-auto lg:px-11 mt-20 mb-16">
          <span className="px-6 text-2xl">You Might Also Like</span>
          {/* <Grid content={data.products.slice(0, 3)} /> */}
        </section>
      </>
    ) : (
      <Loader />
    )}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async (ctx): Promise<any> => {
  if (ctx.query.productId) {
    const { product, images } = await getProduct(
      ctx.query.productId.toString()
    );

    return {
      props: {
        content: product,
        imagesArr: images,
      },
    };
  }

  return redirectToHome;
};

export default Index;
