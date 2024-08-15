export function formatToLongDate(date: string) {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return new Date(date).toLocaleDateString('es-ES', options);
}

export function normalizeText(text: string) {
	const trimmedText = text.trim();
	return trimmedText.replace(/\s+/g, ' ');
}
