export declare const date: {
    getDateYearsAgo(numYearsAgo: number): Date;
    calculateDaysFromToday(dateFrom: string): number;
    calculateDaysToToday(dateTo: string): number;
    calculateHoursToNow(dateTo: string): number;
    isAfter(date: string, dateToCompare: string): boolean;
    isSameDay(date1: string, date2: string): boolean;
};
export default date;
