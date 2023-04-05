import { IconType } from "react-icons/lib";

type Props = {
  text: string;
  black?: boolean;
  icon?: IconType;
};

const Button = (props: Props) => {
  return (
    <button
      className={`${
        props.black ? "bg-black text-white hover:bg-opacity-90" : "border-[1px] border-black text-black hover:bg-slate-100"
      } w-full rounded-full flex items-center justify-center py-[14px] font-semibold`}
    >
      {props.icon ? (
        <>
          <span className="mr-3 first-letter:uppercase">{props.text}</span>
          <props.icon />
        </>
      ) : (
        <span className="first-letter:uppercase">{props.text}</span>
      )}
    </button>
  );
};

export default Button;
