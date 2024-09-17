const PREFIX = 'upTask_app_';

export function setLocalStorageItem(key: string, value: unknown) {
	try {
		const data = JSON.stringify(value);
		localStorage.setItem(`${PREFIX}${key}`, data);
	} catch (error) {
		console.error('Error al guardar en el LocalStorage', error);
	}
}

export function getLocalStorageItem(key: string) {
	try {
		const data = localStorage.getItem(`${PREFIX}${key}`);
		return data ? JSON.parse(data) : null;
	} catch (error) {
		console.error('Error al obtener del LocalStorage', error);
		return null;
	}
}

export function removeLocalStorageItem(key: string) {
	try {
		localStorage.removeItem(PREFIX + key);
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
