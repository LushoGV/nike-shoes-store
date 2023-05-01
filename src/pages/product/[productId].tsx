import { iCart, product } from "@/interfaces";
import { GetServerSideProps } from "next";
import { SSR_REDIRECTS } from "@/utils/server/ServerSideRedirects";
import { API } from "@/utils/client/functions";

import Loader from "@/components/Loader";
import Layout from "@/layout/Layout";
import ImageDescription from "@/components/product/page/ImageDescription";
import GridImages from "@/components/product/page/GridImages";
import Grid from "@/components/product/Grid";
import Slider from "@/components/product/Slider";

const Index = ({ content, imagesArr, order, products } : {content: product, imagesArr: string[], order:iCart, products: product[]}) => (
  <Layout title={content?.title ? content?.title : "Sneaker"}>
    {imagesArr ? (
      <>
        <section className="flex flex-col gap-y-8 lg:gap-y-0 lg:gap-x-4 lg:flex-row mx-auto px-4 lg:px-16">
          {content && (
            <>
              <div>
                <GridImages images={imagesArr} />
              </div>
              <ImageDescription product={content} order={order.productId ? order : null} />
            </>
          )}
        </section>
        <section className="mx-auto lg:px-11 mt-20 mb-16 overflow-hidden">
          <span className="px-6 text-2xl">You Might Also Like</span>
          <Grid content={products.slice(0, 3)} />
          {/* <Slider cards={products}/> */}
        </section>
      </>
    ) : (
      <Loader />
    )}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async (ctx): Promise<any> => {
  try {
    if (ctx.query.productId) {
      const { product, images } = await API.PRODUCTS.GET_ONE(
        ctx.query.productId.toString()
      );
       
      const order = await API.CART.GET_ONE(ctx.query.productId.toString(), true)
      const orderRes = order ? order : null 
       
      const products = await API.PRODUCTS.GET(true)
      const productsArr = products.sort(() => Math.random() - 0.5).filter(element => element.id.toString() !== ctx.query.productId?.toString())
  
      return {
        props: {
          content: product ,
          imagesArr: images,
          order: orderRes,
          products: productsArr
        },
      };
    }
    
  } catch (error) {
    return SSR_REDIRECTS.TO_HOME;
  }
};

export default Index;
