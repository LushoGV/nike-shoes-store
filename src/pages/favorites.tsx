import { useState, useEffect } from "react";
import { useUserContext } from "@/context/useUserContext";
import { getAllProducts } from "@/utils/fetch/productFunctions";

import PageHeader from "@/components/PageHeader";
import Grid from "@/components/product/Grid";
import Layout from "@/layout/Layout";
import { product } from "@/interfaces";
import { GetServerSideProps } from "next";

type Props = {
  content: product[]
};

const Favorites = ({content}: Props) => {
  const [favoritesArr, setFavoritesArr] = useState<product[]>([]);
  const { favorites } = useUserContext();
  console.log(content)
  const getData = () => {
    setFavoritesArr(
      favorites.map(
        (element) => content.filter((item) => item.id.toString() == element)[0]
      )
    );
  };

  useEffect(() => {
    getData();
  }, [content]);

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

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    content: await getAllProducts(),
  },
});

export default Favorites;
