import Grid from "@/components/product/Grid";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import data from "../../data2.json";
import logo from "../../assets/logo.svg";
import Image from "next/image";

type Props = {};

const Index = (props: Props) => {
  const [loader, setLoader] = useState(true);
  const { query, pathname } = useRouter();

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [query]);

  return (
    <>
      <Layout>
        <header className="w-full my-16">
          <h1 className="font-semibold text-2xl text-center">
            {query.category}
          </h1>
        </header>
        <Grid content={data.products} />
      </Layout>

      {loader && (
        <section className="fixed top-0 left-0 z-30 bg-slate-200 bg-opacity-30 backdrop-blur-sm w-full h-screen flex">
          <div className="m-auto flex flex-col animate-pulse">
            <Image
              src={logo}
              alt="nike"
              width={160}
              height={70}
              className="mx-auto mb-5"
            />

            <h1 className="font-semibold text-2xl text-center">Loading...</h1>
          </div>
        </section>
      )}
    </>
  );
};

export default Index;
