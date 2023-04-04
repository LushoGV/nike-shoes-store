import Header from "@/components/header/Header";
import Head from "next/head";
import type { ReactNode } from "react";

export type Props = {
  children: ReactNode;
  title?: string | string[];
};

const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{`${title} | Nike Store`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Header />

        <section className="max-w-[1300px] mx-auto mt-6 min-h-screen">
          {children}
        </section>

        <footer className="w-full bg-black h-52 mt-20"></footer>
      </main>
    </>
  );
};

export default Layout;
