import axios from "axios";
import Cookies from "js-cookie";

const http = (cookieName, loginPath) => {
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

            if (errorStatus === 401) {
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

            if (errorStatus === 401) {
                const domain = window.location.host.includes("localhost") ? "localhost" : ".start2impact.it";
                Cookies.remove(cookieName, { domain });
                window.location.href = loginPath;
            }

            return Promise.reject(error);
        },
    );
}

export default http;





