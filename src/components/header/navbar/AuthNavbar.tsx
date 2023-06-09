import { SiJordan } from "react-icons/si";
import Link from "next/link";
import { Ctx } from "@/context";

type Props = {
  user?: string | null;
};

const AuthNavbar = ({ user }: Props) => {
  const {AuthCtx} = Ctx()

  return(
  <>
    <nav className="bg-[#f5f5f5] w-full hidden lg:flex items-stretch justify-between">
      <div className="w-full max-w-[1920px] flex items-center justify-between px-6 lg:px-16 mx-auto">
        <SiJordan className="text-2xl mt-1 mb-2" />

        {user ? (
          <div className=" relative flex h-full">
            <span className="text-sm first-letter:uppercase dropdownButton h-full flex items-center font-semibold cursor-pointer">
              {"Hi, " + user}
            </span>

            <div
            onClick={async () => AuthCtx.deleteToken()}
            className="dropdownMenu p-1 bg-white shadow-md absolute top-9 -right-4 md:-right-7 flex flex-col z-30 rounded-sm">
              <span className="flex pt-2 pb-2 w-[120px] md:w-[140px] pl-2 hover:bg-slate-50 cursor-pointer text-red-600">
                Log out
              </span>
            </div>
          </div>
        ) : (
          <Link href={"/auth"} className="text-sm mr-3 font-semibold">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  </>
)};

export default AuthNavbar;
