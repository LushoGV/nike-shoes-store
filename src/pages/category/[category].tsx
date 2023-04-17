import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getCategory } from "@/utils/fetch/productFunctions";

import Layout from "@/layout/Layout";
import Grid from "@/components/product/Grid";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { product } from "@/interfaces";
import { redirectToHome } from "@/utils/ServerSideRedirects";

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

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx
): Promise<any> => {
  const { id, category } = ctx.query;

  if (id) {
    const data = await getCategory(id.toString());

    if (data.length)
      return {
        props: {
          content: data,
          categoryTitle: category,
        },
      };

    return redirectToHome;
  }

  return redirectToHome;
};

export default Index;
