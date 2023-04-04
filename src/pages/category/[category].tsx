import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { product } from "..";

import Layout from "@/layout/Layout";
import Grid from "@/components/product/Grid";
import Loader from "@/components/Loader";

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
        <header className="w-full my-16">
          <h1 className="font-semibold text-2xl text-center">
            {router.query.category}
          </h1>
        </header>
        <Grid content={products} />
      </Layout>

      {loader && <Loader />}
    </>
  );
};

export default Index;
