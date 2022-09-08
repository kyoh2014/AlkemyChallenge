const BASE_URL = process.env.REACT_APP_API_URL;

export const ISAUTHENTICATE_URL = BASE_URL + "api/authentication";
export const LOGIN_URL = BASE_URL + "api/authentication/signin";
export const REGISTER_URL = BASE_URL + "api/authentication/signup";
export const BALANCE_URL = BASE_URL + "api/balance";
export const RECENTLIST_URL = BASE_URL + "api/balance/resume";
export const ALLRECENTLIST_URL = BASE_URL + "api/balance/allresume";
export const TRANSACTION_URL = BASE_URL + "api/operations";