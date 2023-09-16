const getDateYearsAgo = numYearsAgo => {
	const today = new Date();
	const dateYearsAgo = new Date(today.getFullYear() - numYearsAgo, today.getMonth(), today.getDate());
	return dateYearsAgo;
};

export default getDateYearsAgo;