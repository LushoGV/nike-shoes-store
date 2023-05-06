import { Ctx } from "@/context";
import AuthModal from "./AuthModal";

const ModalSection = () => {
  const { AuthCtx, ModalCtx } = Ctx();
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
