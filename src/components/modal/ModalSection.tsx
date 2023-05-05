import { useEffect } from "react";
import { Ctx } from "@/context";
import AuthModal from "./AuthModal";

type Props = {
  activeAuthModal?: boolean | null;
};

const ModalSection = (props: Props) => {
  const { AuthCtx, ModalCtx } = Ctx();

  useEffect(() => {
    if (props.activeAuthModal !== null) {
      !props.activeAuthModal && setTimeout(() => {ModalCtx.activeAuthModal()}, 3000)
    }
  }, [props.activeAuthModal]);

  return (
    <section
      className={`${
        ModalCtx.modalState ? "opacity-100 z-50" : "opacity-0 -z-10"
      } fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30  flex justify-center items-center transition-all duration-200`}
    >
      {!AuthCtx.isAuthenticated && <AuthModal />}
    </section>
  );
};

export default ModalSection;
