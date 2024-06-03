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

const createGradient = (context: any, colorStart = "#007369", colorEnd = "#08F7A1") => {
	const { ctx } = context.chart;
	const gradientStroke = ctx.createLinearGradient(0, 0, 0, 100);
	gradientStroke.addColorStop(0, colorStart);
	gradientStroke.addColorStop(1, colorEnd);
	return gradientStroke;
};

const progressColors = {
	activeBackgroundColor: (ctx: any) => createGradient(ctx), // '#08F7A1';
	inactiveBackgroundColor: "#EDF1F4", // Light gray,
	blockedBackgroundColor: "#FF5A5F", // Red,
	waitingBackgroundColor: "#FFCB00", // Yellow,
	resendBackgroundColor: "#F2994A", // Orange,
}

const colors = {
	createGradient(context: any, colorStart = "#007369", colorEnd = "#08F7A1") {
		const { ctx } = context.chart;
		const gradientStroke = ctx.createLinearGradient(0, 0, 0, 100);
		gradientStroke.addColorStop(0, colorStart);
		gradientStroke.addColorStop(1, colorEnd);
		return gradientStroke;
	},

	progressColors: {
		activeBackgroundColor: (ctx: any) => createGradient(ctx), // '#08F7A1';
		inactiveBackgroundColor: "#EDF1F4", // Light gray,
		blockedBackgroundColor: "#FF5A5F", // Red,
		waitingBackgroundColor: "#FFCB00", // Yellow,
		resendBackgroundColor: "#F2994A", // Orange,
	},

	getProjectStatusColor(
		context: any,
		projects_completed = 0,
		project_sentnotcorrected = null,
		project_resend = false,
		project_blocked_until = null,
		project_retries = 0,
		projects_count = 0,
	) {
		const projectsColor: any = [];

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

}

export { date, checkCookie, colors }