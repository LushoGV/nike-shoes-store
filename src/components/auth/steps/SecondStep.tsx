import { useState, useEffect } from "react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthLogo from "../AuthLogo";
import { iFormContent } from "@/pages/auth";
import { API } from "@/utils/client/functions";
import { Ctx } from "@/context";

type Props = {
  isRegistered: boolean;
  formContent: iFormContent;
  changeStep: (newStep: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SecondStep = (props: Props) => {
  const [error, setError] = useState<string | boolean>(false);
  const {AuthCtx} = Ctx()

  const handleSubmit = async () => {
    const res = await (props.isRegistered
      ? API.AUTH.LOGIN(props.formContent)
      : API.AUTH.SIGN_UP(props.formContent));

    if (res.message) setError(res.message);
    else await AuthCtx.getToken()
  };
  
  const disableCondition = () => {
    if(props.isRegistered){
      return props.formContent.password ? false : true
    }else{
      return !props.formContent.name || !props.formContent.surname || !props.formContent.password
    }
  }

  useEffect(() => {
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
            <span>Edit</span>
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
        <Input
          placeholder="Password"
          name="password"
          value={props.formContent.password}
          onChange={(e) => {props.onChange(e), setError(false)}}
          error={error ? true : false}
        />
        {error && (
          <span className="text-red-400 ml-1 first-letter:uppercase">
            {error}
          </span>
        )}
      </section>

      <footer className="flex flex-col gap-y-6">
        {!props.isRegistered && (
          <div className="flex items-center">
            <input type="checkbox" />
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
