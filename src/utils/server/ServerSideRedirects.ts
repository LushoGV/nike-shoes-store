import { CLIENT_ROUTES } from "../client/routes";

const redirectToHome = {
  redirect: {
    destination: CLIENT_ROUTES.HOME,
  },
};

const redirectToSIGNUP = {
  redirect: {
    destination: CLIENT_ROUTES.SIGNUP,
  },
};

export const SSR_REDIRECTS = {
  TO_HOME: redirectToHome,
  TO_SIGNUP: redirectToSIGNUP
}

