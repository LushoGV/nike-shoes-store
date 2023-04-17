import { ProviderProps } from "@/interfaces";
import { createContext, useContext, useState } from "react";

interface context {
    modalState: boolean, 
    setModalState: React.Dispatch<React.SetStateAction<boolean>>
    activeAuthModal: () => void
}

const ModalContext = createContext<context>({} as context);

export const ModalProvider = ({ children }: ProviderProps) => {
    const [modalState, setModalState] = useState<boolean>(false)
    
    const activeAuthModal = () => setModalState(true)

  return <ModalContext.Provider value={{modalState, setModalState, activeAuthModal}}>{children}</ModalContext.Provider>;
};

export const useModalContext = () => {
    const {modalState, setModalState, activeAuthModal} = useContext(ModalContext)
    return {modalState, setModalState, activeAuthModal}
}
