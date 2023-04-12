import { ModalProvider } from "./useModalContext";
import { UserProvider } from "./useUserContext";
import { ProviderProps } from "@/interfaces";

const ContextProviders = ({ children }: ProviderProps) => {
  return (
    <UserProvider>
      <ModalProvider>{children}</ModalProvider>
    </UserProvider>
  );
};

export default ContextProviders;
