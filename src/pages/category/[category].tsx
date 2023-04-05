import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { product } from "..";

import Layout from "@/layout/Layout";
import Grid from "@/components/product/Grid";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";

type Props = {};

const Index = (props: Props) => {
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState<product[]>([]);

  const router = useRouter();
  const { category, id } = router.query;

  const getData = async () => {
    setProducts([]);
    const res = await fetch(`/api/product/category/${id}`);
    const resData = await res.json();
    setProducts(resData.products);
  };

  useEffect(() => {
    setLoader(true);
    router.query.id && getData();
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [router.query]);

  return (
    <>
      <Layout title={category ? category : "Category"}>
        <PageHeader
          text={router.query.category ? router.query.category?.toString() : "Loading..."}
        />
        <Grid content={products} />
      </Layout>

      {loader && <Loader />}
    </>
  );
};

export default Index;
