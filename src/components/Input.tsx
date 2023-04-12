import React from "react";

type Props = {
  name?: string;
  value?: string;
  placeholder: string;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: Props) => {
  return (
    <input
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      className={`${
        props.error && "border-red-300 placeholder:text-red-300 text-red-300"
      } bg-transparent border-[2px] w-full py-3 rounded-md pl-3 mb-1 outline-0 focus:border-black caret-black transition-all`}
      onChange={(e) => props.onChange && props.onChange(e)}
    />
  );
};

export default Input;
