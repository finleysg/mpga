export const slugify = (text: string) => {
	if (text) {
		return text
			.toString()
			.toLowerCase()
			.trim()
			.replace("/", " ")
			.replace(/\s+/g, "-")
			.replace(/[^\w-]+/g, "")
			.replace(/--+/g, "-")
	}
	return ""
}

export const shorten = (text: string, length: number) => {
	if (text.length > length) {
		return text.substring(0, length)
	}
	return text
}
