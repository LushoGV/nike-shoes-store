import { IconType } from "react-icons/lib/esm/iconBase";

type Props = {
  icon: IconType;
  count: number;
  title: string;
  function: () => void;
};

const UserButtons = (props: Props) => {
  return (
    <abbr title={props.title}>
      <button
        className="text-xl relative hover:bg-slate-100 p-2 rounded-full"
        onClick={() => props.function()}
      >
        <props.icon />
        {props.count > 0 && (
          <span className="bg-red-600 text-white text-[11px] px-[5px] rounded-full absolute h-4 flex items-center top-[2px] left-[22px]">
            {props.count}
          </span>
        )}
      </button>
    </abbr>
  );
};

export default UserButtons;
