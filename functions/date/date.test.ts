import { date } from "./date";

describe("check if the second date argument is after the first one", () => { // qui parlare realmente di cosa sto facendo: 
	// quindi sto testando la funzione isAfter che verifica questo
	test("should return true if the second date is after the first one", () => {
		const date1 = new Date("2022-01-01");
		const date2 = new Date("2022-01-02");
		expect(date.isAfter(date1, date2)).toBe(true);
	});

	test("should return false if the second date is before the first one", () => {
		const date1 = new Date("2022-01-01");
		const date2 = new Date("2021-12-31");
		expect(date.isAfter(date1, date2)).toBe(false);
	});

	test("should return false if the second date is the same as the first one", () => {
		const date1 = new Date("2022-01-01");
		const date2 = new Date("2022-01-01");
		expect(date.isAfter(date1, date2)).toBe(false);
	});
});

describe("check if the two dates are the same day", () => {
	test("should return true if the two dates are the same day", () => {
		const date1 = new Date("2022-01-01");
		const date2 = new Date("2022-01-01");
		expect(date.isSameDay(date1, date2)).toBe(true);
	});

	test("should return false if the two dates are not the same day", () => {
		const date1 = new Date("2022-01-01");
		const date2 = new Date("2022-01-02");
		expect(date.isSameDay(date1, date2)).toBe(false);
	});
});