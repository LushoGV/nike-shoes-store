import { ENDPOINTS } from "@/utils/server/endpoints";

export const getFavorites = async (): Promise<string[]> => {
  const res = await fetch(ENDPOINTS.USER.FAVORITES);
  const {favorites} = await res.json();
  return favorites;
};

export const addToFavorites = async (newProductId: string): Promise<Response> => {
  const res = await fetch(ENDPOINTS.USER.FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: newProductId }),
  });
  await res.json();
  return res;
};

export const removeToFavorites = async (productId: string): Promise<Response> => {
  const res = await fetch(ENDPOINTS.USER.FAVORITES, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  await res.json();
  return res;
};
