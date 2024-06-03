import { AxiosInstance } from "axios";
import { Session } from "./defs";
declare const date: {
    getDateYearsAgo(numYearsAgo: number): Date;
    calculateDaysFromToday(dateFrom: string): number;
    calculateDaysToToday(dateTo: string): number;
    calculateHoursToNow(dateTo: string): number;
    isAfter(date: string, dateToCompare: string): boolean;
    isSameDay(date1: string, date2: string): boolean;
};
declare const http: (cookieName: string, loginPath: string, isLogged?: boolean) => AxiosInstance;
declare const checkCookie: (cookieName: string) => Session | false;
export { date, http, checkCookie };
