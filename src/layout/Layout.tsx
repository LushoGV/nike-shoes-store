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

      <main className="grid gap-y-8">
        <Header />

        <section className="max-w-[1300px] w-full mx-auto min-h-[800px]">
          {children}
        </section>

        <footer className="w-full bg-black h-52"></footer>
      </main>
    </>
  );
};

export default Layout;
