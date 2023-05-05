import { useState, useEffect } from "react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthLogo from "../AuthLogo";
import { iFormContent } from "@/pages/auth";
import { API } from "@/utils/client/functions";
import { Ctx } from "@/context";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  isRegistered: boolean;
  formContent: iFormContent;
  changeStep: (newStep: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SecondStep = (props: Props) => {
  const [inputCheck, setInputCheck] = useState<boolean>(false)
  const [error, setError] = useState<string | boolean>(false);
  const [isPasswordType, setIsPasswordType] = useState<boolean>(true)
  const [loader, setLoader] = useState<boolean>(false)
  const {AuthCtx} = Ctx()

  const handleSubmit = async () => {
    setLoader(true)
    const res = await (props.isRegistered
      ? API.AUTH.LOGIN(props.formContent)
      : API.AUTH.SIGN_UP(props.formContent));

    if (res.message) {setLoader(false), setError(res.message)}
    else await AuthCtx.getToken()
    
  };
  
  const disableCondition = () => {
    if(props.isRegistered){
      return props.formContent.password ? false : true
    }else{
      return !props.formContent.name || !props.formContent.surname || !props.formContent.password || !inputCheck
    }
  }

  useEffect(() => {
    setLoader(false)
    setError(false)
  }, [])
  
  return (
    <>
      <header className="flex flex-col gap-3">
      <AuthLogo/>
        <h1 className="text-2xl">
          {props.isRegistered
            ? "Enter your password"
            : "We are going to make you a Nike Member."}
        </h1>

        {!props.isRegistered && (
          <div>
            <span className="mr-2">{props.formContent.email}</span>
            <button onClick={() => props.changeStep(1)} className="font-semibold">Edit</button>
          </div>
        )}
      </header>

      <section className="flex flex-wrap gap-y-2 justify-between mb-1">
        {!props.isRegistered && (
          <div className="grid grid-cols-2 gap-x-4">
            <Input placeholder="Name" name="name" value={props.formContent.name} onChange={(e) => {props.onChange(e), setError(false)}} />
            <Input
              value={props.formContent.surname}
              placeholder="Surname"
              name="surname"
              onChange={(e) => {props.onChange(e), setError(false)}}
            />
          </div>
        )}
        <div className="flex items-center justify-end w-full relative">
          <button onClick={() => setIsPasswordType(!isPasswordType)} className="absolute right-3 text-2xl text-slate-400">
            {isPasswordType ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
          </button>
          <Input
            placeholder="Password"
            type={isPasswordType ? "password" : "text"}
            name="password"
            value={props.formContent.password}
            onChange={(e) => {props.onChange(e), setError(false)}}
            error={error ? true : false}
          />
        </div>
        {error && (
          <span className="text-red-400 ml-1 first-letter:uppercase">
            {error}
          </span>
        )}
      </section>

      <footer className="flex flex-col gap-y-6">
        {!props.isRegistered && (
          <div className="flex items-center">
            <input type="checkbox" 
              className="cursor-pointer h-4 w-4 mx-1"
              checked={inputCheck} 
              onChange={() => setInputCheck(!inputCheck)} />
            <span className="ml-1">
              I agree to Nike´s Privacy Policy and Terms of Use .
            </span>
          </div>
        )}

        <div className="flex justify-end">
          <div className="w-32 mx-auto mr-2">
            <Button
              text="Back"
              onClick={() => {
                props.changeStep(1);
              }}
            />
          </div>
          <div className="w-32 mr-0">
            <Button
              text={props.isRegistered ? "Log in" : "Sign in"}
              black
              loader={loader}
              disableCondition={
                disableCondition()
              }
              onClick={() => handleSubmit()}
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default SecondStep;
