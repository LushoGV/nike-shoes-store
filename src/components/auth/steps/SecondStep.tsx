import React from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { SiNike } from "react-icons/si";
import { iFormContent } from "@/layout/AuthLayout";

type Props = {
  changeStep: (newStep: number) => void;
  isRegistered: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formContent: iFormContent;
};

const SecondStep = (props: Props) => {
  return (
    <>
      <header className="flex flex-col gap-3">
        <SiNike className="text-5xl" />
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

      {props.isRegistered ? (
        <Input
          placeholder="password"
          name="password"
          onChange={props.onChange}
        />
      ) : (
        <section className="flex flex-wrap gap-y-4 justify-between mb-1">
          <div className="grid grid-cols-2 gap-x-4">
            <Input placeholder="Name" name="name" onChange={props.onChange} />
            <Input
              placeholder="Surname"
              name="surname"
              onChange={props.onChange}
            />
          </div>

          <Input
            placeholder="Password"
            name="password"
            onChange={props.onChange}
          />
        </section>
      )}

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
                props.formContent.name &&
                props.formContent.password &&
                props.formContent.surname
                  ? false
                  : true
              }
              onClick={() => {}}
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default SecondStep;
