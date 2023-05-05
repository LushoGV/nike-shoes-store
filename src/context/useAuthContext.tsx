import { ProviderProps } from "@/interfaces";
import { ENDPOINTS } from "@/utils/server/endpoints";
import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect } from "react";
import { API } from "@/utils/client/functions";
import { CLIENT_ROUTES } from "@/utils/client/routes";

interface context {
  userData: string | undefined;
  isAuthenticated: boolean | null;
  getToken: () => Promise<void>
  deleteToken: () => Promise<void>
}

const AuthContext = createContext<context>({} as context);

export const AuthProvider = ({ children }: ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<string>();

  const router = useRouter()

  const getToken = async () => {
    try {
      const res = await fetch(ENDPOINTS.AUTH.VERIFY_TOKEN);
      const { user } = await res.json();

      if(user){
        setUserData(user);
        setIsAuthenticated(true);
        if(router.pathname.startsWith(CLIENT_ROUTES.SIGNUP)) router.push(CLIENT_ROUTES.HOME)
      }else{
        setIsAuthenticated(false);
      }
  
    } catch (error) {
        setIsAuthenticated(false);
    }
  };

  const deleteToken = async () => {
    const res = await API.AUTH.LOG_OUT()
    if(res?.ok){
      setIsAuthenticated(false)
      setUserData(undefined)
      router.push(CLIENT_ROUTES.HOME)
    }
  }

  useEffect(() => {
    if(isAuthenticated !== false){
      getToken();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const refreshAccessToken = async () => {
        const res = await fetch(ENDPOINTS.AUTH.REFRESH_ACCESS_TOKEN);

        if (res.status == 200) {
          !isAuthenticated && setIsAuthenticated(true);
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
    <AuthContext.Provider value={{ userData, isAuthenticated, getToken, deleteToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { userData, isAuthenticated, getToken, deleteToken } = useContext(AuthContext);
  return { userData, isAuthenticated, getToken, deleteToken };
};
