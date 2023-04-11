import Header from "@/components/header/Header";
import ModalSection from "@/components/modal/ModalSection";
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

      <main className="grid">
        <Header />

        <section className="max-w-[1300px] w-full mx-auto min-h-[800px] my-6">
          {children}
        </section>

        <footer className="w-full bg-black h-52"></footer>
      </main>

      <ModalSection/>
    </>
  );
};

export default Layout;
