import Link from "next/link";
import { useState } from "react";
import {BsChevronDown} from 'react-icons/bs'

type Props = {};

const dropdownlistContent = [
  {
    title: "Football Shoes",
    count: 5,
  },
  {
    title: "Jordan",
    count: 1,
  },
  {
    title: "Running Shoes",
    count: 6,
  },
  {
    title: "Sneakers",
    count: 2,
  },
];

const DropdownList = (props: Props) => {
  const [dropdownState, setDropdownState] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownState(!dropdownState)}
        className="dropdownButton flex items-center font-semibold py-5"
      >
        <span className="first-letter:uppercase pb-1 pr-2">categories</span>
        <BsChevronDown/>
      </button>

      <div className="dropdownMenu p-1 bg-white shadow-md absolute top-14">
        <ul className="flex flex-col">
          {dropdownlistContent.map((element, index) => (
            <li
              key={index}
              className="flex justify-between pt-1 pb-2 mb-1 cursor-pointer hover:bg-slate-50"
            >
              <Link href={`/category/${element.title}`} className="w-52 flex">
              <span className="w-52 font-semibold pl-2 first-letter:uppercase">
                {element.title}
              </span>
              <span className=" pr-2">({element.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownList;
