import React from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { SiNike } from "react-icons/si";

type Props = {
  email: string
  changeStep: (newStep: number) => void;
  onChange: (e:React.ChangeEvent<HTMLInputElement>) => void 
};

const FirstStep = (props: Props) => {
  
  return (
    <>
      <header className="flex flex-col gap-3">
        <SiNike className="text-5xl" />
        <h1 className="text-2xl">
          Enter your email address to join or log in.
        </h1>
      </header>

      <Input placeholder="Email address" name="email" value={props.email} onChange={(e) => props.onChange(e)} />

      <footer className="flex flex-col gap-y-6">
        <span className="w-full max-w-xs">
          By logging in, you agree to Nike´s Privacy Policy and Terms of Use.
        </span>
        <div className="w-32 mx-auto mr-0">
          <Button text="Continue" black onClick={() => props.changeStep(2)} disableCondition={props.email ? false : true} />
        </div>
      </footer>
    </>
  );
};

export default FirstStep;
