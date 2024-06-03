import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Session } from "./defs";

const date = {
	getDateYearsAgo(numYearsAgo: number): Date {
		const today = new Date();
		const dateYearsAgo = new Date(today.getFullYear() - numYearsAgo, today.getMonth(), today.getDate());
		return dateYearsAgo;
	},

	calculateDaysFromToday(dateFrom: string): number {
		const date = new Date(dateFrom).getTime();
		const now = new Date().getTime();
		const diffTime = Math.abs(now - date);
		const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
		return diffDays;
	},


	calculateDaysToToday(dateTo: string): number {
		const date = new Date(dateTo).getTime();
		const now = new Date().getTime();
		const diffTime = date - now;
		const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
		return diffDays;
	},

	calculateHoursToNow(dateTo: string) {
		const date = new Date(dateTo).getTime();
		const now = new Date().getTime();
		const diffTime = date - now;
		const diffHours = Math.round(diffTime / (1000 * 3600));
		return diffHours;
	},

	isAfter(date: string, dateToCompare: string) {
		const formattedDate = new Date(date).getTime();
		const formattedDateToCompare = new Date(dateToCompare).getTime();
		const diffTime = formattedDate - formattedDateToCompare;
		const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
		return diffDays < 0;
	},


	isSameDay(date1: string, date2: string) {
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

}

const checkCookie = (cookieName: string): Session | false => {
	try {
		const cookie = Cookies.get(cookieName);
		return cookie ? jwt_decode(cookie) : false;
	}
	catch (err) {
		Cookies.remove(cookieName);
		return false;
	}
};

export { date, checkCookie }