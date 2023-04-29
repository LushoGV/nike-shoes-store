import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProviderProps } from "@/interfaces";
import Loader from "@/components/Loader";
import { Ctx } from "@/context";

const AuthGuard = ({ children }: ProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {AuthCtx} = Ctx()

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    // if (router.pathname.startsWith("/auth")) {
    //   if (isAuthenticated) {
    //     router.push("/");
    //   }
    // } else if (
    //   router.pathname.startsWith("/cart") ||
    //   router.pathname.startsWith("/favorites")
    // ) {
    //   if (!isAuthenticated || isAuthenticated === null) {
    //     router.push("/auth");
    //   }
    // }

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
