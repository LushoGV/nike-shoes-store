import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { API } from "@/utils/client/functions";
import { Ctx } from "@/context";
import { product } from "@/interfaces";

import PageHeader from "@/components/PageHeader";
import Grid from "@/components/product/Grid";
import Layout from "@/layout/Layout";

const Favorites = () => {
  const [favoritesArr, setFavoritesArr] = useState<product[]>([]);
  const { UserCtx } = Ctx();

  useEffect(() => {
    setFavoritesArr(UserCtx.FAVORITES.GET)
  }, [UserCtx.FAVORITES.GET]);

  return (
    <Layout title={"Favorites"}>
      <PageHeader text="Favorites" />
      {favoritesArr.length > 0 ? (
        <Grid content={favoritesArr} />
      ) : (
        <section className="md:text-xl text-center h-44 flex items-center justify-center">
          <span className="mx-4">
            Items added to your Favorites will be saved here.
          </span>
        </section>
      )}
    </Layout>
  );
};

export default Favorites;
