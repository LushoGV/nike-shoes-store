import React from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import {verifyUser} from '../../../utils/fetch/authFunctions'
import AuthLogo from "../AuthLogo";

type Props = {
  email: string
  changeStep: (newStep: number) => void;
  onChange: (e:React.ChangeEvent<HTMLInputElement>) => void 
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>
};

const FirstStep = (props: Props) => {

  const checkEmail = async () => {
    const emailFound = await verifyUser(props.email)
    props.setIsRegistered(emailFound)
    props.changeStep(2)
  }
  
  return (
    <>
      <header className="flex flex-col gap-3">
      <AuthLogo/>
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
          <Button text="Continue" black onClick={async () => await checkEmail()} disableCondition={props.email ? false : true} />
        </div>
      </footer>
    </>
  );
};

export default FirstStep;
