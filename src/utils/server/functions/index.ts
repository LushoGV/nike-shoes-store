import {createRefreshToken, createAccessToken, createAllTokens, getTokenFromCookie, deleteTokenCookie} from './Cookies'
import { encryptPassword, validatePassword } from './Password'
import { filterByCategory, formatDBProducts } from './Products'

const COOKIES = {
    CREATE: {
        REFRESH_TOKEN: createRefreshToken,
        ACCESS_TOKEN: createAccessToken,
        ALL_TOKENS: createAllTokens,
    },
    GET: getTokenFromCookie,
    DELETE: deleteTokenCookie,
}

const PASSWORD = {
    ENCRYPT: encryptPassword,
    VALIDATE: validatePassword,
}

const PRODUCT = {
    FORMAT_TO_CLIENT: formatDBProducts,
    FILTER_BY_CATEGORY: filterByCategory
}

export {COOKIES, PASSWORD, PRODUCT }