import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Ctx } from "@/context";

import Header from "@/components/header/Header";
import AuthGuard from "@/guard/AuthGuard";
import ModalSection from "@/components/modal/ModalSection";
import Loader from "@/components/Loader";
import Footer from "@/components/layout/Footer";

const Layout = ({ children, title }: { children: ReactNode; title?: string | string[]; }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { AuthCtx } = Ctx();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  return (
    <AuthGuard>
      <Head>
        <title>{`${title} | Nike Store`}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        ></link>
      </Head>

      <main className="grid">
        <Header />

        <section
          className={`${
            title?.toString().toLowerCase() === "home" && "overflow-hidden"
          } max-w-[1300px] w-full mx-auto min-h-[800px] mt-0 mb-6 lg:my-6`}
        >
          {children}
          {isLoading && <Loader />}
        </section>

        <Footer />
      </main>

      <ModalSection activeAuthModal={AuthCtx.isAuthenticated} />
    </AuthGuard>
  );
};

export default Layout;
