import { IconType } from "react-icons/lib";

type Props = {
  text: string;
  disableCondition?: boolean
  black?: boolean;
  icon?: IconType;
  onClick: () => void;
  loader?:boolean
};

const Button = (props: Props) => {
  return (
    <button
      className={`${
        props.black ? "bg-black text-white hover:bg-opacity-90" : "text-black hover:bg-slate-100"
      } w-full rounded-full flex items-center justify-center py-[14px] font-semibold border-[1px] border-black disabled:cursor-not-allowed disabled:bg-opacity-80`}
      onClick={props.onClick}
      disabled={props.disableCondition}
    >
      {props.loader ? "loading..." : props.icon ? (
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
