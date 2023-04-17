import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";

import Header from "@/components/header/Header";
import AuthGuard from "@/guard/AuthGuard";
import ModalSection from "@/components/modal/ModalSection";

import { useUserContext } from "@/context/useUserContext";

export type Props = {
  children: ReactNode;
  title?: string | string[];
};

const Layout = ({ children, title }: Props) => {
  const [authModalState, setAuthStateModal] = useState(false)
  const {token} = useUserContext()

  useEffect(() => {
    !token && setTimeout(() => setAuthStateModal(true),10000) 
  },[token])

  return (
    <AuthGuard>
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

      <ModalSection activeAuthModal={authModalState} />
    </AuthGuard>
  );
};

export default Layout;
