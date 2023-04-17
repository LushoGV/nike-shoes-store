import React, { useEffect } from "react";
import AuthModal from "./AuthModal";
import { useModalContext } from "@/context/useModalContext";
import { useUserContext } from "@/context/useUserContext";

type Props = {
  activeAuthModal?: boolean
};

const ModalSection = (props: Props) => {
  const {token} = useUserContext()
  const { modalState , activeAuthModal } = useModalContext();

  useEffect(() => {
    props.activeAuthModal && activeAuthModal()
  },[props.activeAuthModal])

  return (
    <section
      className={`${
         modalState ? "opacity-100 z-50" : "opacity-0 -z-10"
      } fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30  flex justify-center items-center transition-all duration-200`}
    >
      { !token && <AuthModal />}
    </section>
  );
};

export default ModalSection;
