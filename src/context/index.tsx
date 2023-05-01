import { AuthProvider, useAuthContext } from "./useAuthContext";
import { ModalProvider, useModalContext } from "./useModalContext";
import { UserProvider, useUserContext } from "./useUserContext";
import { ProviderProps } from "@/interfaces";

const Ctx = () => {
  const AuthCtx = useAuthContext();
  const UserCtx = useUserContext();
  const ModalCtx = useModalContext();

  return { AuthCtx, UserCtx, ModalCtx };
};

const ContextProviders = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ModalProvider>{children}</ModalProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export { Ctx, ContextProviders };
