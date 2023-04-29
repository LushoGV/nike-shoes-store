import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";

import Header from "@/components/header/Header";
import AuthGuard from "@/guard/AuthGuard";
import ModalSection from "@/components/modal/ModalSection";

import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { Ctx } from "@/context";

const Layout = ({ children, title } : {children:ReactNode, title?: string | string[]}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {AuthCtx} = Ctx()
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  },[router.events])

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
          {isLoading && <Loader/>}
        </section>

        <footer className="w-full bg-black h-52"></footer>
      </main>

      <ModalSection activeAuthModal={AuthCtx.isAuthenticated} />
    </AuthGuard>
  );
};

export default Layout;
