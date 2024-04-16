import axios from "axios";
import Cookies from "js-cookie";

const http = (cookieName, loginPath, isLogged = true) => {
    const access_token = Cookies.get(cookieName);

    const http = axios.create({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        crossDomain: true,
    });

    http.interceptors.request.use(
        config => {
            config.headers.Authorization = !access_token ? null : `Bearer ${access_token}`;
            return config;
        },
        error => {
            const errorStatus = error.response ? error.response.status : null;

            // if user is logged and server response is 401 remove cookie and redirect on login page (ex: expired token)
            if (errorStatus === 401 && isLogged) {
                const domain = window.location.host.includes("localhost") ? "localhost" : ".start2impact.it";
                Cookies.remove(cookieName, { domain });
                window.location.href = loginPath;
            }

            return Promise.reject(error);
        },
    );

    http.interceptors.response.use(
        response => response,
        error => {
            const errorStatus = error.response ? error.response.status : null;

            if (errorStatus === 401 && isLogged) {
                const domain = window.location.host.includes("localhost") ? "localhost" : ".start2impact.it";
                Cookies.remove(cookieName, { domain });
                window.location.href = loginPath;
            }

            return Promise.reject(error);
        },
    );

    return http;
}


export default http;





