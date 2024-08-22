import { Nullable, Session } from './defs';

declare const date: {
    getDateYearsAgo(numYearsAgo: number): Date;
    calculateDaysFromToday(dateFrom: string): number;
    calculateDaysToToday(dateTo: string): number;
    calculateHoursToNow(dateTo: string): number;
    isAfter(date: string, dateToCompare: string): boolean;
    isSameDay(date1: string, date2: string): boolean;
};
declare const checkCookie: (cookieName: string) => Session | null;
declare const colors: {
    createGradient(context: any, colorStart?: string, colorEnd?: string): any;
    progressColors: {
        activeBackgroundColor: (ctx: any) => any;
        inactiveBackgroundColor: string;
        blockedBackgroundColor: string;
        waitingBackgroundColor: string;
        resendBackgroundColor: string;
    };
    getProjectStatusColor(context: any, projects_completed?: number, project_sentnotcorrected?: Nullable<boolean>, project_resend?: Nullable<boolean>, project_blocked_until?: Nullable<string>, project_retries?: number, projects_count?: number): any;
};
declare const redirectByRole: (cookieName: string, adminUrl: string, talentUrl: string, coachUrl: string) => void;
declare const array: {
    arrToChunks(arr?: never[], chuksSize?: number): never[][];
};
declare const http: (cookieName: string, loginPath: string, isLogged?: boolean) => import('axios').AxiosInstance;
export { date, checkCookie, colors, redirectByRole, array, http };
