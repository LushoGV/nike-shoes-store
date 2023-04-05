import { product } from "@/pages";
import React from "react";
import Card from "./Card";

type Props = {
  content: product[];
};

const Grid = (props: Props) => {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {props.content.map((element, index) => (
        <Card key={index} content={element} />
      ))}
    </section>
  );
};

export default Grid;
