import { useState, useEffect } from "react";
import { iCategoriesList } from "@/interfaces";
import { BsChevronDown } from "react-icons/bs";
import Link from "next/link";

const DropdownList = () => {
  const [dropdownState, setDropdownState] = useState(false);
  const [dropdownContent, setDropdownContent] = useState<iCategoriesList[]>();

  const getCategoriesList = async () => {
    const res = await fetch("/api/product/category/list");
    const { categoriesList } = await res.json();
    setDropdownContent(categoriesList);
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownState(!dropdownState)}
        className="dropdownButton flex items-center font-semibold py-5"
      >
        <span className="first-letter:uppercase pb-1 pr-2">categories</span>
        <BsChevronDown />
      </button>

      <div className="dropdownMenu p-1 bg-white shadow-md absolute top-14">
        <ul className="flex flex-col">
          {dropdownContent &&
            dropdownContent.map((element, index) => (
              <li
                key={index}
                className="flex justify-between pt-1 pb-2 mb-1 cursor-pointer hover:bg-slate-50"
              >
                <Link
                  href={{
                    pathname: `/category/${element.title}`,
                    query: { id: index + 1 },
                  }}
                  className="w-52 flex"
                >
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
