import { ProviderProps } from "@/interfaces";
import { createContext, useContext, useState } from "react";

interface context {
    modalState: boolean, 
    setModalState: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalContext = createContext<context>({} as context);

export const ModalProvider = ({ children }: ProviderProps) => {
    const [modalState, setModalState] = useState<boolean>(false)

  return <ModalContext.Provider value={{modalState, setModalState}}>{children}</ModalContext.Provider>;
};

export const useModalContext = () => {
    const {modalState, setModalState} = useContext(ModalContext)
    return {modalState, setModalState}
}
