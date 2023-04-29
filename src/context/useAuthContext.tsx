import { ProviderProps } from "@/interfaces";
import { ENDPOINTS } from "@/utils/server/endpoints";
import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect } from "react";

interface context {
  userData: string | undefined;
  isAuthenticated: boolean | null;
  getToken: () => Promise<void>
}

const AuthContext = createContext<context>({} as context);

export const AuthProvider = ({ children }: ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<string>();

  const router = useRouter()

  const getToken = async () => {
    const res = await fetch(ENDPOINTS.AUTH.VERIFY_TOKEN);
    const { user } = await res.json();

    console.log(res)

    if (res.status == 200) {
      setUserData(user);
      setIsAuthenticated(true);
      if(router.pathname.startsWith("/auth")) router.push("/")
    } else setIsAuthenticated(false);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const refreshAccessToken = async () => {
        const res = await fetch(ENDPOINTS.AUTH.REFRESH_ACCESS_TOKEN);

        if (res.status == 200) {
          !isAuthenticated && setIsAuthenticated(true);
          console.log("refreshed");
        } else setIsAuthenticated(false);
      };

      const refreshAccessTokenInterval = setInterval(
        refreshAccessToken,
        60 * 12 * 1000
      );

      return () => clearInterval(refreshAccessTokenInterval);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ userData, isAuthenticated, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { userData, isAuthenticated, getToken } = useContext(AuthContext);
  return { userData, isAuthenticated, getToken };
};
