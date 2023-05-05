import { useEffect, useState } from "react";
import { iCart, product } from "@/interfaces";
import { GetServerSideProps } from "next";
import { SSR_REDIRECTS } from "@/utils/server/ServerSideRedirects";
import { parseCookies } from "nookies";
import { API } from "@/utils/client/functions";

import Loader from "@/components/Loader";
import Layout from "@/layout/Layout";
import ImageDescription from "@/components/product/page/ImageDescription";
import GridImages from "@/components/product/page/GridImages";
import Grid from "@/components/product/Grid";
import { useRouter } from "next/router";

interface productContent {
  content: product,
  order:iCart | null,
  imagesArr: string[]
}

const Index = ({ order } : {order:iCart | null}) => { 
  const [product, setProduct] = useState<productContent>()
  const [allProducts, setAllProducts] = useState<product[] | undefined>([])

  const router = useRouter()

  useEffect(() => {
    const getByClientSide = async () => {
      if(router.query.productId){
        const { product, images } = await API.PRODUCTS.GET_ONE(
          router.query.productId.toString()
        );
  
        const products = await API.PRODUCTS.GET(true)
        const productsArr = products.sort(() => Math.random() - 0.5).filter(element => element.id.toString() !== router.query.productId?.toString()).slice(0, 3)
        setProduct({ content:product, imagesArr:images, order })
        setAllProducts(productsArr)
      }
    }

    setProduct(undefined)
    setAllProducts(undefined)
    getByClientSide()
  },[order, router.query.productId])
  
  return(
  <Layout title={product?.content?.title ? product?.content?.title : "Sneaker"}>
    {product && allProducts ? (
      <>
        <section className="flex flex-col gap-y-8 lg:gap-y-0 lg:gap-x-6 lg:flex-row justify-center mx-auto px-4">
          {product.content && (
            <>
              <div>
                <GridImages images={product.imagesArr} />
              </div>
              <ImageDescription product={product.content} order={product.order} />
            </>
          )}
        </section>
        <section className="mx-auto lg:px-11 mt-16 md:mt-24 mb-16 overflow-hidden">
          <h3 className="mb-3 md:mt-0 px-6 text-2xl">You Might Also Like</h3>
          {allProducts && <Grid content={allProducts} />}
        </section>
      </>
    ) : (
      <Loader />
    )}
  </Layout>
)};

export const getServerSideProps: GetServerSideProps = async (ctx): Promise<any> => {
  const cookies = parseCookies(ctx);
  const {myRefreshCookie} = cookies

  try {
    if (ctx.query.productId) {
      let orderRes = null 

      if(myRefreshCookie){
        const order = await API.CART.GET_ONE(ctx.query.productId.toString(), true, myRefreshCookie)
        orderRes = order.productId ? order : null
      }
      
      return {
        props: {
          order: orderRes,
        },
      };
    }
    
  } catch (error) {
    return SSR_REDIRECTS.TO_HOME;
  }
};

export default Index;
