import React from "react";

type Props = {
  text: string
};

const PageHeader = ({text}: Props) => {
  return (
    <header className="flex w-full mb-6 h-20">
      <h1 className="font-semibold text-3xl m-auto">{text}</h1>
    </header>
  );
};

export default PageHeader;
