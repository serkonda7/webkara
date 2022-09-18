const save_string = (key: string, str: string) => {
	localStorage[key] = str
}

const load_string = (key: string): string => {
	return localStorage[key] || ''
}

export { save_string, load_string }
