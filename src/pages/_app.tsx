import { UserProvider } from "@/context/useUserContext";
import { ModalProvider } from "@/context/useModalContext";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ModalProvider>
  );
}
