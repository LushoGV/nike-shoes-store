import { CATEGORIES } from "@/utils/categories";
import { BsCart, BsHeart } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Ctx } from "@/context";
import { CLIENT_ROUTES } from "@/utils/client/routes";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  menuState: boolean;
  closeMenu: () => void;
  user?: string | null;
};

const Menu = ({ menuState, closeMenu, user }: Props) => {
  const router = useRouter();
  const { AuthCtx } = Ctx();

  return (
    <section
      className={`block lg:hidden w-full h-screen fixed top-0 backdrop-blur-[2px] ${
        menuState
          ? "z-50 opacity-100 duration-75"
          : "duration-75 -z-50 opacity-0"
      } bg-black bg-opacity-30`}
      onClick={() => closeMenu()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          menuState
            ? "translate-x-0 duration-200"
            : "translate-x-80 duration-200"
        } flex flex-col backdrop-blur-lg bg-white z-50 top-0 right-0 h-screen fixed py-4 gap-y-9 min-w-[275px] pl-4`}
      >
        <header className="flex flex-col px-4 text-lg">
          <button className="mx-auto mr-0" onClick={() => closeMenu()}>
            <MdClose className="text-3xl" />
          </button>
          {user && (
            <span className="flex items-center gap-x-3 max-w-[195px] max-h-[50px] overflow-hidden">
              <FiUser />
              {"Hi, " + user}
            </span>
          )}
        </header>

        <ul className="flex flex-col px-4 text-2xl gap-y-2">
          <Link href={CLIENT_ROUTES.HOME} onClick={() => closeMenu()}>
            <li>Home</li>
          </Link>

          <li>About</li>

          <li className="flex flex-col gap-y-2">
            <span>Categories</span>

            <ul className="ml-3 flex flex-col gap-y-2 text-xl">
              {CATEGORIES.map((element, index) => (
                <Link
                  key={index}
                  href={{
                    pathname: `/category/${element.title}`,
                    query: { id: index + 1 },
                  }}
                  onClick={() => closeMenu()}
                >
                  <li>{element.title}</li>
                </Link>
              ))}
            </ul>
          </li>

          <li>Contact</li>
        </ul>

        <ul className="flex flex-col px-4 text-lg gap-y-2 mt-1">
          <Link href={CLIENT_ROUTES.FAVORITES} onClick={() => closeMenu()}>
            <li className="flex items-center gap-x-3">
              <BsHeart />
              <span>Favorites</span>
            </li>
          </Link>

          <Link href={CLIENT_ROUTES.CART} onClick={() => closeMenu()}>
            <li className="flex items-center gap-x-3">
              <BsCart />
              <span>Cart</span>
            </li>
          </Link>
        </ul>

        {AuthCtx.isAuthenticated ? (
          <button
            className="text-xl text-white border-[1px] mr-4 py-4 rounded-full bg-black border-black mt-4"
            onClick={async () => {
              closeMenu(), AuthCtx.deleteToken();
            }}
          >
            Log Out
          </button>
        ) : (
          <button
            className="text-xl text-white border-[1px] mr-4 py-4 rounded-full bg-black border-black mt-4"
            onClick={() => {
              closeMenu(), router.push(CLIENT_ROUTES.SIGNUP);
            }}
          >
            Sign in
          </button>
        )}
      </div>
    </section>
  );
};

export default Menu;
