import Head from "next/head";
import { useState } from "react";

import FirstStep from "@/components/auth/steps/FirstStep";
import SecondStep from "@/components/auth/steps/SecondStep";

type Props = {};

export interface iFormContent {
  name?: string;
  surname?: string;
  email: string;
  password?: string;
}

const AuthLayout = (props: Props) => {
  const [step, setStep] = useState<number>(1);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [formContent, setFormContent] = useState<iFormContent>({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const changeFormContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormContent({ ...formContent, [e.target.name]: e.target.value });
  };

  const changeStep = (newStep: number) => {
    setStep(newStep);
  };

  return (
    <>
      <Head>
        <title>{`Sign up | Nike Store`}</title>
      </Head>

      <main className="flex min-h-screen">
        <section className="max-w-md w-full flex flex-col gap-y-8 p-2 mx-auto mt-4">
          {step === 1 ? (
            <FirstStep
              changeStep={changeStep}
              email={formContent.email}
              onChange={changeFormContent}
            />
          ) : (
            <SecondStep
              changeStep={changeStep}
              onChange={changeFormContent}
              isRegistered={isRegistered}
              formContent={formContent}
            />
          )}
        </section>
      </main>
    </>
  );
};

export default AuthLayout;
