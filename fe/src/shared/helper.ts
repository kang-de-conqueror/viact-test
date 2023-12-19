import cookie from "js-cookie";

export const getAccessTokenInBrowser = () => {
    return cookie.get("accessToken");
};
