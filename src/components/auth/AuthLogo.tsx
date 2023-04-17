import Link from "next/link";
import { SiNike } from "react-icons/si";

const AuthLogo = () => (
  <Link href={"/"}>
    <SiNike className="text-5xl" />
  </Link>
);

export default AuthLogo;
