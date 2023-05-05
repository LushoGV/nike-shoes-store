import { NextRequest, NextResponse } from "next/server";
import { CLIENT_ROUTES } from "./utils/client/routes";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {decodeJwt} from 'jose'

const verifyDateToken = (token: RequestCookie) => {
  const { exp } = decodeJwt(token.value);
  if (exp) {
    const expiryDate = new Date(exp * 1000);
    const today = new Date();
    return today > expiryDate;
  }
  return false;
};

export default function middleware(request: NextRequest) {
  const jwt = request.cookies.get("myRefreshCookie");

  if (
    request.nextUrl.pathname.startsWith(CLIENT_ROUTES.CART) ||
    request.nextUrl.pathname.startsWith(CLIENT_ROUTES.FAVORITES)
  ) {
    if (jwt === undefined || verifyDateToken(jwt)) {
      return NextResponse.redirect(new URL(CLIENT_ROUTES.SIGNUP, request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith(CLIENT_ROUTES.SIGNUP)) {
    if (jwt && !verifyDateToken(jwt)) {
      return NextResponse.redirect(new URL(CLIENT_ROUTES.HOME, request.url));
    }
  }

  return NextResponse.next();
}
