import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProviderProps } from "@/interfaces";
import { Ctx } from "@/context";
import Loader from "@/components/Loader";

const AuthGuard = ({ children }: ProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {AuthCtx} = Ctx()

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (AuthCtx.isAuthenticated !== null) setIsLoading(false);
  }, [AuthCtx.isAuthenticated, router]);

  return (
    <>
      {isLoading && <Loader />}
      <>{children}</>
    </>
  );
};

export default AuthGuard;
