export type product = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: number;
  description: string;
  colors: string;
  style: string;
};

export type DBProduct = {
  _id: number;
  title: string;
  subtitle: string;
  image: string;
  folder: string;
  images: string[]
  price: number;
  description: string;
  colors: string;
  style: string;
};

export interface iCategoriesList {
    id: number;
    title: string;
    count: number;
  };

export interface iCart {
  productId: number | string,
  size: string,
  quantity: number
}

export interface iSizes {
    size: string;
    enabled: boolean;
}

export interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}; 