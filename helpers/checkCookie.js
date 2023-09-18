import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";


const checkCookie = (cookieName) => {
    try {
        const cookie = Cookies.get(cookieName);
        return cookie ? jwt_decode(cookie) : false;
    }
    catch (err) {
        Cookies.remove(cookieName);
        return false;
    }
};

export default checkCookie;