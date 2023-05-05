import { CLIENT_ROUTES } from "@/utils/client/routes";
import { SiNike } from "react-icons/si";
import Link from "next/link";

const AuthLogo = () => (
  <Link href={CLIENT_ROUTES.HOME}>
    <abbr title="home">
    <SiNike className="text-5xl" />
    </abbr>
  </Link>
);

export default AuthLogo;
