import { useState, useEffect } from "react";
import sizes from "@/utils/sizes";

type Props = {
  initialValue: string | number;
  type: string;
  onChange: (newValue: any) => void;
};

const Select = (props: Props) => {
  const [initialValue, setInitialValue] = useState(props.initialValue);
  const [selectContent, setSelectContent] = useState<string[] | number[]>();

  const getContent = async () => {
    if (props.type == "size") {
      setSelectContent(sizes.map((element) => element.size));
    } else {
      setSelectContent([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <select
      name="select"
      value={initialValue}
      onChange={(e) => {
        props.onChange(e.target.value), setInitialValue(e.target.value);
      }}
    >
      {selectContent?.map((element, index) => (
        <option value={element} key={index}>
          {element}
        </option>
      ))}
    </select>
  );
};

export default Select;
