"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = exports.redirectByRole = exports.colors = exports.checkCookie = exports.date = void 0;
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
const createGradient = (context, colorStart = "#007369", colorEnd = "#08F7A1") => {
    const { ctx } = context.chart;
    const gradientStroke = ctx.createLinearGradient(0, 0, 0, 100);
    gradientStroke.addColorStop(0, colorStart);
    gradientStroke.addColorStop(1, colorEnd);
    return gradientStroke;
};
const progressColors = {
    activeBackgroundColor: (ctx) => createGradient(ctx), // '#08F7A1';
    inactiveBackgroundColor: "#EDF1F4", // Light gray,
    blockedBackgroundColor: "#FF5A5F", // Red,
    waitingBackgroundColor: "#FFCB00", // Yellow,
    resendBackgroundColor: "#F2994A", // Orange,
};
const colors = {
    createGradient(context, colorStart = "#007369", colorEnd = "#08F7A1") {
        const { ctx } = context.chart;
        const gradientStroke = ctx.createLinearGradient(0, 0, 0, 100);
        gradientStroke.addColorStop(0, colorStart);
        gradientStroke.addColorStop(1, colorEnd);
        return gradientStroke;
    },
    progressColors: {
        activeBackgroundColor: (ctx) => createGradient(ctx), // '#08F7A1';
        inactiveBackgroundColor: "#EDF1F4", // Light gray,
        blockedBackgroundColor: "#FF5A5F", // Red,
        waitingBackgroundColor: "#FFCB00", // Yellow,
        resendBackgroundColor: "#F2994A", // Orange,
    },
    getProjectStatusColor(context, projects_completed = 0, project_sentnotcorrected = null, project_resend = false, project_blocked_until = null, project_retries = 0, projects_count = 0) {
        const projectsColor = [];
        [...Array(projects_count)].map((project, index) => {
            if (projects_completed >= index + 1) {
                return projectsColor.push(progressColors.activeBackgroundColor(context));
            }
            // if the index is greater than zero, and completed projects are less than the current index
            if (index > 0 && projects_completed < index) {
                return projectsColor.push(progressColors.inactiveBackgroundColor);
            }
            // if project is sended but still not corrected
            if (project_sentnotcorrected !== null) {
                return projectsColor.push(progressColors.waitingBackgroundColor);
            }
            // if project must be resended
            if (project_resend === true) {
                return projectsColor.push(progressColors.resendBackgroundColor);
            }
            // if project is blocked
            if (project_blocked_until !== null || project_retries > 0) {
                return projectsColor.push(progressColors.blockedBackgroundColor);
            }
            return projectsColor.push(progressColors.inactiveBackgroundColor);
        });
        return projectsColor;
    },
};
exports.colors = colors;
const redirectByRole = (cookieName, adminUrl, talentUrl, coachUrl) => {
    const { user } = checkCookie(cookieName) || {};
    if (!user) {
        return;
    }
    if (user.role === "admin") {
        window.location.href = adminUrl;
    }
    else if (user.role === "coach") {
        window.location.href = coachUrl;
    }
    else {
        window.location.href = talentUrl;
    }
};
exports.redirectByRole = redirectByRole;
const array = {
    arrToChunks(arr = [], chuksSize = 10) {
        return Array.from({ length: Math.ceil(arr.length / chuksSize) }, (_, i) => arr.slice(i * chuksSize, i * chuksSize + chuksSize));
    }
};
exports.array = array;
