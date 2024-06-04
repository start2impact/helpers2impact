const date = {
	isAfter(date: Date, dateToCompare: Date) {
		const diffTime = date.getTime() - dateToCompare.getTime();
		const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
		return diffDays < 30;
	},
}

export { date }