export function getDbName(url: string) {
	const urlParts = url.split('/')
	if (urlParts.length >= 4) {
		const [databaseName] = urlParts[3].split('?')
		return databaseName
	} else {
		return 'un expected format'
	}
}