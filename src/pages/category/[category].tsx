import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import { product } from "@/interfaces";
import { SSR_REDIRECTS } from "@/utils/server/ServerSideRedirects";
import { API } from "@/utils/client/functions";

import Layout from "@/layout/Layout";
import Grid from "@/components/product/Grid";
import Loader from "@/components/Loader";
import PageHeader from "@/components/layout/PageHeader";

type Props = {
  content: product[];
  categoryTitle: string;
};

const Index = ({ content, categoryTitle }: Props) => {
  const [products, setProducts] = useState<product[]>([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    setProducts(content);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [content]);

  return (
    <>
      <Layout title={categoryTitle ? categoryTitle : "Category"}>
        <PageHeader
          text={
            categoryTitle
              ? `${categoryTitle} (${products.length})`
              : "Loading..."
          }
        />
        <Grid content={products} />
      </Layout>

      {loader && <Loader />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx): Promise<any> => {
  try {
    const { id, category } = ctx.query;

    if (id) {
      const data = await API.PRODUCTS.CATEGORY.GET(id.toString());

      if (data.length)
        return {
          props: {
            content: data,
            categoryTitle: category,
          },
        };

      return SSR_REDIRECTS.TO_HOME;
    }
  } catch (error) {
    return SSR_REDIRECTS.TO_HOME;
  }
};

export default Index;
