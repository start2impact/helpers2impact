import { Session } from "./defs";
declare const date: {
    getDateYearsAgo(numYearsAgo: number): Date;
    calculateDaysFromToday(dateFrom: string): number;
    calculateDaysToToday(dateTo: string): number;
    calculateHoursToNow(dateTo: string): number;
    isAfter(date: string, dateToCompare: string): boolean;
    isSameDay(date1: string, date2: string): boolean;
};
declare const checkCookie: (cookieName: string) => Session | false;
declare const colors: {
    createGradient(context: any, colorStart?: string, colorEnd?: string): any;
    progressColors: {
        activeBackgroundColor: (ctx: any) => any;
        inactiveBackgroundColor: string;
        blockedBackgroundColor: string;
        waitingBackgroundColor: string;
        resendBackgroundColor: string;
    };
    getProjectStatusColor(context: any, projects_completed?: number, project_sentnotcorrected?: null, project_resend?: boolean, project_blocked_until?: null, project_retries?: number, projects_count?: number): any;
};
declare const redirectByRole: (cookieName: string) => void;
declare const array: {
    arrToChunks(arr?: never[], chuksSize?: number): never[][];
};
export { date, checkCookie, colors, redirectByRole, array };
