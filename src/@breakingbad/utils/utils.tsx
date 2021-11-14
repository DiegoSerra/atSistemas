import { STATUS } from "./enums";

class BreakingBadUtils {
	static filterArrayByString(mainArr: any[], searchText: string) {
		if (searchText === '') {
			return mainArr;
		}

		searchText = searchText.toLowerCase();

		return mainArr.filter((itemObj: any) => this.searchInObj(itemObj, searchText));
	}

	static searchInObj(itemObj: any, searchText: string) {
		if (!itemObj) {
			return false;
		}

		const propArray = Object.keys(itemObj);

		for (let i = 0; i < propArray.length; i += 1) {
			const prop = propArray[i];
			const value = itemObj[prop];

			if (typeof value === 'string') {
				if (this.searchInString(value, searchText)) {
					return true;
				}
			} else if (Array.isArray(value)) {
				if (this.searchInArray(value, searchText)) {
					return true;
				}
			}

			if (typeof value === 'object') {
				if (this.searchInObj(value, searchText)) {
					return true;
				}
			}
		}
		return false;
	}

	static searchInArray(arr: any[], searchText: string) {
		arr.forEach(value => {
			if (typeof value === 'string') {
				if (this.searchInString(value, searchText)) {
					return true;
				}
			}

			if (typeof value === 'object') {
				if (this.searchInObj(value, searchText)) {
					return true;
				}
			}
			return false;
		});
		return false;
	}

	static searchInString(value: string, searchText: string) {
		return value.toLowerCase().includes(searchText);
	}
}

export default BreakingBadUtils;

export const getStatusIcon = (status: string) => {
	switch (status) {
		case STATUS.ALIVE:
			return 'mood';
		case STATUS.PRESUMED_DEAD:
			return 'sick';
		case STATUS.DECEASED:
			return 'sentiment_very_dissatisfied';
		case STATUS.UNKNOWN:
			return 'explore_off';
		default:
			return;
	}
}
