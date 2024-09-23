const PREFIX = 'upTask_app_';

export function setLocalStorageItem(key: string, value: unknown) {
	try {
		const data = JSON.stringify(value);
		const cleanKey = key.trim().toLowerCase();
		localStorage.setItem(`${PREFIX}${cleanKey}`, data);
	} catch (error) {
		console.error('Error al guardar en el LocalStorage', error);
	}
}

export function getLocalStorageItem(key: string) {
	try {
		const cleanKey = key.trim().toLowerCase();
		const data = localStorage.getItem(`${PREFIX}${cleanKey}`);
		return data ? JSON.parse(data) : null;
	} catch (error) {
		console.error('Error al obtener del LocalStorage', error);
		return null;
	}
}

export function removeLocalStorageItem(key: string) {
	try {
		const cleanKey = key.trim().toLowerCase();
		localStorage.removeItem(PREFIX + cleanKey);
	} catch (error) {
		console.error('Error al eliminar de localStorage:', error);
	}
}

export function clearLocalStorage() {
	try {
		localStorage.clear();
	} catch (error) {
		console.error('Error al limpiar el LocalStorage', error);
	}
}
