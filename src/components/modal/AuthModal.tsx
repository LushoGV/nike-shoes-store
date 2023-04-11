import React from "react";
import { SiNike } from "react-icons/si";
import Input from "../Input";
import Button from "../Button";
import { useModalContext } from "@/context/useModalContext";

type Props = {};

const AuthModal = (props: Props) => {
  const {setModalState} = useModalContext()

  return (
    <article className="max-w-sm w-full bg-white text-center px-4 py-4 grid gap-y-10 shadow-md">
      <header className="grid gap-y-4 justify-center">
        <div className="flex mb-1">
          <SiNike className="text-4xl mx-auto" />
          <button>x</button>
        </div>
        <h1 className="text-xl font-bold uppercase">be the first to know</h1>
        <p className="text-sm max-w-xs">
          Sign up for Nike emails to be the first to see inspiring content, news
          and exclusive offers
        </p>
      </header>

      <section className="px-6 grid gap-y-2">
        <Input placeholder="Email address" />
        <Input placeholder="password" />
      </section>

      <footer className="px-6 grid gap-y-6 pb-8">
        <Button text="Sign In" black onClick={() => { setModalState(false)}} />
        <span className="text-xs max-w-xs px-5">
          By signing up, you agree to Nike´s Privacy Policy and Terms of Use.
        </span>
      </footer>
    </article>
  );
};

export default AuthModal;
