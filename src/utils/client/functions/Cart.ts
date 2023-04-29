import { iCart } from "@/interfaces";
import { DOMAIN, ENDPOINTS } from "../../server/endpoints";

export const getCart = async (withDomain?: boolean, token?: string):Promise<iCart[]> => {
  const URL = withDomain
    ? `${DOMAIN}${ENDPOINTS.USER.CART.GET_ALL}`
    : ENDPOINTS.USER.CART.GET_ALL;
  const res = await fetch(URL, {
    headers: {
      cookie: `${token}`,
    },
  });
  const { cart } = await res.json();
  return cart;
};

export const getItemCart = async (
  itemId: string,
  withDomain?: boolean
): Promise<iCart[]> => {
  const res = await fetch(
    `${withDomain && DOMAIN}${ENDPOINTS.USER.CART.GET_ONE(itemId)}`
  );
  const data = await res.json();
  return data;
};

export const addToCart = async (newItemCart: iCart):Promise<Response> => {
  const res = await fetch(ENDPOINTS.USER.CART.ADD, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItemCart),
  });
  await res.json();
  return res
};

export const updateCart = async (itemId: string, newItemCartContent: iCart):Promise<Response> => {
  const res = await fetch(ENDPOINTS.USER.CART.UPDATE(itemId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItemCartContent),
  });
  const data = await res.json();
  console.log(data)
  return res
};

export const deleteCart = async (itemId: string):Promise<Response> => {
  const res = await fetch(ENDPOINTS.USER.CART.DELETE(itemId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  await res.json();
  return res
};
