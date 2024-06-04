const date = {
	isAfter(date: Date, dateToCompare: Date) {
		const diffTime = date.getTime() - dateToCompare.getTime();
		const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
		return diffDays < 0;
	},

	isSameDay(date1: Date, date2: Date) {
		return date1.getDate() === date2.getDate()
			&& date1.getMonth() === date2.getMonth()
			&& date1.getFullYear() === date2.getFullYear();
	},
}

export { date }