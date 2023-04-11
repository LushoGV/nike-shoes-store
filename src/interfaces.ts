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