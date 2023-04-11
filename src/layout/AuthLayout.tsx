import Button from "@/components/Button";
import React from "react";
import { SiNike } from "react-icons/si";

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <main className="flex min-h-screen">
      <section className="max-w-md flex flex-col gap-y-12 p-2 mx-auto mt-4">
        <header className="flex flex-col gap-3">
          <SiNike className="text-5xl" />
          <h1 className="text-2xl">
            Enter your email address to join or log in.
            {/* We are going to make you a Nike Member. */}
          </h1>

          {/* <div><span className="mr-2">test@test.com</span><span>Edit</span></div> */}
        </header>

        <input placeholder='Email address' className='bg-transparent border-[1px] w-full py-3 rounded-md pl-3 mb-1' />

        {/* <section className="flex flex-wrap gap-y-4 justify-between">
          <input
            placeholder="Name"
            className="bg-transparent border-[1px]  py-3 rounded-md pl-3 mb-1 "
          />
          <input
            placeholder="Surnames"
            className="bg-transparent border-[1px]  py-3 rounded-md pl-3 mb-1 "
          />
          <input
            placeholder="Password"
            className="bg-transparent border-[1px] w-full py-3 rounded-md pl-3 mb-1"
          />
        </section> */}

        <footer className="flex flex-col gap-y-6">
          <span className='w-full max-w-xs'>
                By logging in, you agree to Nike´s Privacy Policy and Terms of Use.
                </span>

          {/* <span>
            <input type="checkbox" />I agree to Nike´s Privacy Policy and Terms
            of Use .
          </span> */}

          <div className="w-32 mx-auto mr-0">
            <Button text="Continue" black onClick={() => {}} />
          </div>
        </footer>
      </section>
    </main>
  );
};

export default AuthLayout;
