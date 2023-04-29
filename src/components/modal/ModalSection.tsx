import { useEffect } from "react";
import { useModalContext } from "@/context/useModalContext";
import { useUserContext } from "@/context/useUserContext";
import AuthModal from "./AuthModal";
import { Ctx } from "@/context";

type Props = {
  activeAuthModal?: boolean | null;
};

const ModalSection = (props: Props) => {
  // const {isAuth} = useUserContext()
  const { modalState, activeAuthModal } = useModalContext();
  const { AuthCtx } = Ctx();

  useEffect(() => {
    if (props.activeAuthModal !== null) {
      !props.activeAuthModal && activeAuthModal();
    }
  }, [props.activeAuthModal]);

  return (
    <section
      className={`${
        modalState ? "opacity-100 z-50" : "opacity-0 -z-10"
      } fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30  flex justify-center items-center transition-all duration-200`}
    >
      {!AuthCtx.isAuthenticated && <AuthModal />}
    </section>
  );
};

export default ModalSection;
