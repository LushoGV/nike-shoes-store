import Link from "next/link";
import { SiJordan } from "react-icons/si";

type Props = {};

const AuthNavbar = (props: Props) => {
  return (
    <nav className="bg-[#f5f5f5] w-full flex items-center justify-between">
      <div className="w-full max-w-[1920px] flex items-center justify-between lg:px-16 mx-auto">
        <SiJordan className="text-2xl mt-1 mb-2" />

        <Link href={"/auth"} className="text-sm mr-3">
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default AuthNavbar;
