import { product } from "@/pages";

export const filterByCategory = (data: product[], categoryId: number) => {
  switch (categoryId) {
    case 1:
      return data.filter(
        (element) => !element.title.toLowerCase().split(" ").includes("air")
      );

    case 3:
      return data.filter(
        (element) =>
          element.title.toLowerCase().split(" ").includes("low") ||
          element.title.toLowerCase().split(" ").includes("pf")
      );

    case 4:
      return data.filter(
        (element) =>
          element.title.toLowerCase().split(" ").includes("air") &&
          !element.title.toLowerCase().split(" ").includes("low")
      );

    default:
      return data;
  }
};
