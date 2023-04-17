import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProviderProps } from "@/interfaces";
import { useUserContext } from "@/context/useUserContext";

const AuthGuard = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState(true);
  const { token } = useUserContext();
  const router = useRouter();

  const verifyToken = () => {
    if (!token) {
      if (
        router.pathname.startsWith("/cart") ||
        router.pathname.startsWith("/favorites")
      )
        router.push("/auth");
    }else{
      if(router.pathname.startsWith('/auth')) router.push("/");
    }
  };

  useEffect(() => {
    verifyToken();
  }, [token]);

  return <>{children}</>;
};

export default AuthGuard;
