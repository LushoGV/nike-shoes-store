import Link from "next/link";
import Image from "next/image";
import logo from "../../../assets/logo.svg";
import { BsCart, BsHeart } from "react-icons/bs";

import { useRouter } from "next/router";
import { Ctx } from "@/context";

import DropdownList from "../../DropdownList";
import UserButtons from "./UserButtons";
import { FiMenu } from "react-icons/fi";
import { CLIENT_ROUTES } from "@/utils/client/routes";

const Navbar = ({openMenu}:{openMenu: () => void}) => {
  const {UserCtx, AuthCtx, ModalCtx} = Ctx()
  const router = useRouter();

  return (
    <nav className="max-w-[1920px] mx-auto flex items-center px-4 lg:px-10 bg-white">
      <Link href={CLIENT_ROUTES.HOME} className="lg:mx-auto lg:ml-7 py-5 w-[70px] md:w-[90px] md:h-[75px] flex">
        <Image priority src={logo} alt="nike logo" width={75} height={40} className="w-auto h-auto" />
      </Link>

      <ul className="hidden lg:flex text-lg">
        <li className="px-4 py-3 first-letter:uppercase">
          <Link href={CLIENT_ROUTES.HOME}>home</Link>
        </li>
        <li className="px-4 py-3 first-letter:uppercase">
          about
        </li>
        <li className="px-4 first-letter:uppercase">
          <DropdownList />
        </li>
        <li className="px-4 py-3 first-letter:uppercase">
          contact
        </li>
      </ul>

      <div className="mx-auto mr-0 lg:mr-7 text-xl relative flex justify-between w-[120px] lg:w-[80px]">
        <UserButtons
          count={UserCtx.FAVORITES && UserCtx.FAVORITES.GET && UserCtx.FAVORITES.GET.length}
          icon={BsHeart}
          title="favorites"
          function={() =>
            AuthCtx.isAuthenticated ? router.push(CLIENT_ROUTES.FAVORITES) : ModalCtx.activeAuthModal()
          }
        />
        <UserButtons
          count={UserCtx.CART && UserCtx.CART.GET && UserCtx.CART.GET.length}
          icon={BsCart}
          title="cart"
          function={() => (AuthCtx.isAuthenticated ? router.push(CLIENT_ROUTES.CART) : ModalCtx.activeAuthModal())}
        />

        <button className="block lg:hidden ml-1" onClick={() => openMenu()}>
          <FiMenu className="text-2xl"/>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
