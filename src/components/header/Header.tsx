import { useEffect, useState } from "react";
import { Ctx } from "@/context";

import AuthNavbar from "./navbar/AuthNavbar";
import Navbar from "./navbar/Navbar";
import Menu from "./navbar/Menu";

type Props = {};

const Header = (props: Props) => {
  const [navStyle, setNavStyle] = useState<boolean>();
  const [activeMenu, setActiveMenu] = useState(false);
  const [lastScrollY, setLastScrollY] = useState<number>();
  const { AuthCtx } = Ctx();

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
        <Navbar openMenu={() => setActiveMenu(true)} />
      </header>
      <Menu
        menuState={activeMenu}
        closeMenu={() => setActiveMenu(false)}
        user={AuthCtx.userData}
      />
    </>
  );
};

export default Header;
