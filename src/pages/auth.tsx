import Head from "next/head";
import { useState } from "react";

import FirstStep from "@/components/auth/steps/FirstStep";
import SecondStep from "@/components/auth/steps/SecondStep";
import AuthGuard from "@/guard/AuthGuard";

export interface iFormContent {
  name?: string;
  surname?: string;
  email: string;
  password?: string;
}

const Auth = () => {
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

  const changeStep = (newStep: number) => setStep(newStep);

  return (
    <AuthGuard>
      <Head>
        <title>{`Sign up | Nike Store`}</title>
      </Head>

      <main className="flex min-h-screen">
        <section className="max-w-md w-full flex flex-col gap-y-8 p-3 mx-auto mt-4">
          {step === 1 ? (
            <FirstStep
              changeStep={changeStep}
              email={formContent.email}
              onChange={changeFormContent}
              setIsRegistered={setIsRegistered}
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
    </AuthGuard>
  );
};

export default Auth;
