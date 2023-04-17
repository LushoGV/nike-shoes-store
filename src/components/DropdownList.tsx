import { useState, useEffect } from "react";
import { iCategoriesList } from "@/interfaces";
import { BsChevronDown } from "react-icons/bs";
import { getCategoriesList } from "@/utils/fetch/productFunctions";
import Link from "next/link";

const DropdownList = () => {
  const [dropdownState, setDropdownState] = useState(false);
  const [dropdownContent, setDropdownContent] = useState<iCategoriesList[]>();

  const getList = async () => {
    const data = await getCategoriesList();
    setDropdownContent(data);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownState(!dropdownState)}
        className="dropdownButton flex items-center py-3"
      >
        <span className="first-letter:uppercase pb-[1px] pr-2">categories</span>
        <BsChevronDown />
      </button>

      <div className="dropdownMenu p-1 bg-white shadow-md absolute top-12">
        <ul className="flex flex-col">
          {dropdownContent &&
            dropdownContent.map((element, index) => (
              <li
                key={index}
                className="flex justify-between cursor-pointer hover:bg-slate-50"
              >
                <Link
                  href={{
                    pathname: `/category/${element.title}`,
                    query: { id: index + 1 },
                  }}
                  className="w-52 flex pt-1 pb-2"
                >
                  <span className="w-52 pl-2 first-letter:uppercase">
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
