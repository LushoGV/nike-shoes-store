import { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import AuthNavbar from "./navbar/AuthNavbar";
import { Ctx } from "@/context";

type Props = {};

const Header = (props: Props) => {
  const [navStyle, setNavStyle] = useState<boolean>();
  const [lastScrollY, setLastScrollY] = useState<number>();
  const {AuthCtx} = Ctx()

  const handleNavbarStyle = () => {
    if (lastScrollY) {
      if (window.pageYOffset > lastScrollY) {
        setNavStyle(true);
      } else {
        setNavStyle(false);
      }
    }

    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleNavbarStyle);
  }, [lastScrollY]);

  return (
    <>
      <AuthNavbar user={AuthCtx.userData} />
      <header
        className={`${
          navStyle ? "-translate-y-[80px]" : "translate-y-0"
        } transition-transform duration-300 w-full border-b-[1px] border-slate-100 sticky top-0 z-20`}
      >
        <Navbar />
      </header>
    </>
  );
};

export default Header;
