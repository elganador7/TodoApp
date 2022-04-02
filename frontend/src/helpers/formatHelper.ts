import { format } from 'date-fns'

export const convertToDateTimeString = (dateString: string): string => {
	if (!dateString) {
		return ' -- '
	}

	const date = new Date(dateString)

	return format(date, 'E, MMM d, yyyy, h:mm a')
}
export const convertToDateString = (dateString: string) => {
	if (!dateString) {
		return ' -- '
	}
	const date = new Date(dateString)

	return format(date, 'E, MMM d, yyyy')
}
export const convertToDateTimeShort = (dateString: string) => {
	if (!dateString) {
		return ' -- '
	}
	const date = new Date(dateString)

	return format(date, 'M/d/yyyy, h:mm a')
}
export const convertToDateShort = (dateString: string) => {
	if (!dateString) {
		return ' -- '
	}

	const date = new Date(dateString)

	return format(date, 'M/d/yyyy')
}
export const convertToTime = (dateString: string) => {
	if (!dateString) {
		return ' -- '
	}
	const date = new Date(dateString)

	return format(date, 'h:mm a')
}
