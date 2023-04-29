import jwt from "jsonwebtoken";
import { serialize } from "cookie";

interface JwtPayload {
  id: string;
  createdAt: Date;
}

export const SECRET_JWT = process.env.SECRET_JWT || "test";

export const createRefreshToken = (userId: string): {refreshToken:string} => {
  const createdDate = new Date();

  const refreshToken = jwt.sign({ id: userId, createdAt: createdDate }, SECRET_JWT, {
    expiresIn: 60 * 60 * 24 * 15
  } );
  
  return {refreshToken}
};

export const createAccessToken = ( userId: string, name: string, createdAt: Date ): { accessToken: string } => {
  const accessToken = jwt.sign(
    { id: userId, name: name, refreshTokenDate: createdAt }, SECRET_JWT, {
      expiresIn: 60 * 20,
    }
  );

  return { accessToken };
};

export const createAllTokens = (userId: string, userNameSurname: string): { refreshToken: string; accessToken: string } => {
  const {refreshToken} = createRefreshToken(userId);
  
  const { id, createdAt } = getTokenCookie(refreshToken);
  
  const { accessToken } = createAccessToken(
    id,
    userNameSurname,
    createdAt
  );
  return { refreshToken, accessToken };
};

export const getTokenCookie = (cookie: string) => {
  return jwt.verify(cookie, SECRET_JWT) as JwtPayload;
};

export const deleteTokenCookie = (): string => {
  return serialize("myToken", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
};
