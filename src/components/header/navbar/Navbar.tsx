import Link from "next/link";
import Image from "next/image";
import logo from "../../../assets/logo.svg";
import { BsCart, BsHeart } from "react-icons/bs";

import DropdownList from "../../DropdownList";
import UserButtons from "./UserButtons";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="max-w-[1300px] mx-auto flex items-center px-4 lg:px-10 bg-white">
      <Link href={"/"} className="lg:mx-auto lg:ml-7 py-5">
        <Image src={logo} alt="nike logo" width={75} height={40} />
      </Link>

      <ul className="hidden lg:flex">
        <li className="px-4 py-5 font-semibold first-letter:uppercase">
          <Link href={"/"}>home</Link>
        </li>
        <li className="px-4 py-5 font-semibold first-letter:uppercase">
          <Link href={"/about"}>about</Link>
        </li>
        <li className="px-4 first-letter:uppercase">
          <DropdownList />
        </li>
        <li className="px-4 py-5 font-semibold first-letter:uppercase">
          <Link href={"/contact"}>contact</Link>
        </li>
      </ul>

      <div className="mx-auto mr-0 lg:mr-7 text-xl relative flex justify-between py-5 w-[80px]">
        <UserButtons
          count={1}
          icon={BsHeart}
          title="favorites"
          link="favorites"
        />
        <UserButtons count={1} icon={BsCart} title="cart" link="cart" />
      </div>
    </nav>
  );
};

export default Navbar;
