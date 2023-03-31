import Navbar from "@/components/navbar/Navbar";
import React, { ReactNode } from "react";

export type Children = {
  children: ReactNode;
};

const Layout = ({ children }: Children) => {
  return (
    <main className="">
      <header className="w-full border-b-[1px] border-slate-100 sticky top-0 z-20">
        <Navbar />
      </header>

      <section className="max-w-[1300px] mx-auto mt-6">{children}</section>

      <footer className="w-full bg-black h-52 mt-20"></footer>
    </main>
  );
};

export default Layout;
