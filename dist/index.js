"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCookie = exports.http = exports.date = void 0;
const axios_1 = __importDefault(require("axios"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const date = {
    getDateYearsAgo(numYearsAgo) {
        const today = new Date();
        const dateYearsAgo = new Date(today.getFullYear() - numYearsAgo, today.getMonth(), today.getDate());
        return dateYearsAgo;
    },
    calculateDaysFromToday(dateFrom) {
        const date = new Date(dateFrom).getTime();
        const now = new Date().getTime();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
        return diffDays;
    },
    calculateDaysToToday(dateTo) {
        const date = new Date(dateTo).getTime();
        const now = new Date().getTime();
        const diffTime = date - now;
        const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
        return diffDays;
    },
    calculateHoursToNow(dateTo) {
        const date = new Date(dateTo).getTime();
        const now = new Date().getTime();
        const diffTime = date - now;
        const diffHours = Math.round(diffTime / (1000 * 3600));
        return diffHours;
    },
    isAfter(date, dateToCompare) {
        const formattedDate = new Date(date).getTime();
        const formattedDateToCompare = new Date(dateToCompare).getTime();
        const diffTime = formattedDate - formattedDateToCompare;
        const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
        return diffDays < 0;
    },
    isSameDay(date1, date2) {
        // console.log('isSameDay: ', new Date(date1).getDate() === new Date(date2).getDate() && new Date(date1).getMonth() === new Date(date2).getMonth() && new Date(date1).getFullYear() === new Date(date2).getFullYear());
        // console.log(date1);
        // console.log(date2);
        // eslint-disable-next-line max-len
        return new Date(date1).getDate() === new Date(date2).getDate() && new Date(date1).getMonth() === new Date(date2).getMonth() && new Date(date1).getFullYear() === new Date(date2).getFullYear();
    },
    // A fn for calculate days difference from today -> negative number is previous, positive for next
    // daysDifferenceFromToday(isoDate) {
    // 	const givenDate = new Date(isoDate);
    // 	const currentDate = new Date();
    // 	// Calculate different in milliseconds
    // 	const diffInMs = givenDate - currentDate;
    // 	// round to the nearest whole number
    // 	const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
    // 	return diffInDays;
    // },
};
exports.date = date;
const http = (cookieName, loginPath, isLogged = true) => {
    const access_token = js_cookie_1.default.get(cookieName);
    const http = axios_1.default.create({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        crossDomain: true,
    });
    http.interceptors.request.use(config => {
        config.headers.Authorization = !access_token ? null : `Bearer ${access_token}`;
        return config;
    }, error => {
        const errorStatus = error.response ? error.response.status : null;
        // if user is logged and server response is 401 remove cookie and redirect on login page (ex: expired token)
        if (errorStatus === 401 && isLogged) {
            const domain = window.location.host.includes("localhost") ? "localhost" : ".start2impact.it";
            js_cookie_1.default.remove(cookieName, { domain });
            window.location.href = loginPath;
        }
        return Promise.reject(error);
    });
    http.interceptors.response.use(response => response, error => {
        const errorStatus = error.response ? error.response.status : null;
        if (errorStatus === 401 && isLogged) {
            const domain = window.location.host.includes("localhost") ? "localhost" : ".start2impact.it";
            js_cookie_1.default.remove(cookieName, { domain });
            window.location.href = loginPath;
        }
        return Promise.reject(error);
    });
    return http;
};
exports.http = http;
const checkCookie = (cookieName) => {
    try {
        const cookie = js_cookie_1.default.get(cookieName);
        return cookie ? (0, jwt_decode_1.default)(cookie) : false;
    }
    catch (err) {
        js_cookie_1.default.remove(cookieName);
        return false;
    }
};
exports.checkCookie = checkCookie;
